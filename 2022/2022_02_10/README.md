### [Control addressable LEDs on ESP32](https://youtu.be/QrwpbsMGq_s)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
wled_light:

    automation:
    
        - id: wled_light_control
          alias: WLED управление
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0001718ca8_action
             to: 'single_left'
          action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'off'
                sequence:
                  - service: light.turn_on
                    data:
                      entity_id: light.wled
                      effect: Police
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id: 
                       - light.wled

        - id: wled_light_preset
          alias: WLED пресеты
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0002af829b_action
             to: 'single'
          action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'off'
                sequence:
                  - service: select.select_option
                    data:
                      entity_id: select.wled_preset
                      option: Preset 1
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id: 
                       - light.wled
                       
        - id: wled_light_playlist
          alias: WLED плейлисты
          initial_state: true
          trigger:       
           - platform: state
             entity_id: sensor.0x00158d0002af829b_action
             to: 'double'
          action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'off'
                sequence:
                  - service: select.select_option
                    data:
                      entity_id: select.wled_playlist
                      option: Playlist 4
              - conditions:
                  - condition: state
                    entity_id: light.wled
                    state: 'on'
                sequence:
                  - service: light.turn_off
                    entity_id: 
                       - light.wled

```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
