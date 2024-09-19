### [Home Assistant - Ecoflow Home Integration](https://youtu.be/zIK3yFMLnNg)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Resources:    

:white_check_mark: **Resources:**    
:ballot_box_with_check: [EcoFlow Cloud Integration for Home Assistant](https://github.com/tolwi/hassio-ecoflow-cloud)     
:ballot_box_with_check: [Ecoflow public API](https://developer-eu.ecoflow.com/us/security)     
:ballot_box_with_check: [Power Flow Card Plus](https://github.com/flixlix/power-flow-card-plus)     
 

#### Program code:  

:ballot_box_with_check: Power Flow Card Plus     

```yaml

            - type: custom:power-flow-card-plus
              clickable_entities: true
              entities:
                grid:
                  entity: sensor.delta_2_ac_in_power
                  power_outage:
                    entity: binary_sensor.electricity
                    state_alert: "on"
                    display_state: one_way
                    color_circle: true
                solar:
                  entity: sensor.delta_2_solar_in_power
                battery:
                  entity:
                    consumption: sensor.delta_2_battery_out_power
                    production: sensor.delta_2_battery_in_power
                  state_of_charge: sensor.delta_2_battery_level
                  display_state: one_way
                  color_circle: true
                home:
                  entity: sensor.delta_2_total_out_power
                  override_state: true
                individual:
                - entity: sensor.delta_2_ac_out_power
                  name: AC out
                  icon: mdi:power-socket-eu
                  display_zero: true
                - entity: sensor.delta_2_usb_out_power
                  name: USB A out
                  icon: mdi:usb-port
                  display_zero: true
                - entity: sensor.delta_2_type_c_out_power
                  name: USB C out
                  icon: mdi:usb-c-port
                  display_zero: true
                - entity: sensor.delta_2_dc_out_power
                  name: DC out
                  icon: mdi:current-dc
                  display_zero: true 


```


:ballot_box_with_check: Template sensors    

```yaml
    template:

        sensor:

          - name: delta_2_battery_in_power
            unique_id: delta_2_battery_in_power
            state: >
                {% if states('sensor.delta_2_total_in_power')|float > states('sensor.delta_2_total_out_power')|float %}
                {{ states('sensor.delta_2_total_in_power')|float - states('sensor.delta_2_total_out_power')|float }}
                {% else %}
                0
                {% endif %} 
                
          - name: delta_2_battery_out_power
            unique_id: delta_2_battery_out_power
            state: >
                {% if states('sensor.delta_2_total_out_power')|float > states('sensor.delta_2_total_in_power')|float %}
                {{ states('sensor.delta_2_total_out_power')|float - states('sensor.delta_2_total_in_power')|float }}
                {% else %}
                0
                {% endif %} 
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
