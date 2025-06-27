### [BlitzWolf BW-IS22 - Alarm System, Wi-Fi + GSM, Tuya Smart, integration and control in Home Assistant](https://youtu.be/q8662SThzoQ)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson in text form:

```yaml
tuya_security:

    localtuya:
      - host: !secret tuya_security_host
        device_id: !secret tuya_security_device_id
        local_key: !secret tuya_security_local_key
        friendly_name: Blitzwolf Security System
        protocol_version: '3.3'
        entities:
          - platform: sensor
            friendly_name: security_state
            id: 1
          - platform: sensor
            friendly_name: exit_delay
            id: 2
            unit_of_measurement: 'sec'
          - platform: sensor
            friendly_name: alarm_time
            id: 3
            unit_of_measurement: 'min'
          - platform: binary_sensor
            friendly_name: sound
            id: 4


    input_select:               

      security_state:
        name: Alarm Mode
        options:
          - disarmed
          - home
          - arm
          - sos
        initial: disarmed
        icon: mdi:shield-account

    input_number:
      exit_delay:
        name: Exit Delay
        initial: 30
        min: 0
        max: 60
        step: 1
        unit_of_measurement: 'sec'
      alarm_time:
        name: Alarm Duration
        initial: 3
        min: 1
        max: 10
        step: 1
        unit_of_measurement: 'min'

    automation:               

    - id: Alarm Mode Change
      alias: change_exit_delay
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_select.security_state
      action:
        - service: localtuya.set_dp
          data:
           device_id: !secret tuya_security_device_id
           dp: 1
           value: "{{ states('input_select.security_state') }}"

    - id: Exit Delay Update
      alias: change_security_state
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_number.exit_delay
      action:
        - service: localtuya.set_dp
          data:
           device_id: !secret tuya_security_device_id
           dp: 2
           value: "{{ states('input_number.exit_delay')| int }}"

    - id: Alarm Duration Update
      alias: change_alarm_time
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_number.alarm_time
      action:
        - service: localtuya.set_dp
          data:
           device_id: !secret tuya_security_device_id
           dp: 3
           value: "{{ states('input_number.alarm_time')| int }}"

    switch:                   
      - platform: template
        switches:
          alarm_sound:
            friendly_name: "Alarm Sound"
            value_template: "{{  is_state('binary_sensor.sound', 'on') }}"
            turn_on:
              service: localtuya.set_dp
              data:
                device_id: !secret tuya_security_device_id
                dp: 4
                value: "{{true}}"
            turn_off:
              service: localtuya.set_dp
              data:
                device_id: !secret tuya_security_device_id
                dp: 4
                value: "{{false}}"
            icon_template: >-
              {% if is_state('switch.alarm_sound', 'on') %}
                mdi:volume-high
              {% else %}
                mdi:volume-off
              {% endif %}
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
