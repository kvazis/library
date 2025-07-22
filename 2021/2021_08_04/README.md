### [Home Assistant. Practice - Indoor Air Humidification](https://youtu.be/MPtem0rtt0o)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
Home Assistant. Practice - Indoor Air Humidification

humidification:

# Air humidifier with mechanical control

    binary_sensor:
    
    # Humidification mode  
      - platform: mqtt
        name: humidity_mode
        state_topic: "humidity/mode"
        payload_on: "ON"
        payload_off: "OFF"

    # Humidification time  
      - platform: tod
        name: humidity_time
        after: '09:00'
        before: '22:00'
        
      - platform: template
        sensors:
        
          room_windows:
            friendly_name: "Room windows"
            device_class: window
            delay_on:
                seconds: 30
            value_template: >-
              {{ is_state('binary_sensor.0x00158d000445206b_contact', 'on') 
              or is_state('binary_sensor.0xec1bbdfffedf6a6a_contact', 'on')  }}
            icon_template: >-
              {% if is_state('binary_sensor.room_windows', 'on') %}
                mdi:window-open-variant
              {% else %}
                mdi:window-closed-variant
              {% endif %}        

          humidity:
            friendly_name: "Humidification"
            value_template: >-
              {{ is_state('binary_sensor.room_windows', 'off')  
                 and is_state('binary_sensor.humidity_mode', 'on')
                 and is_state('binary_sensor.humidity_time', 'on') }}
            icon_template: >-
              {% if is_state("binary_sensor.humidity", "on") %}
              mdi:water-percent
              {% else %}
              mdi:air-humidifier
              {% endif %}

    input_number:

          humidity_level:
            name: Set humidity level
            initial: 50
            min: 30
            max: 70
            step: 1

    switch:
    
      - platform: template
        switches:
          humidity_mode:
            friendly_name: "Air humidification mode"
            value_template: "{{  is_state('binary_sensor.humidity_mode', 'on') }}"
            turn_on:
              service: mqtt.publish
              data_template:
                topic: "humidity/mode"
                payload_template: 'ON'
                retain: true 
            turn_off:
              service: mqtt.publish
              data_template:
                topic: "humidity/mode"
                payload_template: 'OFF'
                retain: true 
            icon_template: >-
              {% if is_state("switch.humidity_mode", "on") %}
              mdi:air-humidifier
              {% else %}
              mdi:air-humidifier-off
              {% endif %}
              
    automation:
            
        - alias: humidity
          id: 'Humidifier operation'
          initial_state: true
          trigger:
            - platform: homeassistant
              event: start
            - platform: state
              entity_id:
                - input_number.humidity_level
                - sensor.0x00158d0001dcd47e_humidity
                - binary_sensor.humidity              
          action:
            service_template: >-
              {% set hi = (states('input_number.humidity_level') | float) + 5 %}
              {% set lo = (states('input_number.humidity_level') | float) - 5 %}
              {% set humidity = states('sensor.0x00158d0001dcd47e_humidity') | float %}
              {% if humidity > hi %}
                switch.turn_off
              {% elif states.binary_sensor.humidity.state == 'off' %} 
                switch.turn_off
              {% elif humidity < lo and states.binary_sensor.humidity.state == 'on' %}
                switch.turn_on
              {% else %}
                switch.turn_{{states('switch.0x60a423fffe7ff8c8_switch') | lower}}
              {% endif %}
            entity_id: switch.0x60a423fffe7ff8c8_switch
            
            
        - alias: water_warning
          id: 'Water shortage warning'
          initial_state: true
          trigger:
        ## Power drops below 10 Watts
           - platform: numeric_state
             entity_id: sensor.0x60a423fffe7ff8c8_power
             below: 10
             for:
               minutes: 2
          condition:
        ## Humidifier is on
             - condition: state
               entity_id: switch.0x60a423fffe7ff8c8_switch
               state: 'on'
          action:
            - service: telegram_bot.send_message
              data_template:
                target:
                    - !secret chat_id_group
                message: | 
                     {{"\U0001F6B1"}} The water in the humidifier has run out or it was turned off manually {{ states('sensor.time_date') }}


```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
