### [Home Assistant 2025. Practice — applying selects, passing variables, making an alarm clock](https://youtu.be/rnNADM7P3jQ)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
da_alarm:

    input_boolean:
      da_alarm1_enabled:
        name: Alarm 1
      da_alarm2_enabled:
        name: Alarm 2
      da_alarm3_enabled:
        name: Alarm 3
    
    input_datetime:
      da_alarm1_time:
        name: Alarm 1 — time
        has_date: false
        has_time: true
      da_alarm2_time:
        name: Alarm 2 — time
        has_date: false
        has_time: true
      da_alarm3_time:
        name: Alarm 3 — time
        has_date: false
        has_time: true
    
    input_select:
      da_alarm1_repeat:
        name: Alarm 1 — repeat
        options: ["Once", "Weekdays"]
        initial: Once
      da_alarm2_repeat:
        name: Alarm 2 — repeat
        options: ["Once", "Weekdays"]
        initial: Once
      da_alarm3_repeat:
        name: Alarm 3 — repeat
        options: ["Once", "Weekdays"]
        initial: Once

      da_alarm1_tone:
        name: Alarm 1 — tone
        options: [melody_1, melody_2, melody_3, melody_4, melody_5]
        initial: melody_1
      da_alarm2_tone:
        name: Alarm 2 — tone
        options: [melody_1, melody_2, melody_3, melody_4, melody_5]
        initial: melody_1
      da_alarm3_tone:
        name: Alarm 3 — tone
        options: [melody_1, melody_2, melody_3, melody_4, melody_5]
        initial: melody_1


    template:

      - binary_sensor:

    # Sensor once 1 alarm
          - name: 'da_alarm1_fire_once'
            unique_id: 'da_alarm1_fire_once'
            state: >
              {{ states('input_select.da_alarm1_repeat') == 'Once' and
                   states("sensor.current_time") == states("input_datetime.da_alarm1_time")}}
            device_class: running
            
    # Sensor weekday 1 alarm
          - name: 'da_alarm1_fire_weekday'
            unique_id: 'da_alarm1_fire_weekday'
            state: >
              {{ states('input_select.da_alarm1_repeat') == 'Weekdays' and 
                 now().isoweekday() in [1,2,3,4,5] and
                 states("sensor.current_time") == states("input_datetime.da_alarm1_time")}}
            device_class: running
            
    # Sensor once 2 alarm
          - name: 'da_alarm2_fire_once'
            unique_id: 'da_alarm2_fire_once'
            state: >
              {{ states('input_select.da_alarm2_repeat') == 'Once' and
                   states("sensor.current_time") == states("input_datetime.da_alarm2_time")}}
            device_class: running
            
    # Sensor weekday 2 alarm
          - name: 'da_alarm2_fire_weekday'
            unique_id: 'da_alarm2_fire_weekday'
            state: >
              {{ states('input_select.da_alarm2_repeat') == 'Weekdays' and 
                 now().isoweekday() in [1,2,3,4,5] and
                 states("sensor.current_time") == states("input_datetime.da_alarm2_time")}}
            device_class: running
            
    # Sensor once 3 alarm
          - name: 'da_alarm3_fire_once'
            unique_id: 'da_alarm3_fire_once'
            state: >
              {{ states('input_select.da_alarm3_repeat') == 'Once' and
                   states("sensor.current_time") == states("input_datetime.da_alarm3_time")}}
            device_class: running
            
    # Sensor weekday 3 alarm
          - name: 'da_alarm3_fire_weekday'
            unique_id: 'da_alarm3_fire_weekday'
            state: >
              {{ states('input_select.da_alarm3_repeat') == 'Weekdays' and 
                 now().isoweekday() in [1,2,3,4,5] and
                 states("sensor.current_time") == states("input_datetime.da_alarm3_time")}}
            device_class: running
    
    script:
      da_alarm_play_60s_ramp:
        alias: DA Alarm — play 60s with increasing volume
        mode: restart
        variables:
          player: media_player.living_room
          default_media: media-source://media_source/local/melody_1.mp3
          start: 0.20      # Start volume (20%)
          step: 0.05       # step +5% every 10s
          steps: 5         # 5 steps 
        sequence:
          - service: media_player.volume_set
            target: { entity_id: "{{ player }}" }
            data: { volume_level: "{{ start }}" }
    
          - service: media_player.play_media
            target: { entity_id: "{{ player }}" }
            data:
              media_content_id: "{{ media | default(default_media) }}"
              media_content_type: music
    
          - repeat:
              count: "{{ steps }}"
              sequence:
                - delay: "00:00:10"
                - service: media_player.volume_set
                  target: { entity_id: "{{ player }}" }
                  data:
                    volume_level: "{{ [start + step * repeat.index, 1] | min }}"
          - delay: "00:00:10"
          - service: media_player.media_stop
            target: { entity_id: "{{ player }}" }
    
    automation:
    
      - alias: da_alarm
        id: da_alarm
        description: DA Alarm 
        trigger:

        - platform: state
          entity_id: binary_sensor.da_alarm1_fire_once
          from: 'off'
          to: 'on'
          id: alarm_once_1
          
        - platform: state
          entity_id: binary_sensor.da_alarm2_fire_once
          from: 'off'
          to: 'on'
          id: alarm_once_2
          
        - platform: state
          entity_id: binary_sensor.da_alarm3_fire_once
          from: 'off'
          to: 'on'
          id: alarm_once_3

        - platform: state
          entity_id: binary_sensor.da_alarm1_fire_weekday
          from: 'off'
          to: 'on'
          id: alarm_weekday_1
          
        - platform: state
          entity_id: binary_sensor.da_alarm2_fire_weekday
          from: 'off'
          to: 'on'
          id: alarm_weekday_2
          
        - platform: state
          entity_id: binary_sensor.da_alarm3_fire_weekday
          from: 'off'
          to: 'on'
          id: alarm_weekday_3

        action:
            - choose:
              - conditions:
                  - condition: trigger
                    id: alarm_once_1
                  - condition: state
                    entity_id: input_boolean.da_alarm1_enabled
                    state: 'on' 
                sequence:
                  - service: script.turn_on
                    target: { entity_id: script.da_alarm_play_60s_ramp }
                    data:
                      variables:
                        media: >-
                          media-source://media_source/local/{{ states('input_select.da_alarm1_tone') }}.mp3
                  - service: input_boolean.turn_off
                    target:
                      entity_id: input_boolean.da_alarm1_enabled

              - conditions:
                  - condition: trigger
                    id: alarm_once_2
                  - condition: state
                    entity_id: input_boolean.da_alarm2_enabled
                    state: 'on' 
                sequence:
                  - service: script.turn_on
                    target: { entity_id: script.da_alarm_play_60s_ramp }
                    data:
                      variables:
                        media: >-
                          media-source://media_source/local/{{ states('input_select.da_alarm2_tone') }}.mp3
                  - service: input_boolean.turn_off
                    target:
                      entity_id: input_boolean.da_alarm2_enabled                      

              - conditions:
                  - condition: trigger
                    id: alarm_once_3
                  - condition: state
                    entity_id: input_boolean.da_alarm3_enabled
                    state: 'on' 
                sequence:
                  - service: script.turn_on
                    target: { entity_id: script.da_alarm_play_60s_ramp }
                    data:
                      variables:
                        media: >-
                          media-source://media_source/local/{{ states('input_select.da_alarm3_tone') }}.mp3
                  - service: input_boolean.turn_off
                    target:
                      entity_id: input_boolean.da_alarm3_enabled              

              - conditions:
                  - condition: trigger
                    id: alarm_weekday_1
                  - condition: state
                    entity_id: input_boolean.da_alarm1_enabled
                    state: 'on' 
                sequence:
                  - service: script.turn_on
                    target: { entity_id: script.da_alarm_play_60s_ramp }
                    data:
                      variables:
                        media: >-
                          media-source://media_source/local/{{ states('input_select.da_alarm1_tone') }}.mp3
    
              - conditions:
                  - condition: trigger
                    id: alarm_weekday_2
                  - condition: state
                    entity_id: input_boolean.da_alarm2_enabled
                    state: 'on' 
                sequence:
                  - service: script.turn_on
                    target: { entity_id: script.da_alarm_play_60s_ramp }
                    data:
                      variables:
                        media: >-
                          media-source://media_source/local/{{ states('input_select.da_alarm2_tone') }}.mp3
                          
              - conditions:
                  - condition: trigger
                    id: alarm_weekday_3
                  - condition: state
                    entity_id: input_boolean.da_alarm3_enabled
                    state: 'on' 
                sequence:
                  - service: script.turn_on
                    target: { entity_id: script.da_alarm_play_60s_ramp }
                    data:
                      variables:
                        media: >-
                          media-source://media_source/local/{{ states('input_select.da_alarm3_tone') }}.mp3



```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
