### [TERNCY SD01 - logical zigbee dimmer-button, integration into Home Assistant](https://youtu.be/JJgzS9UEadM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### An example shown in the tutorial    

```yaml

light_dimmer:

    input_select:

      temp_bedside:
        name: Color temperature
        options:
          - Warm
          - Neutral
          - Cool
        initial: Neutral
        icon: mdi:temperature-kelvin    
    
    automation:
    
        - alias: light
          id: 'Turn on and off'
          initial_state: true
          trigger:
            - platform: state
              entity_id: sensor.0x000d6f00133b856a_click
              to: 'single'
          action:
            - service: script.turn_on
              data_template:
                entity_id: >-
                  {%- if states('light.yeelight_05_bedside2') == 'off' -%}
                  script.light_on
                  {%- else -%}
                  script.light_off
                  {%- endif -%} 
                  
        - alias: light_temp_select
          id: 'Adjusting color temperature with a button'
          initial_state: true
          trigger:
            - platform: state
              entity_id: sensor.0x000d6f00133b856a_click
              to: 'double'
          condition:
            - condition: state
              entity_id: light.yeelight_05_bedside2
              state: 'on'
          action:
            - service: input_select.select_next
              entity_id: input_select.temp_bedside

        - alias: light_temp
          id: 'Adjusting color temperature'
          initial_state: true
          trigger:
            - platform: state
              entity_id: input_select.temp_bedside
          condition:
            - condition: state
              entity_id: light.yeelight_05_bedside2
              state: 'on'
          action:
            - service: light.turn_on
              entity_id: light.yeelight_05_bedside2
              data_template:
                kelvin: >
                  {% if states('input_select.temp_bedside') == 'Warm' %}
                  3000
                  {% elif states('input_select.temp_bedside') == 'Neutral' %}
                  4000
                  {% elif states('input_select.temp_bedside') == 'Cool' %}
                  5000
                  {% endif %}
                  
        - alias: light_brightness
          id: 'Smooth brightness adjustment'
          initial_state: true
          trigger:
            - platform: state
              entity_id: sensor.0x000d6f00133b856a_number
          condition:
            - condition: state
              entity_id: light.yeelight_05_bedside2
              state: 'on'
          action:
            - service: light.turn_on
              entity_id: light.yeelight_05_bedside2
              data_template:
                brightness_step_pct: >
                  {% set plus = (states('sensor.0x000d6f00133b856a_number') | int) %}
                  {% set minus = (states('sensor.0x000d6f00133b856a_number') | int) * -1 %}
                  {% if states('sensor.0x000d6f00133b856a_direction') == 'clockwise' %}
                  {{plus}}
                  {% else %}
                  {{minus}}
                  {% endif %}
                  
    script:
          light_on:
            alias: Turning on the lamp
            sequence:
              - service: light.turn_on
                entity_id: light.yeelight_05_bedside2
                data_template:
                  brightness_pct: 90
                  kelvin: >
                    {% if states('input_select.temp_bedside') == 'Warm' %}
                    3000
                    {% elif states('input_select.temp_bedside') == 'Neutral' %}
                    4000
                    {% elif states('input_select.temp_bedside') == 'Cool' %}
                    5000
                    {% endif %}
                  
          light_off:
            alias: Turning off the lamp
            sequence:
              - service: light.turn_off
                entity_id: light.yeelight_05_bedside2


```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
