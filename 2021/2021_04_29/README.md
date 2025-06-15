### [Home Assistant. Lesson 12.2 Interface – Lovelace, Multiple Entity Row Card](https://youtu.be/m8WkJv7M9CY)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson in text form:

:white_check_mark: Multiple Entity Row

:ballot_box_with_check: Manual lovelace mode and custom cards auto-entities and multiple-entity-row in resources – `configuration.yaml`

```yaml
lovelace:
  mode: yaml
  resources:
   - url: /hacsfiles/lovelace-auto-entities/auto-entities.js
     type: module  
   - url: /hacsfiles/lovelace-multiple-entity-row/multiple-entity-row.js
     type: module 
```

:ballot_box_with_check: Page from the lesson with cards –

```yaml
  - title: Devices
    icon: mdi:gauge

    cards:

    - type: vertical-stack
      cards: 

        - type: entities
          show_header_toggle: false
          entities:
            - entity: sensor.0x00158d0001dcd47e_temperature
              name: Temperature   
            - entity: sensor.0x00158d0001dcd47e_humidity
              name: Humidity
            - entity: sensor.0x00158d0001dcd47e_battery
              name: Battery level             

        - type: entities
          show_header_toggle: false
          entities:
          - entity: sensor.0x00158d0001dcd47e_battery
            type: custom:multiple-entity-row
            icon: mdi:home-thermometer
            name: Climate
            state_header: Battery level
            entities:
              - entity: sensor.0x00158d0001dcd47e_temperature
                name: Temperature            
              - entity: sensor.0x00158d0001dcd47e_humidity
                name: Humidity            

        - type: entities
          show_header_toggle: false
          entities:
          - entity: sensor.0x00158d0001dcd47e_battery
            type: custom:multiple-entity-row
            icon: mdi:home-thermometer
            name: Climate
            # state_header: Battery level
            show_state: false
            entities:
              - attribute: last_seen
                format: relative
                name: Response            
              - attribute: voltage
                name: Voltage             
            
          - entity: switch.0x04cf8cdf3c764e0a
            type: custom:multiple-entity-row
            icon: mdi:power-socket-eu
            toggle: true
            state_color: true
            name: Xiaomi socket
            secondary_info: last-changed
            state_header: State          
            entities:
              - entity: sensor.0x04cf8cdf3c764e0a_power
                name: Power           
              - entity: sensor.0x04cf8cdf3c764e0a_voltage
                name: Voltage             
            
        - type: entities
          show_header_toggle: false
          entities:
          - entity: switch.0x00158d0003f46bb6_l2
            type: custom:multiple-entity-row
            icon: mdi:dip-switch
            toggle: true
            state_color: true
            name: Aqara relay
            state_header: Line 2
            entities:
              - entity: sensor.0x00158d0003f46bb6_voltage
                name: Voltage
              - entity: sensor.0x00158d0003f46bb6_power
                name: Power
              - entity: switch.0x00158d0003f46bb6_l1
                name: Line 1
                toggle: true            
          - type: divider 
          - entity: switch.0x04cf8cdf3c764e0a
            type: custom:multiple-entity-row
            icon: mdi:power-socket-eu
            toggle: true
            state_color: true
            name: Xiaomi socket
            entities:
              - entity: sensor.0x04cf8cdf3c764e0a_power
                name: false           
              - entity: sensor.0x04cf8cdf3c764e0a_voltage
                name: false            

    - type: vertical-stack
      cards: 

        - type: entities
          show_header_toggle: false
          entities:
          
          - entity: switch.0x60a423fffe7ff8c8_switch
            type: custom:multiple-entity-row
            icon: mdi:power-socket-eu
            name: Important socket
            state_color: true
            secondary_info: last-changed
            entities:
              
              - icon: mdi:power-plug
                state_color: true
                name: On
                tap_action:
                  action: call-service
                  service: switch.turn_on
                  service_data:
                    entity_id: switch.0x60a423fffe7ff8c8_switch
              
              - icon: mdi:power-plug-off
                name: Off
                tap_action:
                  action: call-service
                  service: switch.turn_off
                  service_data:
                    entity_id: switch.0x60a423fffe7ff8c8_switch
                  confirmation:
                     text: 'Are you sure?'

        - type: entities
          show_header_toggle: false
          entities:
          - entity: sensor.en_smoke_sensor_battery
            type: custom:multiple-entity-row
            icon: mdi:fire
            name: Smoke sensor
            state_header: Battery
            entities:
              - attribute: last_seen
                format: relative
                name: Response
              - entity: sensor.en_smoke_sensor_linkquality
                name: Signal

          - type: section
          - entity: sensor.en_door_battery
            type: custom:multiple-entity-row
            icon: mdi:door
            name: Entrance door
            state_header: Battery
            entities:
              - attribute: last_seen
                format: relative
                name: Response
              - entity: sensor.en_door_linkquality
                name: Signal

          - type: section
          - entity: sensor.en_moving_battery
            type: custom:multiple-entity-row
            icon: mdi:run
            name: Motion sensor
            state_header: Battery
            entities:
              - attribute: last_seen
                format: relative
                name: Response
              - entity: sensor.en_moving_linkquality
                name: Signal

          - type: section
          - entity: sensor.en_cupboard_round_battery
            type: custom:multiple-entity-row
            icon: mdi:gesture-double-tap
            name: Button
            state_header: Battery
            entities:
              - attribute: last_seen
                format: relative
                name: Response
              - entity: sensor.en_cupboard_round_linkquality
                name: Signal
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
