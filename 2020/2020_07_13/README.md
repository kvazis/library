### [Home Assistant. Lesson 11.1 Telegram Notifications - Creating a Bot, Sending Messages, Receiving Commands](https://youtu.be/tV8RjvevVHs)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

Second part of the lesson - [Home Assistant Lessons - Smart Home Control via Telegram from Anywhere in the World](https://youtu.be/tPYXpQwDLYc)  
Third part - [Home Assistant Lessons - Control via Telegram, Text Dialogs, User Permissions](https://youtu.be/gksZK58ZLDQ)  
Fourth part - [Home Assistant Lessons - Controlling a WLED Addressable Light via Telegram Menu](https://youtu.be/KqjjBY3QaCg)  

#### Lesson Text Materials (updated in 2022, added information about Telegram groups) -  

:ballot_box_with_check: Creating Your Own Chat Bot:  
`@BotFather` - bot that creates bots  
Creating a new bot - `/newbot`  

Bot name - any, for example, Smart Home  
Bot username - Latin characters, ending in `bot`  
Receive the bot token  

:ballot_box_with_check: Update 2022, configuration for group functionality:  
List of bots - `/mybots`  
Select your bot, `Bot Setting`, `Allow Groups ?`, `Turn groups on`  

:ballot_box_with_check: Getting an Identifier  

`@myidbot` - one of the options (not the only one) for obtaining an ID  
To get the user ID - command `/getid`  
To get the group ID - command `/getgroupid`  

:ballot_box_with_check: Home Assistant  
Each user needs to specify their ID (similarly, you can get an ID for a group, it should start with `-`)  

:ballot_box_with_check: Telegram Bot Platform -  
```yaml
telegram_bot:
  - platform: polling
    api_key: API key obtained from @botfather
    allowed_chat_ids:
      - User ID 1
      - User ID 2   
```

:ballot_box_with_check: Telegram Notification Platform -  
```yaml      
notify:

  - name: Custom name for each user
    platform: telegram
    chat_id: User ID 1
    
  - name: Custom name for each user
    platform: telegram
    chat_id: User ID 2
```    

:ballot_box_with_check: Unicode for Emojis - [timwhitlock](https://apps.timwhitlock.info/emoji/tables/unicode) ; [emojipedia](https://emojipedia.org/)

:ballot_box_with_check: Package from the Lesson -  
```yaml      
telegramm:


    sensor:

      - platform: template
        sensors:

          unavailable_now_light:
            friendly_name: "Total unavailable lights - "
            entity_id:
              - sensor.time
            value_template: "{{states.light | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter        

          unavailable_now_switch:
            friendly_name: "Total unavailable switches - "
            entity_id:
              - sensor.time
            value_template: "{{states.switch | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter 
            
          unavailable_now_sensor:
            friendly_name: "Total unavailable sensors - "
            entity_id:
              - sensor.time
            value_template: "{{states.sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter
            
          unavailable_now_binary_sensor:
            friendly_name: "Total unavailable binary sensors - "
            entity_id:
              - sensor.time
            value_template: "{{states.binary_sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon_template: mdi:counter

    script:
    
      send_message_1:
        alias: Sending via notification service
        sequence:
        - service: notify.telegram_id_1
          data:
            message: "Current time - {{ states('sensor.time') }} . Everything is fine"
            
      system_report:
        alias: Sending system status report
        sequence:
         - service: notify.telegram_id_1
           data:
             message: | 
                 {{"\U0001F6C0"}} System Status
                 {{"\U0001F567"}} Report for {{ states('sensor.time_date') }}
                 {{"\U0001F4A1"}} Unavailable lights - {{ states('sensor.unavailable_now_light') }} 
                 {{"\U0001F50C"}} Unavailable switches - {{ states('sensor.unavailable_now_switch') }} 
                 {{"\U0001F321"}} Unavailable sensors - {{ states('sensor.unavailable_now_sensor') }} 
                 {{"\U0001F51F"}} Unavailable binary sensors - {{ states('sensor.unavailable_now_binary_sensor') }}             
            
                        
    automation:   
    
        - id: Report on system startup
          alias: start_message
          initial_state: true
          trigger:   
             - platform: homeassistant
               event: start          
          action:          
             - service: notify.telegram_id_1
               data:
                 message: | 
                     {{"\U0001F4AC"}} Main Server Raspberry Pi 
                     {{"\U0001F567"}} Startup detected at {{ states('sensor.time_date') }} 
                     {{"\U0001F4C3"}} Status report will be in 1 minute            
             - delay: 00:01:10
             - service: script.turn_on
               entity_id: script.system_report
               
               
        - id: Request for report             
          alias: send_report
          initial_state: true
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/report'
          action:
           - service: script.turn_on
             entity_id: 
                - script.system_report
                
        - id: Turn on light             
          alias: send_light
          initial_state: true
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/light'
          action:
           - service: light.turn_on
             entity_id: 
                - light.yeelight_650
                
        - id: Light turn-on notification             
          alias: send_light_on
          initial_state: false
          trigger:
          - platform: state
            entity_id: light.yeelight_650
            to: 'on'
          action:
          - service: notify.telegram_id_1
            data:
              message: "Light 650 turned on at - {{ states('sensor.time') }} "

        - id: Telegram bot keyboard
          alias: telegram_keyboard
          initial_state: true
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/start'
          action:
          - service: notify.telegram_id_1
            data:
              message: 'commands'
              data:
                keyboard:
                  - '/report, /light'
                  - '/report2, /light2, /light3'           
                  - '/report3, /light4, /light5'               
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
