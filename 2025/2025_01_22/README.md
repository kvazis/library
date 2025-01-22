### [Home Assistant, practice – automation of light dimming]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml

dimming:


    input_boolean:
      dimming_active:
        name: Dimming Active
        initial: off
        icon: mdi:brightness-6
    
      dimming_direction:
        name: Dimming Direction
        initial: on  
        icon: mdi:arrow-up-down

    automation:


        - alias: light_onoff
          id: light_onoff
          description: Onoff
          initial_state: true          
          trigger:
        
            - platform: state
              entity_id: sensor.0x00158d000186d9a9_action
              to: 'single'
        
          condition: []
          action:
            - service: light.toggle
              target:
                entity_id: light.0x00124b00231ff227
            - service: input_boolean.turn_off
              target:
                entity_id: input_boolean.dimming_active

        - alias: light_dimming
          id: light_dimming
          description: Dimming with fixed limits
          initial_state: true          
          mode: restart
          trigger:
        
            - platform: state
              entity_id: sensor.0x00158d000186d9a9_action
              to: 'hold'
              id: dimmer_hold
        
            - platform: state
              entity_id: sensor.0x00158d000186d9a9_action
              to: 'release'
              id: dimmer_release
        
          condition:
            - condition: state
              entity_id: light.0x00124b00231ff227
              state: 'on'
        
          action:
            - choose:
                - conditions:
                    - condition: trigger
                      id: dimmer_hold
                  sequence:
                    - service: input_boolean.turn_on
                      target:
                        entity_id: input_boolean.dimming_active
                    - repeat:
                        while:
                          - condition: state
                            entity_id: input_boolean.dimming_active
                            state: "on"
                        sequence:
                          - choose:
                              - conditions:
                                  - condition: state
                                    entity_id: input_boolean.dimming_direction
                                    state: "on"
                                sequence:
                                  - choose:

                                      - conditions:
                                          - condition: template
                                            value_template: >
                                              {{ state_attr('light.0x00124b00231ff227', 'brightness') + 10 >= 255 }}
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness: 255
                                          - service: input_boolean.turn_off
                                            target:
                                              entity_id: input_boolean.dimming_active
                                          - service: input_boolean.toggle
                                            target:
                                              entity_id: input_boolean.dimming_direction


                                      - conditions: []
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness_step: 10
        
                              - conditions:
                                  - condition: state
                                    entity_id: input_boolean.dimming_direction
                                    state: "off"
                                sequence:
                                  - choose:

                                      - conditions:
                                          - condition: template
                                            value_template: >
                                              {{ state_attr('light.0x00124b00231ff227', 'brightness') - 10 <= 10 }}
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness: 10
                                          - service: input_boolean.turn_off
                                            target:
                                              entity_id: input_boolean.dimming_active
                                          - service: input_boolean.toggle
                                            target:
                                              entity_id: input_boolean.dimming_direction

                                      - conditions: []
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness_step: -10
                          - delay: "00:00:01"
        
                - conditions:
                    - condition: trigger
                      id: dimmer_release
                  sequence:
                    - service: input_boolean.turn_off
                      target:
                        entity_id: input_boolean.dimming_active
                    - service: input_boolean.toggle
                      target:
                        entity_id: input_boolean.dimming_direction

        - alias: light_dimming_toggle
          id: light_dimming_toggle
          description: Toggle dimming with double click
          initial_state: true          
          mode: restart
          trigger:
            - platform: state
              entity_id: sensor.0x00158d000186d9a9_action
              to: 'double'
          condition:
            - condition: state
              entity_id: light.0x00124b00231ff227
              state: 'on'
          action:
            - choose:

                - conditions:
                    - condition: state
                      entity_id: input_boolean.dimming_active
                      state: "off"
                  sequence:
                    - service: input_boolean.turn_on
                      target:
                        entity_id: input_boolean.dimming_active
                    - repeat:
                        while:
                          - condition: state
                            entity_id: input_boolean.dimming_active
                            state: "on"
                        sequence:
                          - choose:
                              - conditions:

                                  - condition: state
                                    entity_id: input_boolean.dimming_direction
                                    state: "on"
                                sequence:
                                  - choose:

                                      - conditions:
                                          - condition: template
                                            value_template: >
                                              {{ state_attr('light.0x00124b00231ff227', 'brightness') + 10 >= 255 }}
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness: 255
                                          - service: input_boolean.turn_off
                                            target:
                                              entity_id: input_boolean.dimming_active
                                          - service: input_boolean.toggle
                                            target:
                                              entity_id: input_boolean.dimming_direction

                                      - conditions: []
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness_step: 10
        
                              - conditions:

                                  - condition: state
                                    entity_id: input_boolean.dimming_direction
                                    state: "off"
                                sequence:
                                  - choose:

                                      - conditions:
                                          - condition: template
                                            value_template: >
                                              {{ state_attr('light.0x00124b00231ff227', 'brightness') - 10 <= 10 }}
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness: 10
                                          - service: input_boolean.turn_off
                                            target:
                                              entity_id: input_boolean.dimming_active
                                          - service: input_boolean.toggle
                                            target:
                                              entity_id: input_boolean.dimming_direction
                                              
                                      - conditions: []
                                        sequence:
                                          - service: light.turn_on
                                            target:
                                              entity_id: light.0x00124b00231ff227
                                            data:
                                              brightness_step: -10
                          - delay: "00:00:01"
        
                - conditions:
                    - condition: state
                      entity_id: input_boolean.dimming_active
                      state: "on"
                  sequence:
                    - service: input_boolean.turn_off
                      target:
                        entity_id: input_boolean.dimming_active
                    - service: input_boolean.toggle
                      target:
                        entity_id: input_boolean.dimming_direction
                        


```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
