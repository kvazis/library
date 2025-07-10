### [Home Assistant - Virtualization. Exploring the possibilities of the template platform, practice](https://youtu.be/7jbtovItjVQ)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### The lesson code has been updated as of 10.07.2025.

```yaml

# ────────────────────────────────────────────────────────────
# TEMPLATE ENTITIES (modern syntax)
# ────────────────────────────────────────────────────────────
template:

  # ─── Binary sensors ───────────────────────────────────────
  - binary_sensor:

      - name: Room Motion                 
        unique_id: room_motion
        device_class: motion
        state: >
          {{ is_state('binary_sensor.0x00158d0001e547a3_occupancy', 'on') }}
        icon: >
          {% if is_state('binary_sensor.room_motion', 'on') %}
            mdi:motion-sensor
          {% else %}
            mdi:motion-sensor-off
          {% endif %}

      - name: Flat Motion                 
        unique_id: flat_motion
        device_class: motion
        state: >
          {{ is_state('binary_sensor.0x00158d0001e547a3_occupancy', 'on')
             or is_state('binary_sensor.0x00158d00016d56f5_occupancy', 'on')
             or is_state('binary_sensor.0x00158d0001a66222_occupancy', 'on') }}
        icon: >
          {% if is_state('binary_sensor.flat_motion', 'on') %}
            mdi:account-group
          {% else %}
            mdi:account-group-outline
          {% endif %}

      - name: Apartment Windows           
        unique_id: flat_windows
        device_class: window
        state: >
          {{ is_state('binary_sensor.0x00158d000445206b_contact', 'on')
             or is_state('binary_sensor.0x00158d00013ed373_contact', 'on')
             or is_state('binary_sensor.0xec1bbdfffedf6a6a_contact', 'on') }}
        icon: >
          {% if is_state('binary_sensor.flat_windows', 'on') %}
            mdi:window-open-variant
          {% else %}
            mdi:window-closed-variant
          {% endif %}

      - name: Room Occupancy              
        unique_id: room_occupancy
        device_class: occupancy
        state: >
          {{ is_state('binary_sensor.0x00158d0001e547a3_occupancy', 'on')
             or is_state('light.yeelight_ceiling4_0x00000000049c726b', 'on')
             or (states('sensor.0x000d6f0014bb14b4_power') | float > 10)
             or is_state('binary_sensor.notebook', 'on') }}
        icon: >
          {% if is_state('binary_sensor.room_occupancy', 'on') %}
            mdi:account-multiple-check
          {% else %}
            mdi:account-multiple-check-outline
          {% endif %}

      - name: Motion in Dark              
        unique_id: moving_dark
        device_class: motion
        state: >
          {{ is_state('binary_sensor.0x00158d0001e547a3_occupancy', 'on')
             and (states('sensor.0x04cf8cdf3c7cf19e_illuminance') | float < 5000) }}
        icon: >
          {% if is_state('binary_sensor.moving_dark', 'on') %}
            mdi:motion-sensor
          {% else %}
            mdi:motion-sensor-off
          {% endif %}

      - name: Apartment Windows Delay     
        unique_id: flat_windows_delay
        device_class: window
        delay_on: 30
        state: >
          {{ is_state('binary_sensor.0x00158d000445206b_contact', 'on')
             or is_state('binary_sensor.0x00158d00013ed373_contact', 'on')
             or is_state('binary_sensor.0xec1bbdfffedf6a6a_contact', 'on') }}
        icon: >
          {% if is_state('binary_sensor.flat_windows_delay', 'on') %}
            mdi:window-open-variant
          {% else %}
            mdi:window-closed-variant
          {% endif %}

      - name: Flat Motion Delay           
        unique_id: flat_motion_delay
        device_class: motion
        delay_off:
          minutes: 5
        state: >
          {{ is_state('binary_sensor.0x00158d0001e547a3_occupancy', 'on')
             or is_state('binary_sensor.0x00158d00016d56f5_occupancy', 'on')
             or is_state('binary_sensor.0x00158d0001a66222_occupancy', 'on') }}
        icon: >
          {% if is_state('binary_sensor.flat_motion_delay', 'on') %}
            mdi:account-group
          {% else %}
            mdi:account-group-outline
          {% endif %}

      - name: Light Without Motion        
        unique_id: light_nomotion
        delay_on:
          minutes: 5
        state: >
          {{ is_state('binary_sensor.0x00158d0001e547a3_occupancy', 'off')
             and is_state('light.yeelight_ceiling4_0x00000000049c726b', 'on') }}
        icon: mdi:lightbulb-on-outline


  # ─── Sensors ──────────────────────────────────────────────
  - sensor:

      - name: Load Power                 
        unique_id: socket_power
        unit_of_measurement: W
        device_class: power
        state: "{{ (states('sensor.0x000d6f0014bb14b4_power') | float) | round(3) }}"
        icon: >
          {% set p = states('sensor.socket_power') | float %}
          {% if p < 1 %}
            mdi:gauge-empty
          {% elif p < 500 %}
            mdi:gauge-low
          {% elif p < 1000 %}
            mdi:gauge
          {% else %}
            mdi:gauge-full
          {% endif %}

      - name: Total Consumption           
        unique_id: room_total_power
        unit_of_measurement: W
        device_class: power
        state: >
          {{ (
               (states('sensor.0x588e81fffed4af56_power') | float) +
               (states('sensor.0x04cf8cdf3c764e0a_power') | float) +
               (states('sensor.0x04cf8cdf3c788a1b_power') | float)
             ) | round(3) }}
        icon: >
          {% set p = states('sensor.socket_power') | float %}
          {% if p < 1 %}
            mdi:gauge-empty
          {% elif p < 500 %}
            mdi:gauge-low
          {% elif p < 1000 %}
            mdi:gauge
          {% else %}
            mdi:gauge-full
          {% endif %}

      - name: Average Temperature         
        unique_id: room_median_temperature
        unit_of_measurement: °C
        device_class: temperature
        state: >
          {{ (
               (states('sensor.0x5c0272fffe0a4711_temperature') | float) +
               (states('sensor.0x00124b0022659c04_temperature') | float) +
               (states('sensor.0x00158d0001dcd47e_temperature') | float)
             ) / 3 | round(2) }}
        icon: mdi:temperature-celsius

      - name: Atmospheric Pressure mmHg   
        unique_id: real_mmhg_pressure
        unit_of_measurement: mmHg
        device_class: pressure
        state: "{{ (states('sensor.0x00158d0001a4b9da_pressure') | float * 0.7500637) | round(2) }}"
        icon: mdi:gauge

      - name: Static Power                
        unique_id: static_power
        unit_of_measurement: W
        device_class: power
        state: >
          {% if is_state('switch.0x00158d00010ec4b8_switch', 'on') %}
            65.5
          {% else %}
            0
          {% endif %}
        icon: mdi:flash

      - name: Humidifier State            
        unique_id: humidifier_state
        state: >
          {% if is_state('switch.0x000d6f0014bb14b4_switch', 'off') %}
            Off
          {% elif is_state('switch.0x000d6f0014bb14b4_switch', 'on')
            and (states('sensor.0x000d6f0014bb14b4_power') | float > 20) %}
            Humidifying
          {% elif is_state('switch.0x000d6f0014bb14b4_switch', 'on')
            and (states('sensor.0x000d6f0014bb14b4_power') | float < 20) %}
            No Water
          {% else %}
            Error
          {% endif %}
        icon: >
          {% if is_state('sensor.humidifier_state', 'Off') %}
            mdi:air-humidifier-off
          {% elif is_state('sensor.humidifier_state', 'Humidifying') %}
            mdi:air-humidifier
          {% elif is_state('sensor.humidifier_state', 'No Water') %}
            mdi:water-off
          {% else %}
            mdi:alert-circle
          {% endif %}


  # ─── Switches ─────────────────────────────────────────────
  - switch:

      - name: Sockets                     
        unique_id: united_switch
        value_template: >
          {{ is_state('switch.0x00158d00010ec4b8_switch', 'on')
             and is_state('switch.0x00158d0001a2ccab_switch', 'on') }}
        turn_on:
          - service: switch.turn_on
            entity_id:
              - switch.0x00158d00010ec4b8_switch
              - switch.0x00158d0001a2ccab_switch
        turn_off:
          - service: switch.turn_off
            entity_id:
              - switch.0x00158d00010ec4b8_switch
              - switch.0x00158d0001a2ccab_switch
        icon: >
          {% if is_state('switch.united_switch', 'on') %}
            mdi:power-plug
          {% else %}
            mdi:power-plug-off
          {% endif %}

      - name: Television                  
        unique_id: television
        value_template: "{{ states('sensor.0x588e81fffed4af56_power') | float > 10 }}"
        turn_on:
          - service: remote.send_command
            target:
              entity_id: remote.broadlink_remote
            data:
              command:
                - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
        turn_off:
          - service: remote.send_command
            target:
              entity_id: remote.broadlink_remote
            data:
              command:
                - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
        icon: >
          {% if is_state('switch.television', 'on') %}
            mdi:television
          {% else %}
            mdi:television-off
          {% endif %}



```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
