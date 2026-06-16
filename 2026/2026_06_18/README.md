### [Creating Our Own Zigbee Devices with ESPHome - Three-Phase Electricity Sensor]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Firmware:  

```yaml
esphome:
  name: xiao-c6-3phase
  friendly_name: XIAO C6 3 Phase Sensor

esp32:
  variant: esp32c6
  flash_size: 4MB
  framework:
    type: esp-idf

logger:
  level: INFO

zigbee:
  id: zb
  model: "C6-RT1"
  router: true
  power_source: MAINS_THREE_PHASE

binary_sensor:
  - platform: gpio
    name: "Phase L1"
    device_class: power
    report: force
    pin:
      number: GPIO1
      mode:
        input: true
        pullup: true
      inverted: true
    filters:
      - delayed_on: 300ms
      - delayed_off: 1000ms

  - platform: gpio
    name: "Phase L2"
    device_class: power
    report: force
    pin:
      number: GPIO2
      mode:
        input: true
        pullup: true
      inverted: true
    filters:
      - delayed_on: 300ms
      - delayed_off: 1000ms

  - platform: gpio
    name: "Phase L3"
    device_class: power
    report: force
    pin:
      number: GPIO21
      mode:
        input: true
        pullup: true
      inverted: true
    filters:
      - delayed_on: 300ms
      - delayed_off: 1000ms
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
