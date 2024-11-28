### [Home Assistant. Lesson 3.1 Lovelace, Maria DB, configuration, adding Yeelight lights](https://youtu.be/K6X3a6079WA)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### configuration.yaml:  

```yaml

homeassistant:
  name: My Smart Home
  latitude: !secret latitude_coord
  longitude: !secret longitude_coord
  elevation: 179
  unit_system: metric
  time_zone: Europe/Kiev

# Configure a default setup of Home Assistant (frontend, api, etc)
default_config:

# Uncomment this if you are using SSL/TLS, running in Docker container, etc.
# http:
#   base_url: example.duckdns.org:8123

lovelace:
  mode: yaml

# Text to speech
tts:
  - platform: google_translate

#Exporting configuration to external files

group: !include includes/groups.yaml
automation: !include includes/automations.yaml
script: !include includes/scripts.yaml
scene: !include includes/scenes.yaml
recorder: !include includes/recorder.yaml
yeelight: !include includes/yeelight.yaml

#Exporting configuration to external dir

sensor: !include_dir_merge_list includes/sensor

/config/includes/recorder.yaml

  db_url: mysql://hass:hass@core-mariadb/homeassistant?charset=utf8
  purge_keep_days: 3


```

#### ui-lovelace.yaml:  

```yaml
title: Home Assistant - сервер
views:

  - title: Главная
    icon: mdi:home-assistant
    
    cards:

      - type: vertical-stack
        cards:
        
        - type: markdown
          content: >
             **Текущее состояние**
             
        - type: entities
          show_header_toggle: false
          entities:
            - entity: sensor.time
              name: Текущее время
              icon: mdi:clock-outline
            - entity: sensor.date
              name: Дата
              icon: mdi:calendar-check-outline
              
        - type: entities
          show_header_toggle: false
          entities:
            - entity: sensor.maria_db_size
              name: Объем БД
              icon: mdi:database

      - type: vertical-stack
        cards:
        - type: markdown
          content: >
             **Графики** 

        - type: horizontal-stack
          cards:

           - type: gauge
             name: Загрузка CPU
             unit: '%'
             entity: sensor.processor_use
             severity:
                green: 0
                yellow: 60
                red: 85
             
           - type: gauge
             name: Загрузка ОЗУ
             unit: '%'
             entity: sensor.memory_use_percent
             severity:
                green: 0
                yellow: 60
                red: 85
                
        - type: horizontal-stack
          cards:

           - type: gauge
             name: Диск заполнен
             unit: '%'
             entity: sensor.disk_use_percent
             severity:
                green: 0
                yellow: 60
                red: 85    
                
           - type: gauge
             name: Свободное место
             unit: 'Гб'
             entity: sensor.disk_free
             severity:
                red: 2
                yellow: 6
                green: 8
                
        - type: history-graph
          entities:
           - entity: sensor.maria_db_size
             name: Maria DB
                
              
  - title: Погода
    icon: mdi:weather-partly-snowy-rainy
    
    cards:

        - type: weather-forecast
          entity: weather.home_assistant 
          
          
  - title: Освещение
    icon: mdi:lightbulb-group
    
          
    cards:
    
      - type: vertical-stack
        cards:
        - type: markdown
          content: >
             **Панель переключателей** 
             
        - type: entities
          show_header_toggle: false
          entities:          
            - entity: light.yeelight_650
              name: Люстра 650 основной свет
            - entity: light.yeelight_650_nightlight
              name: Люстра 650 ночник
            - entity: light.yeelight_650_ambilight
              name: Люстра 650 амбилайт           
            - entity: light.yeelight_450           
              name: Люстра 450 основной свет
            - entity: light.yeelight_450_nightlight 
              name: Люстра 450 ночник            
            - entity: light.yeelight_rgb_bulb            
              name: Лампочка  

      - type: vertical-stack
        cards:
        - type: markdown
          content: >
             **Светильники**    
              
        - type: horizontal-stack
          cards:
            - type: light
              entity: light.yeelight_650
              name: Люстра 650
            - type: light
              entity: light.yeelight_650_nightlight
              name: Ночник 650
            - type: light
              entity: light.yeelight_650_ambilight
              name: Ambilight 650

```

#### /config/includes/sensor/system.yaml:  

```yaml
  - platform: time_date
    display_options:
      - 'time'
      - 'date'
      - 'time_date'

  - platform: systemmonitor
    resources:
    - type: processor_use
    - type: disk_use_percent
      arg: /
    - type: memory_use_percent
    - type: last_boot
    - type: disk_free
      arg: /
      
  - platform: sql
    db_url: mysql://hass:hass@core-mariadb/homeassistant?charset=utf8
    queries:
      - name: Maria DB size
        query: 'SELECT table_schema "database", Round(Sum(data_length + index_length) / 1048576, 2) "value" FROM information_schema.tables WHERE table_schema="homeassistant" GROUP BY table_schema;'
        column: 'value'
        unit_of_measurement: MB 

```

#### Config Maria DB   

```yaml
databases:
  - homeassistant
logins:
  - username: hass
    host: '%'
    password: hass
rights:
  - username: hass
    host: '%'
    database: homeassistant
    grant: ALL PRIVILEGES ON

```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
