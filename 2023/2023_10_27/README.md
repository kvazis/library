### [Home Assistant - Backup, Google Drive Backup - October 2023](https://youtu.be/7_86CMuToxI)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Resources:    

:ballot_box_with_check: Google Drive Backup - `https://github.com/sabeechen/hassio-google-drive-backup`    

:ballot_box_with_check: Google Drive - `https://drive.google.com`    

#### Package `system_sensors.yaml`


```yaml

system_sensors:


    homeassistant:

      customize:
        sensor.last_google_backup:
          friendly_name: Last backup -
        sensor.backups_in_google_drive:
          friendly_name: Backups in Google Drive
        sensor.backups_in_home_assistant:
          friendly_name: Backups in Local Server
        sensor.size_in_google_drive:
          friendly_name: Size in Google Drive
        sensor.size_in_home_assistant:
          friendly_name: Size in Local Server

    recorder:
      db_url: !secret db_link
      purge_keep_days: 7
      auto_purge: true

    sensor:    
    - platform: systemmonitor
      resources:
      - type: processor_use
      - type: disk_use_percent
        arg: /
      - type: memory_use_percent
      - type: last_boot
      - type: disk_free
        arg: /
      - type: processor_temperature
      
    template:
     
      - sensor:

          - name: last_google_backup
            unique_id: last_google_backup
            state: >
                {% if state_attr("sensor.backup_state","last_backup") %}
                {{as_timestamp(state_attr("sensor.backup_state","last_backup"))|timestamp_custom("%d.%m.%Y %H:%M")}}
                {% else %} 
                Getting data ...
                {% endif %} 
            icon: mdi:calendar-check-outline

          - name: backups_in_google_drive
            unique_id: backups_in_google_drive
            state: "{{ state_attr('sensor.backup_state', 'backups_in_google_drive') }}"
            unit_of_measurement: pcs
            icon: mdi:folder-google-drive    

          - name: backups_in_home_assistant
            unique_id: backups_in_home_assistant
            state: "{{ state_attr('sensor.backup_state', 'backups_in_home_assistant') }}"
            unit_of_measurement: pcs
            icon: mdi:home-assistant      

          - name: size_in_google_drive
            unique_id: size_in_google_drive
            state: "{{ state_attr('sensor.backup_state', 'size_in_google_drive') }}"
            icon: mdi:numeric
      
          - name: size_in_home_assistant
            unique_id: size_in_home_assistant
            state: "{{ state_attr('sensor.backup_state', 'size_in_home_assistant') }}"
            icon: mdi:numeric

```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
