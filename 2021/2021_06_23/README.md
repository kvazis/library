### [Wi-Fi remote for IR and RF codes Broadlink RM4C Pro, Home Assistant integration – controlling the air conditioner](https://youtu.be/mnUF-dpVvGo)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


```yaml
    docker exec -it homeassistant /bin/bash
    
    cd /./usr/local/lib/python3.8/site-packages/broadlink
    
    vi __init__.py
```
:ballot_box_with_check: Edit mode – i
:ballot_box_with_check: Insert line – 0x6184: (rm4pro, "RM4 pro", "Broadlink"),
:ballot_box_with_check: Exit edit mode – escape
:ballot_box_with_check: Save – :w
:ballot_box_with_check: Exit editor – :q!
:ballot_box_with_check: Exit container – exit

:white_check_mark: Scripts shown in the tutorial

```yaml

      broadlink_learn_rm4:
        alias: Broadlink RM4C pro learning
        sequence:
          - service: remote.learn_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: tv
              command: power
              
    
      broadlink_learn_rm4_2:
        alias: Broadlink RM4C pro learning
        sequence:
          - service: remote.learn_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: light
              command: power on
              command_type: rf
    
      broadlink_learn_tv_command:
        alias: TV remote
        sequence:
          - service: remote.learn_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: tv
              command: 
                 - power
                 - volume +
                 - volume -
                 - menu
                 
      tv_broadlink_power:
        alias: TV power
        sequence:
          - service: remote.send_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: tv
              command: power
              
      tv_broadlink_volume_up:
        alias: TV volume +5
        sequence:
          - service: remote.send_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: tv
              command: volume +
              num_repeats: 5
              
      tv_broadlink_power_volume:
        alias: Power on and increase volume
        sequence:
          - service: remote.send_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: tv          
              command: 
                 - power
                 - volume + 
                 - volume +
                 - volume +
                 
      broadlink_send_rm4:
        alias: Send Broadlink RM4C pro
        sequence:        
          - service: remote.send_command
            data:
              entity_id: remote.rm4c_pro_remote
              command:
                - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
                - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
                - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
    
      air_conditioner:
        alias: Air conditioner
        sequence:
          - service: remote.learn_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: conditioner
              command: 
                 - cold
                 - power off             
                 
      delete_command:
        sequence:
          - service: remote.delete_command
            target:
              entity_id: remote.rm4c_pro_remote
            data:
              device: light
              command: ON

```

:white_check_mark: Package for air conditioner control

```yaml
broadlink:

    switch:
      - platform: template
        switches:

          air_conditioner:
            friendly_name: "Air Conditioner"
            value_template: "{{ states('sensor.0x04cf8cdf3c764e0a_power') | float > 10 }}"
            turn_on:
              service: remote.send_command
              target:
                entity_id: remote.rm4c_pro_remote
              data:
                device: conditioner
                command: 
                   - cold
            turn_off:
              service: remote.send_command
              target:
                entity_id: remote.rm4c_pro_remote
              data:
                device: conditioner
                command: 
                   - power off
            icon_template: >-
              {% if is_state("switch.air_conditioner", "on") %}
              mdi:air-conditioner
              {% else %}
              mdi:power-off
              {% endif %}
              
    climate:
      - platform: generic_thermostat
        name: air_conditioner
        heater: switch.air_conditioner
        target_sensor: sensor.0x00158d000156e92e_temperature
        target_temp: 22
        min_temp: 21
        max_temp: 25
        ac_mode: true
        cold_tolerance: 0.5
        hot_tolerance: 0.5
        min_cycle_duration:
          minutes: 5
        keep_alive:
          minutes: 3
        initial_hvac_mode: "cool"

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
