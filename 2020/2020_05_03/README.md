### [Home Assistant. Lesson 10.1 Practical cases - Packages, working with lighting](https://youtu.be/5gsSx3DVY_k)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Pakages - Link to external folder (configuration.yaml)    

```yaml

homeassistant:

  packages: !include_dir_merge_named includes/packages

```

#### Example 1    

```yaml

example_1:


    binary_sensor:
    # Сенсоры времени
      - platform: tod
        name: unit_10_1_ex1_day
        after: '09:00'
        before: '21:00'
        
      - platform: tod
        name: unit_10_1_ex1_night
        after: '23:00'
        before: '07:00'

    
    # Сенсор автоотключения света 
      - platform: template
        sensors:
          unit_10_1_ex1:
            friendly_name: "Автоотключение"
            value_template: >-
              {{ is_state('light.yeelight_320_ceiling', 'on')  
                 and is_state('binary_sensor.0x00158d0001a24e71_occupancy', 'off')  }}
            icon_template: >-
              {% if is_state("binary_sensor.unit_10_1_ex1", "on") %}
              mdi:timer
              {% else %}
              mdi:timer-off
              {% endif %}

    timer:
        
          unit_10_1_ex1:
            name: Люстра выкл через -
            duration: '00:10:00'        

    # yeelight:
    
     devices:
       192.168.0.106:
         name: yeelight_320_ceiling
         transition: 200
         model: ceiling1
            
    automation:

        # Включение освещения 
        - alias: unit_10_1_ex1_light_on
          initial_state: false
          trigger:
        # Выключатель Aqara
          - platform: state
            entity_id: sensor.0x00158d00014dceb3_click
            to: 'left'
        ## Датчик движения
          - platform: state
            entity_id: binary_sensor.0x00158d0001a24e71_occupancy
            to: 'on'
          condition:
          - condition: state
            entity_id: light.yeelight_320_ceiling
            state: 'off'
          action:
          - service: light.turn_on
            entity_id:
              - light.yeelight_320_ceiling
              
        # Выключение освещения 
        - alias: unit_10_1_ex1_light_off
          initial_state: false
          trigger:
        # Выключатель Aqara
          - platform: state
            entity_id: sensor.0x00158d00014dceb3_click
            to: 'left'
        # Таймер
          - platform: event
            event_type: timer.finished
            event_data:
              entity_id: timer.unit_10_1_ex1
          condition:
          - condition: state
            entity_id: light.yeelight_320_ceiling
            state: 'on'
          action:
          - service: light.turn_off
            entity_id:
              - light.yeelight_320_ceiling
              
        # Автоматическая установка яркости
        - alias: unit_10_1_ex1_light_bright
          initial_state: false
          trigger:
          - platform: state
            entity_id: light.yeelight_320_ceiling
            to: 'on'
          action:
          - service: light.turn_on
            entity_id:
              - light.yeelight_320_ceiling
            data_template:
               brightness_pct: >
                 {%- if states("binary_sensor.unit_10_1_ex1_night") == 'on' -%}
                 25
                 {%- elif states("binary_sensor.unit_10_1_ex1_day") == 'on'  -%}
                 100
                 {%- else -%}
                 70
                 {% endif %}
               kelvin: 4000   
               

        ## Таймер автоотключения
        - alias: unit_10_1_ex1_timer_on
          initial_state: false
          trigger:
        # Условия для запуска таймера освещения
          - platform: state
            entity_id: binary_sensor.unit_10_1_ex1
            to: 'on'
          action:
            service: timer.start
            entity_id: timer.unit_10_1_ex1
            data_template: 
                duration: > 
                 {%- if states("binary_sensor.unit_10_1_ex1_night") == 'on' -%}
                 00:03:00
                 {%- elif states("binary_sensor.unit_10_1_ex1_day") == 'on'  -%}
                 00:10:00
                 {%- else -%}
                 00:05:00
                 {% endif %} 
                 
        # Сброс таймера при выключении
        - alias: unit_10_1_ex1_timer_off
          initial_state: false
          trigger:
          - platform: state
            entity_id: binary_sensor.unit_10_1_ex1
            to: 'off'
          action:
          - service: timer.cancel
            entity_id: timer.unit_10_1_ex1

```

#### Example 2    

```yaml

example_2:

    binary_sensor:

    # Сенсор автоотключения света 
      - platform: template
        sensors:
          unit_10_1_ex2:
            friendly_name: "Автоотключение"
            value_template: >-
              {{ is_state('light.yeelight_450', 'on')  
                 and is_state('binary_sensor.ln_moving_occupancy', 'off')  
                 and (state_attr('light.yeelight_450', 'brightness') | float) < 250
              }}
            icon_template: >-
              {% if is_state("binary_sensor.unit_10_1_ex2", "on") %}
              mdi:timer
              {% else %}
              mdi:timer-off
              {% endif %}    

    # yeelight:
    
     devices:
       192.168.0.112:
         name: yeelight_450
         transition: 1000
         nightlight_switch_type: light
         model: ceiling3
            
            
    automation:

        # Включение освещения 
        - alias: unit_10_1_ex2_light_on
          initial_state: false
          trigger:
        # Выключатель Aqara
          - platform: state
            entity_id: sensor.lr_ws_2ch_table_click
            to: 'left'
          condition:
          - condition: state
            entity_id: light.yeelight_450
            state: 'off'
          action:
          - service: light.turn_on
            entity_id:
              - light.yeelight_450
            data_template:
              brightness_pct: 100
              kelvin: 4000
              
        # Выключение освещения 
        - alias: unit_10_1_ex2_light_off
          initial_state: false
          trigger:
        # Выключатель Aqara
          - platform: state
            entity_id: sensor.lr_ws_2ch_table_click
            to: 'left'
          condition:
          - condition: state
            entity_id: light.yeelight_450
            state: 'on'
          action:
          - service: light.turn_off
            entity_id:
              - light.yeelight_450
              
        # Автоподсветка
        - alias: unit_10_1_ex2_light_autoon
          initial_state: false
          trigger:
        # Датчик движения
          - platform: state
            entity_id: binary_sensor.ln_moving_occupancy
            to: 'on'
          condition:
          - condition: state
            entity_id: light.yeelight_450
            state: 'off'
          - condition: numeric_state
            entity_id: sensor.kn_light_sensor_illuminance
            below: 15000
          action:
          - service: light.turn_on
            entity_id:
              - light.yeelight_450
            data_template:
               brightness_pct: >
                  {% set illum = states('sensor.kn_light_sensor_illuminance') | float %}
                  {% if illum >= 10000 %}
                    40
                  {% elif illum >= 5000 %}
                    50
                  {% elif illum < 5000 %}
                    60
                  {% endif %}
               kelvin: 4000 
              
        # Автоподсветка выкл
        - alias: unit_10_1_ex2_light_autooff
          initial_state: false
          trigger:
        # Шаблонный сенсор
          - platform: state
            entity_id: binary_sensor.unit_10_1_ex2
            to: 'on'
          action:
          - service: light.turn_off
            entity_id:
              - light.yeelight_450

```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
