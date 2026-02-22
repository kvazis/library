### [    ]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml

br_humidification:


  ###################################################################
  # Зберігання часу ввімкненя і вимкнення
  ###################################################################


    input_datetime:
      br_humidification_start:
        name: Спальня початок роботи зволожувача
        has_date: false
        has_time: true
        
      br_humidification_stop:
        name: Спальня завершення роботи зволожувача
        has_date: false
        has_time: true

  ###################################################################
  # Режим роботи зволоження повітря
  ###################################################################
        
    input_boolean:
      br_humidification_mode:
        name: Спальня режим роботи зволожувача
        icon: mdi:water

      br_humidifier_lock:
        name: Спальня блокування зволожувача (нема води)
        icon: mdi:water-off

    input_number:

  ###################################################################
  # Бажаний рівень вологості
  ###################################################################

      br_humidity_level:
        name: Спальня рівень вологості
        min: 30
        max: 60
        step: 1          

  ###################################################################
  # Гістерезис
  ###################################################################

      br_humidity_hysteresis:
        name: Спальня гістерезис вологості
        min: 1
        max: 10
        step: 1
        unit_of_measurement: "%"
        icon: mdi:swap-horizontal

    ###################################################################
    # Поріг потужності: нижче нього вважаємо, що вода закінчилась
    ###################################################################

      br_humidifier_power_low_threshold:
        name: Спальня поріг потужності (нема води)
        min: 0
        max: 20
        step: 1
        unit_of_measurement: "W"
        icon: mdi:flash-alert


    template:
 
      - binary_sensor:

  ###################################################################
  # Визначення відкритих вікон
  ################################################################### 

          - name: br_aeration
            unique_id: br_aeration
            state: >
              {{ is_state('binary_sensor.0x00158d0001193697_contact', 'on')  
                 or is_state('binary_sensor.0x00158d00015843d4_contact', 'on')
              }}
            delay_on: 
                seconds: 30
            delay_off: 
                seconds: 30
            device_class: opening
            icon: >
              {% if is_state("binary_sensor.br_aeration", "on") %}
              mdi:window-open-variant
              {% else %}
              mdi:window-closed-variant
              {% endif %}

  ###################################################################
  # Дозволений час роботи
  ################################################################### 

          - name: br_humidification_time_allowed
            unique_id: br_humidification_time_allowed
            state: >-
              {% set s = states('input_datetime.br_humidification_start') %}
              {% set e = states('input_datetime.br_humidification_stop') %}
              {% set n = now().strftime('%H:%M:%S') %}
              {% if s in ['unknown','unavailable','none',''] or e in ['unknown','unavailable','none',''] %}
                true
              {% else %}
                {% if s <= e %}
                  {{ s <= n and n <= e }}
                {% else %}
                  {{ n >= s or n <= e }}
                {% endif %}
              {% endif %}
            icon: mdi:clock-outline

  ###################################################################
  # Перевірка чи є вода
  ################################################################### 

          - name: br_humidifier_has_water
            unique_id: br_humidifier_has_water
            state: >-
              {{
                (states('sensor.0x00158d00010ec4b8_power') | float(0))
                >
                (states('input_number.br_humidifier_power_low_threshold') | float(2))
              }}
    
            delay_on:
              seconds: 30     
    
            delay_off:
              seconds: 30     
      
            icon: >
              {% if is_state('binary_sensor.br_humidifier_has_water','on') %}
                mdi:water
              {% else %}
                mdi:water-off
              {% endif %}

              
      - sensor:

  ##################################################################
  # Основний сенсор вологості для керування (2 датчики -> середнє, якщо 1 -> він)
  ##################################################################
          - name: br_humidity
            unique_id: br_humidity
            unit_of_measurement: "%"
            device_class: humidity
            state: >-
              {# Джерела #}
              {% set s1 = states('sensor.0xa4c138b7e1e0812c_humidity') %}
              {% set s2 = states('sensor.0x00158d000156e92e_humidity') %}

              {# Перевірка чи значення число #}
              {% set v1_ok = s1 not in ['unknown','unavailable','none',''] and (s1 | float(default=none)) is not none %}
              {% set v2_ok = s2 not in ['unknown','unavailable','none',''] and (s2 | float(default=none)) is not none %}

              {% if v1_ok and v2_ok %}
                {{ ((s1|float + s2|float) / 2) | round(1) }}
              {% elif v1_ok %}
                {{ (s1|float) | round(1) }}
              {% elif v2_ok %}
                {{ (s2|float) | round(1) }}
              {% else %}
                {{ 'unknown' }}
              {% endif %}
            icon: mdi:water-percent

  ##################################################################            
  # Пояснювальний сенсор: яке джерело зараз використовується
  ##################################################################
          - name: br_humidity_source
            unique_id: br_humidity_source
            state: >-
              {% set s1 = states('sensor.0xa4c138b7e1e0812c_humidity') %}
              {% set s2 = states('sensor.0x00158d000156e92e_humidity') %}
              {% set v1_ok = s1 not in ['unknown','unavailable','none',''] and (s1 | float(default=none)) is not none %}
              {% set v2_ok = s2 not in ['unknown','unavailable','none',''] and (s2 | float(default=none)) is not none %}
              {% if v1_ok and v2_ok %}avg
              {% elif v1_ok %}sensor1
              {% elif v2_ok %}sensor2
              {% else %}none
              {% endif %}
            icon: mdi:information-outline            
            
  ###################################################################
  # Автоматизації
  ###################################################################

    automation:

  ###################################################################
  # Керування зволожувачем (розетка) по вологості/часу/вікнах
  ###################################################################

        - alias: br_humidification_control
          id: br_humidification_control
          description: Спальня керування зволожувачем
          mode: single
    
          trigger:
            - platform: state
              entity_id:
                - sensor.br_humidity
                - input_number.br_humidity_level
                - input_number.br_humidity_hysteresis
                - input_boolean.br_humidification_mode
                - binary_sensor.br_aeration
                - binary_sensor.br_humidification_time_allowed
            - platform: time_pattern
              minutes: "/5"
    
          variables:
            ###################################################################
            # Розетка зволожувача
            ###################################################################
            plug: switch.0x00158d00010ec4b8
    
            ###################################################################
            # Поточна вологість (агрегована з 2 датчиків)
            ###################################################################
            humidity: "{{ states('sensor.br_humidity') | float(default=none) }}"
    
            ###################################################################
            # Пороги увімкнення/вимкнення з гістерезисом
            # on_th  = target - hyst
            # off_th = target + hyst
            ###################################################################
            on_th: >-
              {{
                (states('input_number.br_humidity_level')|float(45)
                 - states('input_number.br_humidity_hysteresis')|float(3)) | round(1)
              }}
            off_th: >-
              {{
                (states('input_number.br_humidity_level')|float(45)
                 + states('input_number.br_humidity_hysteresis')|float(3)) | round(1)
              }}
    
            ###################################################################
            # Стан розетки
            ###################################################################
            plug_on: "{{ is_state('switch.0x00158d00010ec4b8','on') }}"
    
          condition:
            ###################################################################
            # Режим роботи серверу
            ###################################################################
            - condition: state
              entity_id: switch.control_mode
              state: "on"
    
          action:
            - choose:
    
      ###################################################################
      # Вимкнення:
      # - режим зволоження вимкнено
      # - або відкриті вікна
      # - або поза дозволеним часом
      # - або вологість вище/дорівнює верхньому порогу
      ###################################################################
                - conditions:
                    - condition: template
                      value_template: >-
                        {{
                          plug_on and (
                            is_state('input_boolean.br_humidification_mode','off')
                            or is_state('binary_sensor.br_aeration','on')
                            or is_state('binary_sensor.br_humidification_time_allowed','off')
                            or (humidity is not none and humidity >= off_th)
                          )
                        }}
                  sequence:
                    - action: switch.turn_off
                      target:
                        entity_id: "{{ plug }}"
    
      ###################################################################
      # Увімкнення:
      # - режим зволоження увімкнено
      # - вікна закриті
      # - час дозволений
      # - вологість нижче/дорівнює нижньому порогу
      ###################################################################
                - conditions:
                    - condition: template
                      value_template: >-
                        {{
                          (not plug_on)
                          and is_state('input_boolean.br_humidification_mode','on')
                          and is_state('binary_sensor.br_aeration','off')
                          and is_state('binary_sensor.br_humidification_time_allowed','on')
                          and is_state('input_boolean.br_humidifier_lock','off')
                          and (humidity is not none and humidity <= on_th)
                        }}
                  sequence:
                    - action: switch.turn_on
                      target:
                        entity_id: "{{ plug }}"
    
  ###################################################################
  # Контроль води (по потужності)
  ###################################################################

        - alias: br_humidifier_no_water_shutdown
          id: br_humidifier_no_water_shutdown
          description: Спальня вимкнення зволожувача і сповіщення, якщо немає води
          mode: single
    
          trigger:
            - platform: state
              entity_id: binary_sensor.br_humidifier_has_water
            - platform: time_pattern
              minutes: "/5"
    
          condition:
    
      ###################################################################
      # Режим роботи серверу
      ###################################################################
            - condition: state
              entity_id: switch.control_mode
              state: "on"
    
      ###################################################################
      # Розетка має бути увімкнена (і вже трохи попрацювати),
      # щоб не заважати ручному старту після доливу води
      ###################################################################
            - condition: state
              entity_id: switch.0x00158d00010ec4b8
              state: "on"
              for:
                minutes: 2
    
      ###################################################################
      # Води немає (визначено по потужності)
      ###################################################################
            - condition: state
              entity_id: binary_sensor.br_humidifier_has_water
              state: "off"

      ###################################################################
      # Щоб не дублювати дії, якщо блокування вже активне
      ###################################################################
            - condition: state
              entity_id: input_boolean.br_humidifier_lock
              state: "off"
    
          action:
    
      ###################################################################
      # Вимикаємо розетку
      ###################################################################
            - action: switch.turn_off
              target:
                entity_id: switch.0x00158d00010ec4b8

        ###################################################################
        # Ставимо блокування (щоб 1-а автоматика більше не вмикала автоматично)
        ###################################################################
            - action: input_boolean.turn_on
              target:
                entity_id: input_boolean.br_humidifier_lock
    
      ###################################################################
      # Telegram notification
      ###################################################################
            - action: telegram_bot.send_message
              data:
                target:
                  - !secret chat_id_group_tech
                message: |
                  💧 Спальня: схоже, закінчилась вода у зволожувачі — вимикаю розетку.
                  
  ###################################################################
  # 3) Зняття блокування після доливу води
  ###################################################################

        - alias: br_humidifier_lock_reset
          id: br_humidifier_lock_reset
          description: Спальня зняти блокування після доливу води
          mode: single
    
          trigger:
            - platform: state
              entity_id: binary_sensor.br_humidifier_has_water
              to: "on"
    
          condition:
    
            ###################################################################
            # Режим роботи серверу
            ###################################################################
            - condition: state
              entity_id: switch.control_mode
              state: "on"
    
            ###################################################################
            # Блокування має бути активне
            ###################################################################
            - condition: state
              entity_id: input_boolean.br_humidifier_lock
              state: "on"
    
          action:
            - action: input_boolean.turn_off
              target:
                entity_id: input_boolean.br_humidifier_lock

        
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
