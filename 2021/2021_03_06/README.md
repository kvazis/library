### [Home Assistant. Lesson 12.1 Interface - Lovelace, auto-entities card](https://youtu.be/cxDDZkOl-EM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson in text form:

\:white\_check\_mark: **Auto Entities**

\:ballot\_box\_with\_check: Manual `lovelace` mode and custom `auto-entities` card in resources - `configuration.yaml`

```yaml
lovelace:
  mode: yaml
  resources:
   - url: /hacsfiles/lovelace-auto-entities/auto-entities.js
     type: module  
```

\:ballot\_box\_with\_check: Page from the lesson with cards:

```yaml
  - title: Control Panel
    icon: mdi:keyboard

    cards:

    - type: vertical-stack
      cards: 

            - type: markdown
              content: >
                  **All Lights**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: light

            - type: markdown
              content: >
                  **Active Lights**
                      
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: light
                   state: 'on'
                   options:
                      secondary_info: last-changed


            - type: markdown
              content: >
                  **Active Switches**
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: switch
                   state: 'on'
                   options:
                      secondary_info: last-changed

    - type: vertical-stack
      cards: 

            - type: markdown
              content: >
                  **Motion**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: binary_sensor.*occupancy
                   state: 'on'
                   options:
                      secondary_info: last-changed

            - type: markdown
              content: >
                  **Open Windows and Doors**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: glance
                show_state: false
              filter:
                include:
                 - entity_id: binary_sensor.*contact
                   state: 'on'

            - type: markdown
              content: >
                  **Power Consumption Over 10W**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*_power
                exclude:
                 - state: '< 10.0'

            - type: markdown
              content: >
                  **Humidity Below 30%**
                      
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*_humidity
                exclude:
                 - state: '> 30.0'

            - type: markdown
              content: >
                  **Temperature Below 20°C**
                      
            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*_temperature
                exclude:
                 - state: '> 20.0'

    - type: vertical-stack
      cards: 

            - type: markdown
              content: >
                  **Batteries**

            - type: custom:auto-entities
              show_empty: true
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: sensor.*battery*
                exclude:
                 - state: '> 70.0'
                 - state: 'unknown'

            - type: markdown
              content: >
                  **Emergency Sensors**
      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - entity_id: binary_sensor.*water_leak
                   state: 'on'
                   options:
                      secondary_info: last-changed
                 - entity_id: binary_sensor.*smoke
                   state: 'on'
                   options:
                      secondary_info: last-changed

            - type: markdown
              content: >
                  **Unavailable Lights**
                      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: light
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed

            - type: markdown
              content: >
                  **Unavailable Switches**
                      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: switch
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed
                      
            - type: markdown
              content: >
                  **Unavailable Sensors**
                      
            - type: custom:auto-entities
              show_empty: false
              card:
                type: entities
                show_header_toggle: false
              filter:
                include:
                 - domain: sensor
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed
                 - domain: binary_sensor
                   state: 'unavailable'
                   options:
                      secondary_info: last-changed
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
