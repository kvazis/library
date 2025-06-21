### [Home Assistant - Exploring Scenes for Lighting Control](https://youtu.be/mqZJx1eOLAk)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson in text form:

```yaml
scene_light:

    scene:

      - name: off_light
        entities:
           light.yeelight_color_0x000000000531e4b4: off

      - name: on_light
        entities:
           light.yeelight_color_0x000000000531e4b4: on
           
      - name: fourth
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               brightness_pct: 25
               
      - name: half
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               brightness_pct: 50
               
      - name: three_quarters
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               brightness_pct: 75
               
      - name: full
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               brightness_pct: 100 
               
      - name: warm
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               kelvin: 2700                
               
      - name: medium
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               kelvin: 4000

      - name: cold
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               kelvin: 6500

      - name: film
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               rgb_color: [169, 153, 255]

      - name: forest
        entities:
           light.yeelight_color_0x000000000531e4b4:
              state: "on"
              rgb_color: [0, 255, 81]

      - name: romance
        entities:
           light.yeelight_color_0x000000000531e4b4: 
               state: "on"
               effect: Romance

      - name: slowtemp
        entities:
           light.yeelight_color_0x000000000531e4b4:
               state: "on"
               effect: Slow Temp
               
    input_select:               

      brightness_mode:
        name: brightness
        options:
          - fourth
          - half
          - three_quarters
          - full
        initial: three_quarters
        icon: mdi:brightness-percent               

      color_temp_mode:
        name: color_temp
        options:
          - warm
          - medium
          - cold
        initial: medium
        icon: mdi:theme-light-dark               

      rgb_mode:
        name: color_temp
        options:
          - film
          - forest
          - romance
          - slowtemp
        initial: film
        icon: mdi:television-ambient-light

    automation:               

    - id: scene_switch
      alias: change_scene
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_select.brightness_mode
        - platform: state
          entity_id: input_select.color_temp_mode
        - platform: state
          entity_id: input_select.rgb_mode          
      action:
        - service: scene.turn_on
          data_template:
            entity_id: scene.{{trigger.to_state.state}}
            transition: 2                

    - id: remote_main_button
      alias: remote_control_toggle
      initial_state: true
      trigger:
        - platform: state
          entity_id: sensor.0xccccccfffe8abc14_action
          to: "toggle"               
      action:
        - choose:
          - conditions:
              - condition: state
                entity_id: light.yeelight_color_0x000000000531e4b4
                state: "off"               
            sequence:
              - service: scene.turn_on
                entity_id: scene.on_light
                data:
                  transition: 3               
          - conditions:
              - condition: state
                entity_id: light.yeelight_color_0x000000000531e4b4
                state: "on"
            sequence:
              - service: scene.turn_on
                entity_id: scene.off_light
                data:
                  transition: 3
                  
    # - id: remote_side_buttons
    #   alias: remote_control_side
    #   initial_state: true
    #   trigger:
    #     - platform: state
    #       entity_id: sensor.0xccccccfffe8abc14_action
    #   action:
    #     - choose:
    #       - conditions:
    #           - condition: state
    #             entity_id: sensor.0xccccccfffe8abc14_action
    #             state: "brightness_up_click"
    #         sequence:
    #           - service: input_select.select_next
    #             target:
    #               entity_id: input_select.brightness_mode
    #       - conditions:
    #           - condition: state
    #             entity_id: sensor.0xccccccfffe8abc14_action
    #             state: "brightness_down_click"
    #         sequence:
    #           - service: input_select.select_previous
    #             target:
    #               entity_id: input_select.brightness_mode                  

    - id: remote_brightness_up
      alias: remote_control_up
      initial_state: true
      trigger:
        - platform: state
          entity_id: sensor.0xccccccfffe8abc14_action
          to: "brightness_up_click"
      action:
        - service: input_select.select_next
          target:
            entity_id: input_select.brightness_mode

    - id: remote_brightness_down
      alias: remote_control_down
      initial_state: true
      trigger:
        - platform: state
          entity_id: sensor.0xccccccfffe8abc14_action
          to: "brightness_down_click"
      action:
        - service: input_select.select_previous
          target:
            entity_id: input_select.brightness_mode                  

    - id: remote_temp_up
      alias: remote_control_right
      initial_state: true
      trigger:
        - platform: state
          entity_id: sensor.0xccccccfffe8abc14_action
          to: "arrow_right_click"
      action:
        - service: input_select.select_next
          target:
            entity_id: input_select.color_temp_mode

    - id: remote_temp_down
      alias: remote_control_left
      initial_state: true
      trigger:
        - platform: state
          entity_id: sensor.0xccccccfffe8abc14_action
          to: "arrow_left_click"
      action:
        - service: input_select.select_previous
          target:
            entity_id: input_select.color_temp_mode                   

    - id: remote_rgb_next
      alias: remote_control_right_hold
      initial_state: true
      trigger:
        - platform: state
          entity_id: sensor.0xccccccfffe8abc14_action
          to: "arrow_right_hold"
      action:
        - service: input_select.select_next
          target:
            entity_id: input_select.rgb_mode

    - id: remote_rgb_prev
      alias: remote_control_left_hold
      initial_state: true
      trigger:
        - platform: state
          entity_id: sensor.0xccccccfffe8abc14_action
          to: "arrow_left_hold"
      action:
        - service: input_select.select_previous
          target:
            entity_id: input_select.rgb_mode          
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
