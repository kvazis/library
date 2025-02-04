### [Home Assistant. Lesson 5.5 Zigbee2mqtt - Managing Interlock, Power Outage, and Decoupled Modes](https://youtu.be/DTNJT2ApuGM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### Scripts from the Lesson   

```yaml

  set_interlock_on:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/DA 2ch relay/set"
          payload_template: '{"interlock": true}'
          
  set_interlock_off:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/DA 2ch relay/set"
          payload_template: '{"interlock": false}'
          
  set_outage_on:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/LR thermostat 2/set"
          payload_template: '{"power_outage_memory": true}'
          
  set_outage_off:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/LR thermostat 2/set"
          payload_template: '{"power_outage_memory": false}'
          
  set_decoupled_left:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/DD wd N 2ch/system/set"
          payload_template: '{ "operation_mode": {"button": "left", "state": "decoupled"}}'
          
  set_decoupled_right:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/DD wd N 2ch/system/set"
          payload_template: '{ "operation_mode": {"button": "right", "state": "decoupled"}}'
          
  set_control_left:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/DD wd N 2ch/system/set"
          payload_template: '{ "operation_mode": {"button": "left", "state": "control_left_relay"}}'
          
  set_control_right:  
    sequence:
      - service: mqtt.publish
        data_template:
          topic: "zigbee2mqtt/DD wd N 2ch/system/set"
          payload_template: '{ "operation_mode": {"button": "right", "state": "control_right_relay"}}'

```

### Binary Sensors    

```yaml

   - platform: ping
     name: router_ping
     unique_id: router_ping
     host: 192.168.0.1

   - platform: "mqtt"
     name: relay_interlock
     state_topic: "zigbee2mqtt/DA 2ch relay"
     availability_topic: "zigbee2mqtt/bridge/state"
     payload_on: true
     payload_off: false
     value_template: "{{ value_json.interlock }}"
    
   - platform: "mqtt"
     name: switch_outage
     state_topic: "zigbee2mqtt/LR thermostat 2"
     availability_topic: "zigbee2mqtt/bridge/state"
     payload_on: true
     payload_off: false
     value_template: "{{ value_json.power_outage_memory }}"

```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
