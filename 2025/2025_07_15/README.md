### [Home Assistant 2025 – Telegram Integration, Creating Your Own Bot, Sending Notifications](https://youtu.be/5gcdUMCxYAk)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
notification:

    automation:

      - alias: telegram_start_notification
        id: telegram_start_notification
        description: Telegram start notification
        initial_state: true
        trigger:
          - platform: homeassistant
            event: start
        action:  
          - service: telegram_bot.send_message
            data_template:
              target:
                  - !secret chat_id_channel
              message: | 
                   {{"\U0001F4AC"}} Home Assistant Server
                   {{"\U0001F567"}} Started at {{ states('sensor.time_date') }} 
          - delay: 00:01:05
          - service: telegram_bot.send_message
            data_template:
              target:
                  - !secret chat_id_channel
              message: | 
                   {{"\U0001F4A1"}} Unavailable lights - {{ states('sensor.count_light_unavailable') }} 
                   {{"\U0001F50C"}} Unavailable switchs - {{ states('sensor.count_switch_unavailable') }} 
                   {{"\U0001F321"}} Unavailable sensors - {{ states('sensor.count_sensor_unavailable') }} 
                   {{"\U0001F51F"}} Unavailable binary sensors - {{ states('sensor.count_binary_sensor_unavailable') }}
                   
    template:
    
      - sensor:
      
          - name: count_light_unavailable
            unique_id: count_light_unavailable
            state: "{{states.light | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:lightbulb-question
            
          - name: count_switch_unavailable
            unique_id: count_switch_unavailable
            state: "{{states.switch | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:power-plug-outline
            
          - name: count_sensor_unavailable
            unique_id: count_sensor_unavailable
            state: "{{states.sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:eye-off

          - name: count_binary_sensor_unavailable
            unique_id: count_binary_sensor_unavailable
            state: "{{states.binary_sensor | selectattr ('state', 'equalto', 'unavailable') | list | length}}"
            icon: mdi:alert-circle


```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
