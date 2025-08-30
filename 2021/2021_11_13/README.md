### [Home Assistant. Lesson 9.5 - Tuya and Local Tuya Integrations, Update 11.2021](https://youtu.be/RjlwAIPTk-4)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Text version of the instruction for Tuya and Local Tuya integrations

:ballot_box_with_check: `Cloud — Development — My Cloud Projects`
:ballot_box_with_check: `Create Cloud Project`
:ballot_box_with_check: Add `Device Status Notification`
:ballot_box_with_check: App connection - `Device — Link Tuya App Account — Add App Account`
:ballot_box_with_check: Settings — Integrations — Add integration — Tuya
:ballot_box_with_check: From the Authorization page — take `Access ID/Client ID`, `Access Secret/Client Secret`

:ballot_box_with_check: HACS

```yaml
sudo bash
wget -O - https://get.hacs.xyz | bash -
```

:ballot_box_with_check: Installing tuya-cli

```yaml
sudo apt-get install npm
sudo npm i @tuyapi/cli -g
```

:ballot_box_with_check: Getting keys

```yaml
tuya-cli wizard
```

:ballot_box_with_check: Manual key retrieval - `API Explorer — Smart Home Management System — Device Management — Get device details`

:ballot_box_with_check: Example of changing datapoint

```yaml
  - service: localtuya.set_dp
    data:
      device_id: Device ID
      dp: 21
      value: "scene"
```



____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
