#### [Home Assistant. Lesson 10.2 Practical Cases - Weather Monitoring and Telegram Notifications](https://youtu.be/5B3RfOMzvak)    

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Resources:    

:white_check_mark: **Emoji codes for Telegram** - [unicode.org](https://tteck.github.io/Proxmox/)    

#### Package from lesson:  

```yaml
    sensor:
    # Conversion to mmHg
      - platform: template
        sensors:
          0x00158d0001a4b9da_pressure_mmhg:
            friendly_name: "Atmospheric pressure outside"
            unit_of_measurement: 'mmHg'
            value_template: "{{ (states('sensor.0x00158d0001a4b9da_pressure')|float * 0.7500637)|round(2) }}"
            icon_template: mdi:gauge
            
    script:
    
      climate_report:
        alias: Weather report
        sequence:
         - service: notify.telegram_id_1
           data:
             message: | 
                 {{"\U0001F3E0"}} Climate report for {{ states('sensor.time_date') }}
                 {{"\U0001F321"}} Temperature - {{ states('sensor.0x00158d0001a4b9da_temperature') }} C
                 {{"\U0001F32B"}} Humidity - {{ states('sensor.0x00158d0001a4b9da_humidity') }} %
                 {{"\U0001F4AA"}} Pressure - {{ states('sensor.0x00158d0001a4b9da_pressure_mmhg') }} mmHg
                 {{"\U00002600"}} Weather - {{ states('sensor.openweathermap_weather') }}
                 {{"\U00002B50"}} Forecast for today - {{ states('sensor.openweathermap_forecast_temperature') }} C
                 {{"\U0001F327"}} Rain forecast - {{ states('sensor.openweathermap_rain') }}
                 {{"\U0001F328"}} Snow forecast - {{ states('sensor.openweathermap_snow') }}  

            
    automation:   
    
        - id: weather_report_request
          alias: send_climate_report
        #   initial_state: true  - set to true for operation!!!
          initial_state: false
          trigger:
          - platform: event
            event_type: telegram_command
            event_data:
              command: '/forecast'
          - platform: time
            at: '07:30:00'              
          action:
           - service: script.turn_on
             entity_id: 
                - script.climate_report
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
