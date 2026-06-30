### [CESPHome Bluetooth Proxy: what it is for and how to make it]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Firmware:  

```yaml
# Board: Seeed Studio XIAO ESP32C6 (Seeed Studio)
# Definition: definitions/boards/seeed_xiao_esp32c6/manifest.yaml

esphome:
  name: bluetooth-proxy
  friendly_name: Bluetooth Proxy

esp32:
  variant: esp32c6
  flash_size: 4MB
  framework:
    type: esp-idf

logger:

api:
  encryption:
    key: "*********************************"

ota:
  - platform: esphome

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:
    ssid: Bluetooth Proxy Fallback Hotspot
    password: "*********"
  power_save_mode: NONE
  fast_connect: true
  
captive_portal:

esp32_ble:
  max_connections: 3
  connection_timeout: 20s

esp32_ble_tracker:
  scan_parameters:
    active: true
    interval: 320ms
    window: 90ms
    continuous: true

bluetooth_proxy:
  active: true
  connection_slots: 3

button:
  - platform: restart
    name: "Restart"

sensor:
  - platform: wifi_signal
    name: "Wi-Fi RSSI"
    update_interval: 30s

  - platform: uptime
    name: "Uptime"
    update_interval: 60s

```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
