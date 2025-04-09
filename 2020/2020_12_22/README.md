### [Home Assistant. Practical cases - Blueprints, how it works, creating your own project](https://youtu.be/RB-vd1H5XtE)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Examples shown in the lesson, updated as of 09.04.2025    
#### Automations    

```yaml

- id: Automatic light activation in the hallway
  alias: Motion-activated Light
  description: Light activation automation blueprint
## To make it work, set initial_state: true
  initial_state: false
  use_blueprint:
    path: homeassistant/motion_light.yaml
    input:
      no_motion_wait: '45'
      motion_entity: binary_sensor.0x00158d00013f7894_occupancy
      light_target:
        entity_id: light.0x00158d000420dbab_light

- id: Automatic light activation in the corridor
  alias: Motion-activated Light 2
  description: Light activation automation blueprint
## To make it work, set initial_state: true
  initial_state: false
  use_blueprint:
    path: homeassistant/motion_light.yaml
    input:
      no_motion_wait: '60'
      motion_entity: binary_sensor.0x00158d00013f7500_occupancy
      light_target:
        entity_id: light.0x00158d000420d500_light

- id: Automatic light activation in the kitchen
  alias: Motion-activated Light 3
  description: Light activation automation blueprint
## To make it work, set initial_state: true
  initial_state: false
  use_blueprint:
    path: homeassistant/motion_light.yaml
    input:
      no_motion_wait: '60'
      motion_entity: binary_sensor.0x00158d00013f7800_occupancy
      light_target:
        entity_id: light.0x00158d000420d7880_light


```

#### Project

```yaml
blueprint:
  name: Light Auto off
  description: Turn off a light when no motion
  domain: automation
  input:
    motion_entity:
      name: Template motion Sensor
      description: Template sensor - motion and light off
      selector:
        entity:
          domain: binary_sensor
          device_class: motion
    light_off_entity:
      name: Template motion Sensor
      description: Template sensor - motion and light off
      selector:
        entity:
          domain: binary_sensor
          device_class: light
    light_on_entity:
      name: Template light sensor
      description: Template sensor - no motion and light on
      selector:
        entity:
          domain: binary_sensor
          device_class: light
    timer_entity:
      name: Timer
      description: Wait for motion
      selector:
        entity:
          domain: timer
    light_target:
      name: Light
      selector:
        target:
          entity:
            domain: light
            
mode: restart
max_exceeded: silent

trigger:
  - platform: state
    entity_id: !input motion_entity
    from: "off"
    to: "on"
  - platform: state
    entity_id: !input light_on_entity

action:
  choose:
    # 1. Motion detected - lihgt on
    - conditions:
        - condition: state
          entity_id: !input light_off_entity
          state: 'on'
      sequence:
        - service: light.turn_on
          target: !input light_target
    # 2. No Motion and light turn on
    - conditions:
        - condition: state
          entity_id: !input light_on_entity
          state: 'on'
      sequence:
        - service: timer.start
          entity_id: !input timer_entity
        - wait_for_trigger:
              platform: event
              event_type: timer.finished
              event_data:
                entity_id: !input timer_entity
        - service: light.turn_off
          target: !input light_target
    # 3. No Motion and light turn off
    - conditions:
        - condition: state
          entity_id: !input light_on_entity
          state: 'off'
      sequence:
        - service: timer.cancel
          entity_id: !input timer_entity
          
```

#### Packages

```yaml

unit10_3:

  binary_sensor:

    # Auto light off sensor
    - platform: template
      sensors:

        motion_no_light:
          friendly_name: "Motion detected, light is off"
          value_template: >-
            {{ is_state('light.0x00158d000420dbab_light', 'off')  
               and is_state('binary_sensor.0x00158d00013f7894_occupancy', 'on')  }}
          device_class: light

        no_motion_light:
          friendly_name: "Light is on, no motion"
          value_template: >-
            {{ is_state('light.0x00158d000420dbab_light', 'on')  
               and is_state('binary_sensor.0x00158d00013f7894_occupancy', 'off')  }}
          device_class: light

  timer:

    unit_10_3:
      name: Light auto-off in entrance after -
      duration: '00:01:00'

  automation:

    - id: Automatic light control in entrance
      alias: light_motion_entrance
      initial_state: false
      use_blueprint:
        path: homeassistant/light_auto_off.yaml
        input:
          motion_entity: binary_sensor.0x00158d00013f7894_occupancy
          light_off_entity: binary_sensor.motion_no_light
          light_on_entity: binary_sensor.no_motion_light
          timer_entity: timer.unit_10_3
          light_target:
            entity_id: light.0x00158d000420dbab_light
            
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
