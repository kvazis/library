### [Home Assistant - Zigbee SLS Gateway. Understanding MQTT, Creating Entities](https://youtu.be/EHuJT9NmCt8)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### Removing a Device - Router  

To remove a router, send the address in the following format to the topic:  
**`zigbee2mqtt/bridge/config/remove`**  

Example address format:  
```txt
0x00158D0001D35BC0
```

### Removing an End Device    

Physically remove the device from the following files:  
- **`\share\zigbee2mqtt\devices.yaml`**  
- **`\share\zigbee2mqtt\database.db`**  


### Examples of Device Topics    

```yaml

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Switch",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Light",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

"device":{"identifiers":["ZigbeeSLS_0x00000abcd0000abcd"],
"name":"Device Name",
"sw_version":"ZigbeeSLS",
"model":"Zigbee Sensor",
"manufacturer":"Xiaomi"},

```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
