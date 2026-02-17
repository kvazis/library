### [LiFePO4 12V 100Ah Humsienk Battery, Review and Test, Increasing the Capacity of Ecoflow Delta 2](https://youtu.be/BXCFy8Fy9dg)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml

delta_2_add:


    recorder:
      include:
        entities:
        
           - sensor.0xa4c138201dcb67f6_power
           
           
    homeassistant:
      customize:

        switch.0xa4c138201dcb67f6:
          friendly_name: Humsienk живлення зарядки
          icon: mdi:car-battery
        sensor.0xa4c138201dcb67f6_power:
          friendly_name: Humsienk зарядка потужність
          unit_of_measurement: W
          device_class: power
        sensor.0xa4c138201dcb67f6_energy:
          friendly_name: Humsienk зарядка енергія
          icon: mdi:chart-line
          
          
    template:
    
      - binary_sensor:

########## Сенсор запуску зарядки через 2 хвилини після відновлення живлення
                
          - name: humsienk_charge_start
            unique_id: humsienk_charge_start
            state: >
                {{ is_state('binary_sensor.electricity', 'off')}}
            delay_on: 
                minutes: 2
      
########## Сенсор індикації завершення зарядки
 
          - name: humsienk_charge_done
            unique_id: humsienk_charge_done
            state: >
                {{ states('sensor.0xa4c138201dcb67f6_power')|float < 20 and
                   is_state('switch.0xa4c138201dcb67f6', 'on')}}
            delay_on: 
                minutes: 1


    automation:           


      - alias: humsienk_charge_start
        id: humsienk_charge_start
        description: Запуск зарядки аккумулятора Humsienk
        initial_state: true
        trigger:
    # Спрацювання сенсора запуску зарядки
        - platform: state
          entity_id: binary_sensor.humsienk_charge_start
          from: 'off'
          to: 'on'
        condition:
    # Режим роботи сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
    # Вмикання реле живлення зарядки
        - action: switch.turn_on
          data: {}
          target:
             entity_id: switch.0xa4c138201dcb67f6

      - alias: humsienk_charge_done
        id: humsienk_charge_done
        description: Вимкнення зарядки аккумулятора Humsienk
        initial_state: true
        trigger:
    # Спрацювання сенсора запуску зарядки
        - platform: state
          entity_id: binary_sensor.humsienk_charge_done
          from: 'off'
          to: 'on'
        condition:
    # Режим роботи сервера
        - condition: state
          entity_id: switch.control_mode
          state: 'on'
        action:
    # Вимикання реле живлення зарядки
        - action: switch.turn_off
          data: {}
          target:
             entity_id: switch.0xa4c138201dcb67f6
        
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
