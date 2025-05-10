### [Zigbee термостат для теплого пола MOES - возможности, настройка, интеграция в Home Assistant](https://youtu.be/0akBv5iuZDs)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson  :

```yaml
      - platform: template
        switches:              
          thermostat_in:
            friendly_name: "Термостат - Сенсор IN"
            value_template: "{{ is_state_attr('climate.0x5c0272fffeebcc3', 'sensor', 'IN') }}"
            turn_on:
              - service: mqtt.publish
                data_template:
                  topic: "zigbee2mqtt/0x5c0272fffeebcc3/set"
                  payload_template: '{"sensor": "IN"}'
            turn_off:
              - service: mqtt.publish
                data_template:
                  topic: "zigbee2mqtt/0x5c0272fffeebcc3/set"
                  payload_template: '{"sensor": "AL"}'
                  
          thermostat_out:
            friendly_name: "Термостат - Сенсор OUT"
            value_template: "{{ is_state_attr('climate.0x5c0272fffeebcc3', 'sensor', 'OU') }}"
            turn_on:
              - service: mqtt.publish
                data_template:
                  topic: "zigbee2mqtt/0x5c0272fffeebcc3/set"
                  payload_template: '{"sensor": "OU"}'
            turn_off:
              - service: mqtt.publish
                data_template:
                  topic: "zigbee2mqtt/0x5c0272fffeebcc3/set"
                  payload_template: '{"sensor": "AL"}'

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
