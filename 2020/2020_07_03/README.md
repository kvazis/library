### [Geiger counter for smart home - zigbee sensor for monitoring radioactive background](https://youtu.be/Ma3Pshu6DWw)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package    

```yaml

radioactive:

    sensor: 
    
        - platform: mqtt
          state_topic: "radioactive/alarm_per_day"
          name: '0x00124b001d3bde2f_alarm_per_day'
          
        - platform: mqtt
          state_topic: "radioactive/alarm_yesterday"
          name: '0x00124b001d3bde2f_alarm_yesterday'
    
    automation:
    
        - alias: radiation_alarm_save
          id: 'Запись превышения уровня'
          initial_state: true
          trigger:
            - platform: state
              entity_id: sensor.0x00124b001d3bde2f_action
              to: 'on'
          action:
            - service: mqtt.publish
              data_template:
                topic: "radioactive/alarm_per_day"
                payload: "{{(states('sensor.0x00124b001d3bde2f_alarm_per_day') | int + 1) }}"
                retain: true

        - alias: radiation_alarm_yesterday
          id: 'Сохранение показаний за предыдущий день'
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:01'
          action:
            - service: mqtt.publish
              data_template:
                topic: "radioactive/alarm_yesterday"
                payload: "{{(states('sensor.0x00124b001d3bde2f_alarm_per_day') | int ) }}"
                retain: true
                  
        - alias: radiation_alarm_reset
          id: 'Обнуление показания счетчика'
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:05'
          action:
            - service: mqtt.publish
              data_template:
                topic: "radioactive/alarm_per_day"
                payload: '{{ 0 }}'
                retain: true

```

#### Lovelace    

```yaml

        - type: markdown
          content: >
             **Geiger Counter**

        - type: custom:mini-graph-card
          icon: mdi:radioactive
          entities:
           - entity: sensor.0x00124b001d3bde2f_radiation_dose_per_hour
             name: Background Radiation in µR/h
          color_thresholds:
            - value: 1
              color: "#7fff0c"
            - value: 20
              color: "#fffb5a"
            - value: 25
              color: "#ff1438"
          animate: true
          line_width: 3

        - type: entities
          show_header_toggle: false
          entities:
          - entity: sensor.0x00124b001d3bde2f_alarm_per_day
            name: Alarms for Exceeding Levels Today
            icon: mdi:alarm-light
          - entity: sensor.0x00124b001d3bde2f_alarm_yesterday
            name: Alarms for Exceeding Levels Yesterday
            icon: mdi:alarm-light-outline


```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
