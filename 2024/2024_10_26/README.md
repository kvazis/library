### [Home Assistant + WLED - turn on/off the address bar with a smooth fill effect](https://youtu.be/PYHZ2-LVdoA)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml

gradient:


    template:

      - binary_sensor:

          - name: gradient_wled_on
            unique_id: gradient_wled_on
            state: >
                {{ state_attr('light.br_wled_round', 'effect') == 'Percent' and
                   state_attr('light.br_wled_round', 'brightness') == 255 and 
                   states('number.br_wled_round_intensity')|int == 100 }}
            device_class: light

    automation:
    
      - alias: gradient_wled_on
        id: gradient_wled_on
        description: Gradient_wled
        initial_state: true
        trigger:
    ## Virtual button
        - platform: state
          entity_id: input_button.test_test
        condition:
        - condition: state
          entity_id: binary_sensor.gradient_wled_on
          state: 'off'
        action:
        - service: light.turn_on
          entity_id: light.br_wled_round
          data:
            effect: Solid
            rgb_color: [0, 0, 0]
        - service: light.turn_on
          entity_id: light.br_wled_round
          data:
            effect: Percent
            brightness_pct: 100
            rgb_color: [255, 255, 255]
        - service: select.select_option
          data:
            option: Default
          target:
            entity_id: select.br_wled_round_color_palette
        - service: number.set_value
          target:
            entity_id: number.br_wled_round_intensity
          data:
            value: 5
        - service: script.turn_on
          entity_id: script.gradient_wled_on

      - alias: gradient_wled_off
        id: gradient_wled_off
        description: Gradient_wled
        initial_state: true
        trigger:
    ## Virtual button
        - platform: state
          entity_id: input_button.test_test
        condition:
        - condition: state
          entity_id: binary_sensor.gradient_wled_on
          state: 'on'
        action:
        - service: script.turn_on
          entity_id: script.gradient_wled_off
              
    script:
    
      gradient_wled_on:
        alias: gradient_wled_on
        sequence:
            repeat:
              count: 19
              sequence:
              - service: light.turn_on
                entity_id: light.br_wled_round
                data:
                  brightness_step_pct: 10
              - service: number.set_value
                target:
                  entity_id: number.br_wled_round_intensity
                data:
                  value: "{{ states('number.br_wled_round_intensity') |int + 5 }}"

                  
      gradient_wled_off:
        alias: gradient_wled_off
        sequence:
            repeat:
              count: 20
              sequence:
              - service: light.turn_on
                entity_id: light.br_wled_round
                data:
                  brightness_step_pct: -5
              - service: number.set_value
                target:
                  entity_id: number.br_wled_round_intensity
                data:
                  value: "{{ states('number.br_wled_round_intensity') |int - 5 }}"
                  


```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
