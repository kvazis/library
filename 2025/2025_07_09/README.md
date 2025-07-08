### [Home Assistant, EcoFlow – LiFePO₄ Battery Training Automation]( )

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
river_2_max_train:

    template:
    
      - binary_sensor:

          - name: river_2_max_stage_2
            unique_id: river_2_max_stage_2
            state: >
                {{ is_state('input_boolean.river_2_max_stage_1', 'on') and
                   states('sensor.river_2_max_battery_level')|int == 100 }}
            delay_on: 
                minutes: 1
                   
          - name: river_2_max_stage_3
            unique_id: river_2_max_stage_3
            state: >
                {{ is_state('input_boolean.river_2_max_stage_2', 'on') and             
                  is_state('binary_sensor.lr_electricity', 'on') }}
                   
          - name: river_2_max_control
            unique_id: river_2_max_control
            state: >
                {{ is_state('input_boolean.river_2_max_stage_3', 'on') and
                  is_state('binary_sensor.lr_electricity', 'on') }}
                   
          - name: river_2_max_control_notification
            unique_id: river_2_max_control_notification
            state: >
                {{ is_state('input_boolean.river_2_max_stage_3', 'on') and
                  is_state('binary_sensor.lr_electricity', 'off') }}
                  
          - name: river_2_max_finish
            unique_id: river_2_max_finish
            state: >
                {{ is_state('input_boolean.river_2_max_stage_3', 'on') and
                   states('sensor.river_2_max_battery_level')|int == 60 }}
                   
    input_boolean:
    
      river_2_max_stage_1:
        name: Ecoflow River 2 Max, training stage 1
        icon: mdi:numeric-1
        
      river_2_max_stage_2:
        name: Ecoflow River 2 Max, training stage 2
        icon: mdi:numeric-2
        
      river_2_max_stage_3:
        name: Ecoflow River 2 Max, training stage 3
        icon: mdi:numeric-3

    automation:
    
      - alias: river_2_max_stage_1
        id: river_2_max_stage_1
        description: Ecoflow River 2 Max, training stage 1
        initial_state: true
        trigger:
    ## Manual training mode start
        - platform: state
          entity_id: input_boolean.river_2_max_stage_1
          to: 'on'
        action:
    ## Set charge level to 100%
        - action: number.set_value
          target:
            entity_id: number.river_2_max_max_charge_level
          data:
            value: "100"
    ## Set charging power to 300 Watts
        - action: number.set_value
          target:
            entity_id: number.river_2_max_ac_charging_power
          data:
            value: "300"
    ## Delay for data update
        - delay: 00:00:05
    ## Telegram notification
        - service: telegram_bot.send_message
          data_template:
            target:
                - !secret chat_id_group_tech
            message: | 
                 {{ "\u0031\uFE0F\u20E3" }} Stage 1 started - charging, at {{ now().strftime('%Y-%m-%d %H:%M') }}
                 {{ "\U0001F50B" }} Current charge level -  {{ states('sensor.river_2_max_battery_level') }}  %
                 {{ "\U0001F39A" }} Charge up to - {{ states('number.river_2_max_max_charge_level') }} %
                 {{ "\U0001F50C" }} Charging power - {{ states('number.river_2_max_ac_charging_power') }} Watts

      - alias: river_2_max_stage_2
        id: river_2_max_stage_2
        description: Ecoflow River 2 Max, training stage 2
        initial_state: true
        trigger:
    ## Transition to stage 2
        - platform: state
          entity_id: binary_sensor.river_2_max_stage_2
          to: 'on'
        action:        
    ## Set charge level to 60%
        - action: number.set_value
          target:
            entity_id: number.river_2_max_max_charge_level
          data:
            value: "60"        
    ## Disable stage 1 switch
        - action: input_boolean.turn_off
          data: {}
          target:
            entity_id: input_boolean.river_2_max_stage_1
    ## Enable stage 2 switch
        - action: input_boolean.turn_on
          data: {}
          target:
            entity_id: input_boolean.river_2_max_stage_2 
    ## Turn off load outlet     
        - action: switch.turn_off
          data: {}
          target:
            entity_id: switch.0xa4c138ee9e1e5451
    ## Delay for data update
        - delay: 00:00:05
    ## Telegram notification
        - service: telegram_bot.send_message
          data_template:
            target:
                - !secret chat_id_group_tech
            message: | 
                 {{ "\u0032\uFE0F\u20E3" }} Stage 2 started - discharge, at {{ now().strftime('%Y-%m-%d %H:%M') }}
                 {{ "\U0001F50B" }} Current charge level - {{ states('sensor.river_2_max_battery_level') }} %
                 {{ "\U0001F39A" }} Charge up to - {{ states('number.river_2_max_max_charge_level') }} % 
                 {{ "\U0001F50C" }} Load outlet - {{ states('switch.0xa4c138ee9e1e5451') }} 
        

      - alias: river_2_max_stage_3
        id: river_2_max_stage_3
        description: Ecoflow River 2 Max, training stage 3
        initial_state: true
        trigger:
    ## Transition to stage 3
        - platform: state
          entity_id: binary_sensor.river_2_max_stage_3
          to: 'on'
        action:               
    ## Disable stage 2 switch
        - action: input_boolean.turn_off
          data: {}
          target:
            entity_id: input_boolean.river_2_max_stage_2
    ## Enable stage 3 switch
        - action: input_boolean.turn_on
          data: {}
          target:
            entity_id: input_boolean.river_2_max_stage_3
    ## Turn on load outlet     
        - action: switch.turn_on
          data: {}
          target:
            entity_id: switch.0xa4c138ee9e1e5451        
    ## Delay for data update
        - delay: 00:00:15
    ## Telegram notification
        - service: telegram_bot.send_message
          data_template:
            target:
                - !secret chat_id_group_tech
            message: | 
                 {{ "\u0033\uFE0F\u20E3" }} Stage 3 started - charging, at {{ now().strftime('%Y-%m-%d %H:%M') }}
                 {{ "\U0001F50B" }} Current charge level - {{ states('sensor.river_2_max_battery_level') }} %
                 {{ "\U0001F39A" }} Charge up to - {{ states('number.river_2_max_max_charge_level') }} % 
                 {{ "\U0001F50C" }} Load outlet - {{ states('switch.0xa4c138ee9e1e5451') }}
                 {{ "\U0001F50C" }} Station outlet - {{ states('switch.river_2_max_ac_enabled') }}
        

      - alias: river_2_max_control
        id: river_2_max_control
        description: Ecoflow River 2 Max socket control
        initial_state: true
        trigger:
    # Check every minute
        - platform: time_pattern
          minutes: '/1'
        condition:
    # Stage 3 in progress, but socket is still off
        - condition: state
          entity_id: binary_sensor.river_2_max_control
          state: 'on'        
        action:             
    ## Turn on station outlet
        - action: switch.turn_on
          data: {}
          target:
            entity_id: switch.river_2_max_ac_enabled
        
      - alias: river_2_max_control_notification
        id: river_2_max_control_notification
        description: Ecoflow River 2 Max, notification when station outlet turns on
        initial_state: true
        trigger:
    # Stage 3 in progress, station outlet turned on
        - platform: state
          entity_id: binary_sensor.river_2_max_control_notification
          to: 'on' 
        action:         
    ## Telegram notification
        - service: telegram_bot.send_message
          data_template:
            target:
                - !secret chat_id_group_tech
            message: | 
                 {{ "\u0033\uFE0F\u20E3" }} Stage 3 in progress
                 {{ "\U0001F50B" }} Current charge level - {{ states('sensor.river_2_max_battery_level') }}  %
                 {{ "\U0001F39A" }} Charge up to - {{ states('number.river_2_max_max_charge_level') }} % 
                 {{ "\U0001F50C" }} Load outlet - {{ states('switch.0xa4c138ee9e1e5451') }}
                 {{ "\U0001F50C" }} Station outlet - {{ states('switch.river_2_max_ac_enabled') }}        
        

      - alias: river_2_max_finish
        id: river_2_max_finish
        description: Ecoflow River 2 Max, training finished 
        initial_state: true
        trigger:
    ## Transition to final stage
        - platform: state
          entity_id: binary_sensor.river_2_max_finish
          to: 'on'
        action:               
    ## Disable stage 3 switch
        - action: input_boolean.turn_off
          data: {}
          target:
            entity_id: input_boolean.river_2_max_stage_3
    ## Telegram notification
        - service: telegram_bot.send_message
          data_template:
            target:
                - !secret chat_id_group_tech
            message: | 
                 {{ "\u0033\uFE0F\u20E3" }} Training finished at {{ now().strftime('%Y-%m-%d %H:%M') }}, station can be disconnected
                 {{ "\U0001F50B" }} Current charge level - {{ states('sensor.river_2_max_battery_level') }} %

```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
