### [BestCon BroadLink Fairy Light - a garland with dynamic scenes, we integrate into the Home Assistant](https://youtu.be/WW3_n8uLo7A)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml

best_con_light:

    script:
    
          broadlink_learn:
            alias: Learn Bestcon LED strip
            sequence:
              - service: remote.learn_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: 
                     - power_on
                     - power_off
                     - speed
                     - fade
                     - jump
                     - afade
                     - ajump
        
          best_con_light_on:
            alias: Включить Bestcon LED strip
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: power_on
                  
          best_con_light_off:
            alias: Выключить Bestcon LED strip
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: power_off
                  
          best_con_light_speed:
            alias: Bestcon LED speed
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: speed
                  
    input_select:               
               
      best_con_light_mode:
        name: mode
        options:
          - fade
          - jump
          - afade
          - ajump
          
    automation: 
               
    - id: Смена режимов
      alias: change_mode
      initial_state: true
      trigger:
        - platform: state
          entity_id: input_select.best_con_light_mode
      action:
        - choose:
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "fade"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: fade      
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "jump"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: jump          
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "afade"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: afade           
          - conditions:
              - condition: state
                entity_id: input_select.best_con_light_mode
                state: "ajump"               
            sequence:
              - service: remote.send_command
                target:
                  entity_id: remote.broadlink_ir_remote
                data:
                  device: led_strip
                  command: ajump 

```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
