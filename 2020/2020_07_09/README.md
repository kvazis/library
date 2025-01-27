### [Qingping CGD1 - Bluetooth Clock, Alarm, Temperature, and Humidity Sensor for MiHome](https://youtu.be/HmNoypHRjw8)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### List of Available Bluetooth Adapters  
```bash
sudo hciconfig
```  

### Example of Creating a Sensor for 2 Bluetooth Interfaces with Encryption Key  
```yaml
  - platform: mitemp_bt
    hci_interface:
      - 0
      - 1
    encryptors:
      '58:XX:XX:XX:XX:5E': '5ccf***bc57***f2fdc***9cc***103c'
```  

### Scanning BLE Devices  
```bash
sudo hcitool lescan
```  
Stop with `Ctrl+C`.  

### Restarting Bluetooth  
```bash
sudo systemctl restart bluetooth
```  

### Editing the Crontab File  
```bash
sudo crontab -e
```  
Choose `1 - nano`.  

#### Setting a Reboot Every Hour  
```
0 */1 * * * systemctl restart bluetooth
```  

#### Exit and Save  
`Ctrl-X`, then `Y`.  

### Viewing the Crontab File  
```bash
sudo crontab -l
```  

### Example with Additional Parameters  
```yaml
  - platform: mitemp_bt
    rounding: True
    decimals: 2
    period: 60
    log_spikes: False
    use_median: False
    active_scan: True
    hci_interface:
      - 0
      - 1
    encryptors:
      '58:XX:XX:XX:XX:5E': '5ccf***bc57***f2fdc***9cc***103c'
    whitelist: True
```  

### ESPHome Websites  
- Stable: [https://esphome.io/](https://esphome.io/)  
- Dev: [https://next.esphome.io/](https://next.esphome.io/)  

### Device Description in ESPHome  
```yaml
sensor:
  - platform: xiaomi_cgd1
    mac_address: 58:XX:XX:XX:XX:5E
    bindkey: "5ccf***bc57***f2fdc***9cc***103c"
    temperature:
      name: cgd1_temperature
    humidity:
      name: cgd1_humidity
    battery_level:
      name: cgd1_battery
```  

### Python  
- Official Website: [https://www.python.org/downloads/](https://www.python.org/downloads/)  

#### Installation Path Example (Scripts Folder)  
```
C:\Users\USERNAME\AppData\Local\Programs\Python\Python38\Scripts
```  

#### Command Prompt  
1. Press `Win+R`  
2. Enter `cmd`  
3. Use the `cd` command to navigate to the folder (right-click to paste the path):  
   ```bash
   cd <paste path here>
   ```  

### Installing ESPHome  
```bash
pip install --pre -U https://github.com/esphome/esphome/archive/dev.zip
```  

### ESPHome Components Directory  
```
C:\Users\USERNAME\AppData\Local\Programs\Python\Python38\Lib\site-packages\esphome\components
```  

#### Modifying `sensor.py` or `binary_sensor.py`  
Look for the file in the device folder and replace:  
```python
cg.add_library("mbedtls", "cdf462088d")
```  
with:  
```python
cg.add_library("mbedtls", None)
```  

### Compiling Firmware  
```bash
esphome filename.yaml compile
```  

### Uploading Firmware  
```bash
esphome filename.yaml upload
```  

### Viewing Logs  
```bash
esphome filename.yaml logs
```  

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
