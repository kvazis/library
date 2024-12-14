### [Home Assistant. ARCHIVE. Lesson 9.2 ADD-ON - HACS](https://youtu.be/ny0v8zqrFl4)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Resources:    

:ballot_box_with_check: [HACS Project](https://github.com/hacs/integration)     
:ballot_box_with_check: [Personal access tokens](https://github.com/settings/tokens)     
:ballot_box_with_check: [Personal access tokens](https://github.com/settings/tokens)     


#### Create a folder in config - `custom_components`    


#### Add to `/config/configuration.yaml`

```yaml

hacs:
  token: !secret HACS_github
  appdaemon: true
  python_script: true
  theme: true

```

#### Add to `/config/secrets.yaml`    

```yaml

HACS_github: **********token******************

```

#### Theme folder    

```yaml

frontend:
  themes: !include_dir_merge_named themes

```

#### Power Sensor for Raspberry `/config/includes/sensor/system.yaml`    

```yaml

  - platform: rpi_power
    text_state: true

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
