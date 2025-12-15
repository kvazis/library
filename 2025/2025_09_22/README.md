### [SONOFF SNZB-02LD - review, compatibility check, real use case](https://youtu.be/JwIt5QOUK90)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
bt_hot_water:

    recorder:
      include:
        entities:
           - sensor.0xa4c13804c656ffff_temperature

    homeassistant:
      customize:    
        sensor.0xa4c13804c656ffff_temperature:
          friendly_name: Ванна, температура гарячої води
          
        binary_sensor.bt_hot_water:
          friendly_name: Ванна гаряча вода
          
    template:
    
      - binary_sensor:
      
          - name: bt_hot_water
            unique_id: bt_hot_water
            state: >
              {{ states('sensor.0xa4c13804c656ffff_temperature') | float  > 35 }}              
              
            delay_on: 
                minutes: 1
            delay_off: 
                minutes: 1
            device_class: heat
            
    automation:

      - alias: bt_water_cold_notification
        id: bt_water_cold_notification
        description: Повідомлення про зниження температури
        initial_state: true
        trigger:
    # Вимкнення сенсора гарячої води
        - platform: state
          entity_id: binary_sensor.bt_hot_water
          from: 'on'
          to: 'off'
        action:
        - service: telegram_bot.send_message
          data_template:
            target:
                - !secret chat_id_group
            message: | 
                  {{"\U0001F630"}} Увага - температура води знизилась до {{ states('sensor.0xa4c13804c656ffff_temperature') }} С, в {{ states('sensor.time_date') }}
                  
                  
      - alias: bt_water_hot_notification
        id: bt_water_hot_notification
        description: Повідомлення про підвищення температури
        initial_state: true
        trigger:
    # Увімкнення сенсора гарячої води
        - platform: state
          entity_id: binary_sensor.bt_hot_water
          from: 'off'
          to: 'on'
        action:
        - service: telegram_bot.send_message
          data_template:
            target:
                - !secret chat_id_group
            message: | 
                  {{"\U00002668"}} Вода знову гаряча, температура - {{ states('sensor.0xa4c13804c656ffff_temperature') }} С, в {{ states('sensor.time_date') }}
                  
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
