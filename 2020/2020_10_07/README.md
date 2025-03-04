#### [BlitzWolf BW-IS5 - Zigbee Water Leak Sensor - Review, Integration into Home Assistant](https://youtu.be/D37oHuvO9J4)    

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Package from lesson:  

```yaml
## Water Leak Detection
- alias: water_leak_on
  initial_state: true
  trigger:       
   platform: state
   entity_id: binary_sensor.0xec1bbdfffe8f1e42_water_leak
   to: 'on'
  action:
  - service: telegram_bot.send_message
    data_template:
      target:
          - !secret chat_id_group
      message: 'Water leak detected! Sensor near the washing machine. Event time - {{ states.sensor.time_date.state }}'
  - service: light.turn_on
    entity_id: 
      - light.yeelight_rgb
      - light.yeelight_bedside2
    data_template:
      brightness_pct: 100
      rgb_color: [255, 0, 0]
      
## Leak Resolved
- alias: water_leak_off
  initial_state: true
  trigger:       
   platform: state
   entity_id: binary_sensor.0xec1bbdfffe8f1e42_water_leak
   from: 'on'
   to: 'off'
  action:
  - service: telegram_bot.send_message
    data_template:
      target:
          - !secret chat_id_group
      message: 'All is fine, the leak has been resolved. Sensor near the washing machine. Event time - {{ states.sensor.time_date.state }}'
  - service: light.turn_on
    entity_id: 
      - light.yeelight_rgb
      - light.yeelight_bedside2
    data_template:
      brightness_pct: 100
      rgb_color: [0, 255, 0]
  - delay: 00:00:10
  - service: light.turn_off
    entity_id: 
      - light.yeelight_rgb
      - light.yeelight_bedside2
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
