### [Home Assistant. Lesson 6.1 Archive. Adding Xiaomi Wi-Fi devices, tokens, creating sensors](https://youtu.be/oVs8PYLtZuI)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


### LIGHT    
#### configuration.yaml:  

```yaml

light: !include includes/light.yaml

```

#### includes/light.yaml:  

```yaml

  - platform: xiaomi_miio    
    name: philips_bedside
    host: 192.168.0.118
    token: 1b58a63916d95ba59607f36065d5f6e3
    model: philips.light.moonlight
    
  - platform: xiaomi_miio
    name: philips_ceiling
    host: 192.168.0.119 
    token: d3388c79d4c6c0709da9c5361776fa1f
    
  - platform: switch
    name: led_light
    entity_id: switch.wall_switch_158d00014a1abd

```

:ballot_box_with_check: [List of models supported by Home Assistant](https://www.home-assistant.io/integrations/light.xiaomi_miio/)     


#### ui-lovelace.yaml:  

```yaml
            - entity: light.philips_ceiling           
              name: Philips ceiling
            - entity: light.philips_bedside
              name: Philips bedside          
            - entity: light.led_light          
              name: Switch


              
        - type: horizontal-stack
          cards:
            - type: light
              entity: light.philips_ceiling 
              name: Ceiling
            - type: light
              entity: light.philips_bedside
              name: Bedside              
```

### RELAY AND SWITCH    
#### configuration.yaml:  

```yaml

switch: !include_dir_merge_list includes/switches

```

#### includes/switches/xiaomi.yaml:  

```yaml

  - platform: xiaomi_miio
    name: mi_usb_socket
    host: 192.168.0.96
    token: b7086999a920a560080c07beeb5da4cd
    model: chuangmi.plug.v3

  - platform: xiaomi_miio
    name: mi_3usb_strip
    host: 192.168.0.101
    token: 29eae10bd4d757528e31dc6a783ec2ee
    model: qmi.powerstrip.v1

```

:ballot_box_with_check: [List of models supported by Home Assistant](https://www.home-assistant.io/integrations/switch.xiaomi_miio/)     


#### includes/sensor/power.yaml:  

```yaml

  - platform: template
    sensors:
     mi_3usb_strip_load:
       value_template: "{{ state_attr('switch.mi_3usb_strip', 'load_power') }}"
       unit_of_measurement: 'W'
       entity_id: switch.mi_3usb_strip
       device_class: power
       friendly_name: 'Xiaomi strip power'
       
  - platform: template
    sensors:
     usb_socket_load:
       value_template: "{{ state_attr('switch.mi_usb_socket', 'load_power') }}"
       unit_of_measurement: 'W'
       entity_id: switch.mi_usb_socket
       device_class: power
       friendly_name: 'Xiaomi USB Socket power'

```

#### ui-lovelace.yaml:  

```yaml

  - title: wi-fi
    icon: mdi:wifi
    
    cards:
    
      - type: vertical-stack
        cards:
        - type: markdown
          content: >
             **Wi-Fi sockets and strips**  

        - type: entities
          show_header_toggle: false
          entities:          
            - entity: switch.mi_3usb_strip
              name: Xiaomi strip with 3 USB
            - entity: sensor.mi_3usb_strip_load
            - entity: switch.mi_usb_socket
              name: Socket Xiaomi c 2 USB
            - entity: sensor.usb_socket_load       
```


### AIR PURIFIERS, HUMIDITYFIERS, FANS    
#### configuration.yaml:  

```yaml

fan: !include includes/fan.yaml

```

:ballot_box_with_check: [List of models supported by Home Assistant](https://www.home-assistant.io/integrations/fan.xiaomi_miio/)     


#### includes/fan.yaml:  

```yaml

  - platform: xiaomi_miio
    name: mi_humidifier
    host: 192.168.0.140
    token: 05dfc2387db38b6025d6ed2b2f132a4a
    model: zhimi.humidifier.ca1
    
  - platform: xiaomi_miio
    name: mi_purifier
    host: 192.168.0.141
    token: d157f795ab4f6a9686437ca98254bce1
    model: zhimi.airpurifier.m1

```

#### includes/sensor/fan.yaml:  

```yaml

  - platform: template
    sensors:
      smartmi_speed:
        friendly_name: 'Скорость увлажнителя'
        value_template: "{{ state_attr('fan.mi_humidifier', 'speed') }}"
        icon_template: mdi:speedometer
        
      smartmi_water:
        friendly_name: 'Уровень воды'
        unit_of_measurement: '%'
        value_template: "{{ [state_attr('fan.mi_humidifier', 'depth') / 1.2, 100] | min | int }}"
        icon_template: mdi:cup-water
        
      smartmi_temperature:
        friendly_name: 'Увлажнитель - температура'
        unit_of_measurement: '°C'
        value_template: "{{ state_attr('fan.mi_humidifier', 'temperature') }}"
        icon_template: mdi:temperature-celsius
        
      smartmi_humidity:
        friendly_name: 'Увлажнитель - влажность'
        unit_of_measurement: '%'
        value_template: "{{ state_attr('fan.mi_humidifier', 'humidity') }}"
        icon_template: mdi:water-percent
        
      purifier_speed:
        friendly_name: 'Скорость очистителя'
        value_template: "{{ state_attr('fan.mi_purifier', 'speed') }}"
        icon_template: mdi:speedometer
        
      purifier_filter:
        friendly_name: 'Фильтр израсходован на'
        unit_of_measurement: '%'
        value_template: "{{ state_attr('fan.mi_purifier', 'filter_life_remaining') }}"
        icon_template: mdi:ticket-percent
        
      purifier_temperature:
        friendly_name: 'Очиститель - температура'
        unit_of_measurement: '°C'
        value_template: "{{ state_attr('fan.mi_purifier', 'temperature') }}"
        icon_template: mdi:temperature-celsius
        
      purifier_humidity:
        friendly_name: 'Очиститель - влажность'
        unit_of_measurement: '%'
        value_template: "{{ state_attr('fan.mi_purifier', 'humidity') }}"
        icon_template: mdi:water-percent
        
      purifier_pm25:
        friendly_name: ' Оценка загрязения воздуха - '
        unit_of_measurement: 'pm 2.5'
        value_template: "{{ state_attr('fan.mi_purifier', 'aqi') }}"
        icon_template: mdi:image-filter-center-focus-weak        

```

#### ui-lovelace.yaml:  

```yaml

      - type: vertical-stack
        cards:
        - type: markdown
          content: >
             **Climate control**  

        - type: entities
          show_header_toggle: false
          entities:          
            - entity: fan.mi_humidifier
              name: Humidifier Smartmi
            - entity: sensor.smartmi_speed 
            - entity: sensor.smartmi_water
            - entity: sensor.smartmi_temperature 
            - entity: sensor.smartmi_humidity
            
        - type: entities
          show_header_toggle: false
          entities:          
            - entity: fan.mi_purifier
              name: Air purifier Xiaomi           
            - entity: sensor.purifier_speed
            - entity: sensor.purifier_filter
            - entity: sensor.purifier_temperature
            - entity: sensor.purifier_humidity
            - entity: sensor.purifier_pm25  
```

### AIR MONITOR    
#### configuration.yaml:  

```yaml

air_quality: !include includes/air_quality.yaml

```

:ballot_box_with_check: [List of models supported by Home Assistant](https://www.home-assistant.io/integrations/air_quality.xiaomi_miio/)     

#### includes/air_quality.yaml:  

```yaml

  - platform: xiaomi_miio
    name: mi_air_monitor
    host: 192.168.0.142
    token: 5233595a56594a4e55724b4967513542

```

#### includes/sensor/air_quality.yaml:  

```yaml

  - platform: template
    sensors:
      mi_air_co2a:
        friendly_name: 'mi air СО2а - '
        value_template: "{{ state_attr('air_quality.mi_air_monitor', 'carbon_dioxide_equivalent') }}"  
        icon_template: mdi:periodic-table-co2
        unit_of_measurement: 'ppm'
        
      mi_air_tvoc:
        friendly_name: 'mi air VOC - '
        value_template: "{{ state_attr('air_quality.mi_air_monitor', 'total_volatile_organic_compounds') }}"  
        icon_template: mdi:alpha-t
        unit_of_measurement: 'mg_m3'
        
```

###  Integration of universal IR controller Xiaomi
#### configuration.yaml:  

```yaml

remote: !include includes/remote.yaml

```

#### includes/remote.yaml:  

```yaml

  - platform: xiaomi_miio
    name: mi_remote
    host: 192.168.0.135
    token: db472a45b4f1913439abaab3f7ff6356
    slot: 3
    timeout: 30
    hidden: false

```

###  SCRIPTS
#### configuration.yaml:  

```yaml

script: !include_dir_merge_named includes/scripts

```

#### includes/scripts/mi_remote.yaml:  

```yaml

  learn_ir_command:
    alias: Learn Xiaomi IR Base
    sequence:
      - service: xiaomi_miio.remote_learn_command
        data:
          entity_id: remote.mi_remote


  send_ir_command:
    alias: Send command
    sequence:
      - service: remote.send_command
        entity_id: remote.mi_remote
        data:
          command:
          - raw:Z6VHADsCAACTBgAAuwgAAJERAAATIwAATJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAABAQEBAQEBAQABAQABAQAAAAAAAQAAAQEBBQJAA=
          - raw:Z6VHADsCAACTBgAAuwgAAJERAAATIwAATJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAABAQEBAQEBAQABAQABAQAAAAAAAQAAAQEBBQJAA=
          - raw:Z6WRAN0AAAAfAgAAewIAACUEAAB5BQAALioAAMAMAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQmIA
          - raw:Z6W/ABwCAAB9AgAAQgMAAE0EAAB6BQAAjjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMQE=

```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
