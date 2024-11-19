### [Home Assistant - Integration of Xiaomi Universal IR Controller](https://youtu.be/Y1rg0tXAqbI)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Add to system    

```yaml

  - platform: xiaomi_miio
    name: mi_remote
    host: 192.168.0.135
    token: db*****************6356
    slot: 3
    timeout: 30
    hidden: false

```

#### Scripts from video    

```yaml

  learn_ir_command:
    alias: Обучение Xiaomi IR Base
    sequence:
      - service: xiaomi_miio.remote_learn_command
        data:
          entity_id: remote.mi_remote


  send_ir_command:
    alias: Отправка команд с пульта
    sequence:
      - service: remote.send_command
        entity_id: remote.mi_remote
        data:
          command:
          - raw:Z6VHADsCAACTBgAAuwgAAJERAAATIwAATJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAABAQEBAQEBAQABAQABAQAAAAAAAQAAAQEBBQJAA=
          - raw:Z6VHADsCAACTBgAAuwgAAJERAAATIwAATJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAABAQEBAQEBAQABAQABAQAAAAAAAQAAAQEBBQJAA=
          - raw:Z6WRAN0AAAAfAgAAewIAACUEAAB5BQAALioAAMAMAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQlITEkJCEkISQhJCQmIA
          - raw:Z6W/ABwCAAB9AgAAQgMAAE0EAAB6BQAAjjMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMVEDMQEhMQEBQQEBMQE=

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
