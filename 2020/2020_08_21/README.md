### [Home Assistant. Lesson 7.2 - Removing and Reinstalling Hassio Containers](https://youtu.be/AFIlJfiM5Ak)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Commands from the lesson:  

#### Stopping Services
```bash
sudo systemctl stop hassio-supervisor.service
sudo systemctl stop hassio-apparmor.service
```

#### Disabling Services
```bash
sudo systemctl disable hassio-supervisor.service
sudo systemctl disable hassio-apparmor.service
```

#### Removing Services
```bash
sudo rm -rf /etc/systemd/system/hassio-supervisor.service
sudo rm -rf /etc/systemd/system/hassio-apparmor.service
```

#### Removing All Files and Folders
```bash
sudo rm -rf /usr/sbin/hassio-supervisor
sudo rm -rf /usr/sbin/hassio-apparmor
sudo rm -rf /usr/share/hassio/
```

#### List of Running Containers
```bash
docker ps --format "table {{.ID}}\t{{.Image}}\t{{.Status}}\t{{.Names}}"
```

#### Switching to Root Mode
```bash
sudo su
```

---

### Update 2021 - 

#### Installing Hass.io (Key List Available Here - https://github.com/home-assistant/supervised-installer)

##### Script
```bash
curl -Lo installer.sh https://raw.githubusercontent.com/home-assistant/supervised-installer/master/installer.sh
```

##### For Raspberry Pi 3
```bash
bash installer.sh --machine raspberrypi3
```

##### For Raspberry Pi 4
```bash
bash installer.sh --machine raspberrypi4
```

#### Home Assistant Web Interface
```text
IP Address:8123
```

#### Path to Backup Folder
```text
\\SERVER_IP_ADDRESS\backup
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
