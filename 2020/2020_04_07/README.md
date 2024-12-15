### [Home Assistant. Lesson 8.2: Creating Binary Sensors, Templates, and Time](https://youtu.be/ZNrKzmEiW3g)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Examples shown in the lesson, updated as of 15.12.2024    
#### Templates    

```yaml

    template:

      - binary_sensor:

          - name: super_motion
            unique_id: super_motion
            state: >
              {{ is_state('binary_sensor.ln_moving_occupancy', 'on')
                 or is_state('binary_sensor.cr_moving_occupancy', 'on')
                 or is_state('binary_sensor.lr_balcony_moving_occupancy', 'on')  }} 
            device_class: occupancy
            
          - name: super_windows
            unique_id: super_windows
            state: >
              {{ is_state('binary_sensor.dd_window_contact', 'off')
                 and is_state('binary_sensor.da_window_contact', 'off')
                 and is_state('binary_sensor.lr_window_contact', 'off')  }}  

          - name: super_windows
            unique_id: super_windows_day
            state: >
              {{ is_state('binary_sensor.dd_window_contact', 'off')
                 and is_state('binary_sensor.da_window_contact', 'off')
                 and is_state('binary_sensor.tod_day', 'on')
                 and states('sensor.kn_climate_humidity')|float < 55
                 and is_state('binary_sensor.lr_window_contact', 'off')  }} 

          - name: auto_light
            unique_id: auto_light
            state: >
              {{ is_state('light.philips_bedside', 'on')
                 and is_state('binary_sensor.cr_moving_occupancy', 'off')  }}    

          - name: auto_light
            unique_id: auto_light
              {{ is_state('switch.mi_3usb_strip', 'on')
                 and states('sensor.mi_3usb_strip_load')|float < 10  }}

```

#### Times of the Day

```yaml
    binary_sensor:
    
      - platform: tod
        name: day
        unique_id: day
        after: '09:00'
        before: '21:00'
        
      - platform: tod
        name: tod_sun_day
        unique_id: tod_sun_day
        after: sunrise
        before: sunset
        
```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
