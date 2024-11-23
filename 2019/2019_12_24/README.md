### [Broadlink RM mini3 - universal IR controller, integration into Home Assistant](https://youtu.be/LmrK3qOuHmw)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Learn script    

```yaml
  learn_broadlink:
    sequence:
      - service: remote.learn_command
        data:
          entity_id: remote.rm_mini
          device: television
          command:
            - power
            - volume up
            - volume down
            
  learn_broadlink_1:
    sequence:
      - service: remote.learn_command
        data:
          entity_id: remote.rm_mini
          device: air conditioner
          command:
            - heat 25
            - off

```

#### Send script    

```yaml
  tv_power_broadlink:
    sequence:
      - service: remote.send_command
        data:
          entity_id: remote.rm_mini
          device: television
          command: power

  tv_vup_broadlink:
    sequence:
      - service: remote.send_command
        data:
          entity_id: remote.rm_mini
          device: television
          command: volume up
          num_repeats: 3

  tv_vdown_broadlink:
    sequence:
      - service: remote.send_command
        data:
          entity_id: remote.rm_mini
          device: television
          command: volume down
          num_repeats: 3
          delay_secs: 1
          
  tv_menu_broadlink:
    sequence:
      - service: remote.send_command
        data:
          entity_id: remote.rm_mini
          device: television
          command: 
            - menu
            - left
            - left
            - ok 
          delay_secs: 1

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
