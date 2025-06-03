### [Zigbee electricity meter for 100 A with DIN rail mounting](https://youtu.be/r6KafwBbJr0)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson in text form:


```yaml

# Script to reset the counter

counter_reset:
  sequence:
    - service: mqtt.publish
      data_template:
        topic: "z2m_cc2652/0x00124b001ed16fac/set/l2"
        payload: '0'

# Sensors for synchronization with the meter

- platform: template
  sensors:
    power_consumption:
      friendly_name: "Power Consumption"
      unit_of_measurement: 'Wh'
      value_template: "{{ 451312 + (states('sensor.0x00124b001ed16fac_energy_l2') | float ) }}"
      icon_template: mdi:gauge

- platform: template
  sensors:
    power_consumption:
      friendly_name: "Power Consumption"
      unit_of_measurement: 'kWh'
      value_template: "{{ (451312 + (states('sensor.0x00124b001ed16fac_energy_l2') | float )) / 1000 }}"
      icon_template: mdi:gauge


```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
