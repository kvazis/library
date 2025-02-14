### [Home Assistant – Practical Use of Zigbee TRV in Zigbee2MQTT 2.x]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
heat:
    recorder:
      include:
        entities:
           - climate.0x2c1165fffeb3e531
           - sensor.0x00158d0001581109_temperature
           - sensor.0x00158d0001581109_humidity
           
    homeassistant:
      customize:

        sensor.0x00158d0001581109_humidity:
          friendly_name: Ext sensor - humidity
          icon: mdi:water-percent
        sensor.0x00158d0001581109_temperature:
          friendly_name: Ext sensor - temperature
          icon: mdi:temperature-celsius
        sensor.0x00158d0001581109_battery:
          friendly_name: Ext sensor - battery

        
        climate.0x2c1165fffeb3e531:
          friendly_name: TRV Moes
        switch.0x2c1165fffeb3e531_heating_stop:
          friendly_name: TRV Moes heat stop
        number.0x2c1165fffeb3e531_local_temperature_calibration:
          friendly_name: TRV Moes calibration
          unit_of_measurement: '°C'
        number.0x2c1165fffeb3e531_comfort_temperature:
          friendly_name: TRV Moes day temperature
          unit_of_measurement: '°C'
        number.0x2c1165fffeb3e531_open_window_temperature:
          friendly_name: TRV Moes window temperature
          unit_of_measurement: '°C'
        number.0x2c1165fffeb3e531_eco_temperature:
          friendly_name: TRV Moes night temperature
          unit_of_measurement: '°C'
        binary_sensor.0x2c1165fffeb3e531_battery_low:
          friendly_name: Кухня TRV battery
        binary_sensor.kn_thermostat_need_for_calibration:
          friendly_name: Кухня need for calibration
          device_class: update
          
    template:

      - binary_sensor:

          - name: kn_aeration
            unique_id: kn_aeration
            state: >
              {{ is_state('binary_sensor.0x00158d0001a99562_contact', 'on')  
                 or is_state('binary_sensor.0x00158d0001a20885_contact', 'on')
              }}
            delay_on: 
                seconds: 30
            delay_off: 
                seconds: 30
            device_class: opening
            icon: >
              {% if is_state("binary_sensor.kn_aeration", "on") %}
              mdi:window-open-variant
              {% else %}
              mdi:window-closed-variant
              {% endif %}          

          - name: kn_thermostat_need_for_calibration
            unique_id: kn_thermostat_need_for_calibration
            state: >
                    {{((states('sensor.0x00158d0001581109_temperature') | float - state_attr('climate.0x2c1165fffeb3e531', 'current_temperature') | float))|round(1) > 1
                     or ((states('sensor.0x00158d0001581109_temperature') | float - state_attr('climate.0x2c1165fffeb3e531', 'current_temperature') | float))|round(1) < -1}} 
                     
                     
    script:
    
        kn_thermostat_calibration:
          alias: TRV Moes calibration
          sequence:
          - action: number.set_value
            data:
              value: "0.0"
            target:
              entity_id: number.0x2c1165fffeb3e531_local_temperature_calibration  
          - delay: 00:00:10
          - action: number.set_value
            data:
              value: "{{((states('sensor.0x00158d0001581109_temperature') | float - state_attr('climate.0x2c1165fffeb3e531', 'current_temperature') | float))|round(1) }}"
            target:
              entity_id: number.0x2c1165fffeb3e531_local_temperature_calibration                      
                     
                     
    mqtt:
      binary_sensor:
        - name: kn_thermostat
          unique_id: kn_thermostat
          state_topic: "states/kn_thermostat"

    switch:

      - platform: template
        switches:
          kn_thermostat_mode:
            unique_id: kn_thermostat_mode
            friendly_name: "Kitchen heat mode"
            value_template: "{{  is_state('binary_sensor.kn_thermostat', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "states/kn_thermostat"
                payload: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "states/kn_thermostat"
                payload: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state('switch.kn_thermostat_mode', 'on') %}
                mdi:radiator
              {% else %}
                mdi:radiator-off
              {% endif %}                    
                     
    automation:


      - alias: kn_thermostat_calibration
        id: kn_thermostat_calibration
        description: Kitchen TRV calibration
        initial_state: true
        trigger:
          - platform: time_pattern
            minutes: "/15"
        condition:
          - condition: state
            entity_id: binary_sensor.kn_thermostat
            state: 'on' 
          - condition: state
            entity_id: binary_sensor.kn_thermostat_need_for_calibration
            state: 'on'
        action:
         - service: script.turn_on
           entity_id: script.kn_thermostat_calibration 
                     
                     
      - alias: kn_heat_mode_toggle
        id: kn_heat_mode_toggle
        description: Kitchen TRV - toggle mode
        initial_state: true
        trigger:
        - platform: homeassistant
          event: start
        - platform: state
          entity_id:
            - binary_sensor.kn_thermostat
        condition: []
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_thermostat
                    state: 'on'
                  - condition: template
                    value_template: "{{ states('climate.0x2c1165fffeb3e531') != 'heat' or state_attr('climate.0x2c1165fffeb3e531', 'preset_mode') != 'manual'}}"
                sequence:
                  - service: climate.set_hvac_mode
                    target:
                      entity_id: climate.0x2c1165fffeb3e531
                    data:
                      hvac_mode: heat
                  - service: climate.set_preset_mode
                    data:
                      preset_mode: manual
                    target:
                      entity_id: climate.0x2c1165fffeb3e531
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffeb3e531
                      temperature: "{{ states('number.0x2c1165fffeb3e531_comfort_temperature')}}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_thermostat
                    state: 'off'
                  - condition: template
                    value_template: "{{ states('climate.0x2c1165fffeb3e531') != 'off' }}"
                sequence:
                  - service: climate.set_hvac_mode
                    target:
                      entity_id: climate.0x2c1165fffeb3e531
                    data:
                      hvac_mode: 'off'                     
                     
                     
      - alias: kn_heat_temperature_set
        id: kn_heat_temperature_set
        description: Kitchen TRV - open window temperature
        initial_state: true
        trigger:
        - platform: state
          entity_id:
            - binary_sensor.kn_aeration
        condition:
          - condition: state
            entity_id: binary_sensor.kn_thermostat
            state: 'on' 
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_aeration
                    state: 'on'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffeb3e531
                      temperature: "{{ states('number.0x2c1165fffeb3e531_open_window_temperature')}}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_aeration
                    state: 'off'
                  - condition: state
                    entity_id: binary_sensor.night_time
                    state: 'off'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffeb3e531
                      temperature: "{{ states('number.0x2c1165fffeb3e531_comfort_temperature')}}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.kn_aeration
                    state: 'off'
                  - condition: state
                    entity_id: binary_sensor.night_time
                    state: 'on'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffeb3e531
                      temperature: "{{ states('number.0x2c1165fffeb3e531_eco_temperature')}}"                     
                     
      - alias: kn_heat_night_mode
        id: kn_heat_night_mode
        description: Kitchen TRV - night_mode
        initial_state: true
        trigger:
        - platform: state
          entity_id:
            - binary_sensor.night_time
        condition:
          - condition: state
            entity_id: binary_sensor.kn_thermostat
            state: 'on' 
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.night_time
                    state: 'on'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffeb3e531
                      temperature: "{{ states('number.0x2c1165fffeb3e531_eco_temperature')}}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.night_time
                    state: 'off'
                  - condition: state
                    entity_id: binary_sensor.kn_aeration
                    state: 'on'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffeb3e531
                      temperature: "{{ states('number.0x2c1165fffeb3e531_open_window_temperature')}}"
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.night_time
                    state: 'off'
                  - condition: state
                    entity_id: binary_sensor.kn_aeration
                    state: 'off'
                sequence:
                  - service: climate.set_temperature
                    data:
                      entity_id: climate.0x2c1165fffeb3e531
                      temperature: "{{ states('number.0x2c1165fffeb3e531_comfort_temperature')}}"        
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
