### [Блог. Home Assistant - управление устройствами через ИК контроллер Broadlink, обратная связь](https://youtu.be/R2jMUh-5PCE)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Пакадж для управления телевизором через ИК контроллер Broadlink с обратной связью по энергомониторингу

```yaml
lr_tv_control:

    recorder:
      include:
        entities:
           - sensor.0xa4c1384452a34172_power
           
    homeassistant:
      customize:

        switch.0xa4c1384452a34172:
          friendly_name: Гостиная, телевизор
          device_class: plug  
          icon: mdi:power-socket-eu
        sensor.0xa4c1384452a34172_power:
          friendly_name: Гостиная, телевизор
          icon: mdi:flash
          unit_of_measurement: 'Вт'
        sensor.0xa4c1384452a34172_energy:
          friendly_name: Гостиная, телевизор
          icon_template: mdi:gauge
          unit_of_measurement: 'КВт*ч'
          
    template:
     
      - binary_sensor:

          - name: lr_tv_work
            state: >
              {{ states('sensor.0xa4c1384452a34172_power')|float > 50 
              }}
            icon: >
              {% if is_state("binary_sensor.lr_tv_work", "on") %}
              mdi:television
              {% else %}
              mdi:television-off
              {% endif %}
              
    automation:
    
      - id: Гостиная, управление ТВ
        alias: lr_tv_control
        initial_state: true
        trigger:
    ## 5 кнопка Aqara Opple
        - platform: state
          entity_id: sensor.0x04cf8cdf3c79360a_action
          to: 'button_5_single' 
    ## Виртуальная кнопка
        - platform: state
          entity_id: input_button.lr_tv_control
        condition:
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
            - choose:
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_tv_work
                    state: 'off'
                sequence:
                  - service: remote.send_command
                    data:
                      entity_id: remote.lr_ir_base_remote
                      command:
                        - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==
              - conditions:
                  - condition: state
                    entity_id: binary_sensor.lr_tv_work
                    state: 'on'
                sequence:
                  - service: remote.send_command
                    data:
                      entity_id: remote.lr_ir_base_remote
                      command:
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgCCACQRFiQWEBYbFSQWERURFhoWLRYkFhoWAAGcJBEWJBYQFhsVJBYRFhAWGxUtFiQWGhYAAZwkERYkFhEVGxYjFhEWEBYbFS0WJBYaFgABnCUQFiQWERUbFiMWERYQFhsWLBYkFhoWAAGdJBEVJBYRFhoWIxYRFhEVGxYtFiMWGhYADQUAAAAAAAA==
                        - b64:JgBoACQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAAFhJBEWERYtFS0WERYtFhEVLRYRFi0WLRYAAWEjEhURFi0WLRYQFi0WERYtFREWLRYtFgABYSQRFhAWLRYtFhEWLBYRFi0WERUtFi0WAA0F==

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
