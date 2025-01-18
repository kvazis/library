### [Qingping Cleargrass CGS1 Air Quality Monitor - Review, Home Assistant Integration](https://youtu.be/KZQASrq3pT0)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Pakages - Link to external folder (configuration.yaml)    

```yaml

air_cleargrass:

    binary_sensor:
      - platform: template
        sensors:
          cleargrass_air:
            friendly_name: "Cleargrass Air, bad air"
            value_template: >-
              {{ states('sensor.cleargrass_air_co2a')|float > 1500 
                 or states('sensor.cleargrass_air_pm25')|float > 100 
                 or states('sensor.cleargrass_air_tvoc')|float > 220 }}
            icon_template: >-
              {% if is_state("binary_sensor.cleargrass_air", "on") %}
              mdi:biohazard
              {% else %}
              mdi:air-filter
              {% endif %}
              
    sensor: 

      - platform: template
        sensors:
          cleargrass_air_co2a:
            friendly_name: 'Cleargrass air СО2а - '
            value_template: "{{ state_attr('air_quality.cleargrass_air_monitor', 'carbon_dioxide') }}"  
            icon_template: mdi:periodic-table-co2
            entity_id: air_quality.cleargrass_air_monitor
            unit_of_measurement: 'ppm'
            
          cleargrass_air_tvoc:
            friendly_name: 'Cleargrass air TVOC - '
            value_template: "{{ state_attr('air_quality.cleargrass_air_monitor', 'total_volatile_organic_compounds') }}"
            icon_template: mdi:alpha-t
            entity_id: air_quality.cleargrass_air_monitor
            unit_of_measurement: 'ppb'
            
          cleargrass_air_pm25:
            friendly_name: 'Cleargrass air PM 2.5 - '
            value_template: "{{ state_attr('air_quality.cleargrass_air_monitor', 'particulate_matter_2_5') }}"  
            icon_template: mdi:alpha-p
            entity_id: air_quality.cleargrass_air_monitor
            unit_of_measurement: 'ppm'
            
          cleargrass_air_temperature:
            friendly_name: 'Cleargrass air temperature - '
            value_template: "{{ state_attr('air_quality.cleargrass_air_monitor', 'temperature') }}"  
            icon_template: mdi:temperature-celsius
            entity_id: air_quality.cleargrass_air_monitor
            unit_of_measurement: '°C'
            
          cleargrass_air_humidity:
            friendly_name: 'Cleargrass air humidity - '
            value_template: "{{ state_attr('air_quality.cleargrass_air_monitor', 'humidity') }}"  
            icon_template: mdi:water-percent
            entity_id: air_quality.cleargrass_air_monitor
            unit_of_measurement: '%'

```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
