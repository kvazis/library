### [Home Assistant – Creating Energy Monitoring Based on Device Data](https://youtu.be/t-AhgPKRpAA)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
unit_10_5:
# Energy Monitoring

    automation:

        - id: energy_monitoring_new_day_start
          alias: consumption_new_day
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:05'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/newday"
                payload: "{{states('sensor.0x04cf8cdf3c764e0a_energy') | float}}"
                retain: true

        - id: energy_monitoring_yesterday
          alias: consumption_yesterday
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:00'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/yesterday"
                payload: "{{states('sensor.consumption_day') | float}}"
                retain: true

        - id: energy_monitoring_new_week_start
          alias: consumption_new_week
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:05'
          condition:
          - condition: time
            weekday:
              - mon
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/newweek"
                payload: "{{states('sensor.0x04cf8cdf3c764e0a_energy') | float}}"
                retain: true

        - id: energy_monitoring_previous_week
          alias: consumption_previous_week
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:00'
          condition:
          - condition: time
            weekday:
              - mon
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/previousweek"
                payload: "{{states('sensor.consumption_week') | float}}"
                retain: true

        - id: energy_monitoring_new_month_start
          alias: consumption_new_month
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:05'
          condition:
           - condition: template
             value_template: '{{ now().day == 1 }}'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/newmonth"
                payload: "{{states('sensor.0x04cf8cdf3c764e0a_energy') | float}}"
                retain: true

        - id: energy_monitoring_previous_month
          alias: consumption_previous_month
          initial_state: true
          trigger:
            - platform: time
              at: '00:00:00'
          condition:
           - condition: template
             value_template: '{{ now().day == 1 }}'
          action: 
            - service: mqtt.publish
              data_template:                
                topic: "energymonitor/previousmonth"
                payload: "{{states('sensor.consumption_month') | float}}"
                retain: true

    sensor:
    
      - platform: mqtt
        state_topic: "energymonitor/newday"
        name: consumption_new_day
        unit_of_measurement: 'кВт⋅ч'

      - platform: mqtt
        state_topic: "energymonitor/yesterday"
        name: consumption_yesterday
        unit_of_measurement: 'кВт⋅ч'

      - platform: mqtt
        state_topic: "energymonitor/newweek"
        name: consumption_new_week
        unit_of_measurement: 'кВт⋅ч'
        
      - platform: mqtt
        state_topic: "energymonitor/previousweek"
        name: consumption_previous_week
        unit_of_measurement: 'кВт⋅ч'
        
      - platform: mqtt
        state_topic: "energymonitor/newmonth"
        name: consumption_new_month
        unit_of_measurement: 'кВт⋅ч'        

      - platform: mqtt
        state_topic: "energymonitor/previousmonth"
        name: consumption_previous_month
        unit_of_measurement: 'кВт⋅ч'
        
      - platform: template
        sensors:

          consumption_day:
            friendly_name: "Consumption for current day"
            unit_of_measurement: 'кВт⋅ч'
            value_template: "{{ (states('sensor.0x04cf8cdf3c764e0a_energy') | float - (states('sensor.consumption_new_day') | float))|round(2) }}"
            icon_template: mdi:flash 
            
          consumption_week:
            friendly_name: "Consumption for current week"
            unit_of_measurement: 'кВт⋅ч'
            value_template: "{{ (states('sensor.0x04cf8cdf3c764e0a_energy') | float - (states('sensor.consumption_new_week') | float))|round(2) }}"
            icon_template: mdi:flash             
            
          consumption_month:
            friendly_name: "Consumption for current month"
            unit_of_measurement: 'кВт⋅ч'
            value_template: "{{ (states('sensor.0x04cf8cdf3c764e0a_energy') | float - (states('sensor.consumption_new_month') | float))|round(2) }}"
            icon_template: mdi:flash  

```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
