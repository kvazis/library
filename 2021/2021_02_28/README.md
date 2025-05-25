### [Home Assistant. Урок 10.4 Практические кейсы - сенсор давления на сидение](https://youtu.be/TCi2RMq2Uko)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson  (updated 2024_10_12) :

#### Sensor

```yaml
    template:

      - binary_sensor:
      
    # Pressure sensor
          - name: sitting
            unique_id: sitting
            state: >
              "{{ is_state('binary_sensor.0x00124b002265ba65_contact', 'off') }}"
            delay_off: 
                minutes: 1

```

#### Automation

```yaml
    automation:                
                
      - alias: table_lamp
        id: table_lamp
        description: Table lamp Auto off
        initial_state: true
        trigger:
          - platform: state
            entity_id: binary_sensor.sitting
        action:
          - choose:
            - conditions:
               - condition: state
                 entity_id: binary_sensor.sitting
                 state: 'on'
              sequence:
               - service: light.turn_on
                 entity_id:
                   - light.yeelight_table
                 data_template:
                   brightness_pct: 100 
                   kelvin: 4000
            - conditions:
               - condition: state
                 entity_id: binary_sensor.sitting
                 state: 'off'
              sequence:
               - service: light.turn_off
                 entity_id:
                   - light.yeelight_table
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
