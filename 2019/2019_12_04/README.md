### [Перепрошивка ip камер Xiaomi - Xiaofang 1S, Dafang, интеграция в Home Assistant](https://youtu.be/OqUI1GHc4As)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Scripts from video^    

```yaml

  photo_xiaofang:
    alias: Фотография Xiaofang и отправка в телеграмм
    sequence:
    - service: notify.telegram
      data:
        message: "Время события  {{ states('sensor.time_date') }}" 
    - service: camera.snapshot
      data:
           entity_id: camera.xiaofang
           filename: "/config/www/cam_captures/xiaofang.jpg"
    - delay: 00:00:05
    - service: notify.telegram
      data:
           title: Photo
           message: "Фотография" 
           data:
               photo:
                 - file: /config/www/cam_captures/xiaofang.jpg
                   caption: "Фото сделано в - {{ states('sensor.time_date') }}"

  video_xiaofang:
    alias: Видео Xiaofang и отправка в телеграмм
    sequence:
    - service: notify.telegram
      data:
        message: "Время события  {{ states('sensor.time_date') }}" 
    - service: camera.record
      data_template:
        entity_id: camera.xiaofang
        filename: "/config/www/cam_captures/xiaofang.mp4"
        duration: 15
    - delay: 00:00:35
    - service: notify.telegram
      data:
           title: Video
           message: "Видео" 
           data:
               video:
                 - file: /config/www/cam_captures/xiaofang.mp4
                   caption: "Видео сделано в - {{ states('sensor.time_date') }}"

## Сервис telegram_bot 

  photo2_xiaofang:
    alias: Фотография Xiaofang и отправка в телеграмм ботом
    sequence:
    - service: notify.telegram
      data:
        message: "Время события  {{ states('sensor.time_date') }}" 
    - service: camera.snapshot
      data:
           entity_id: camera.xiaofang
           filename: "/config/www/cam_captures/xiaofang.jpg"
    - delay: 00:00:05
    - service: telegram_bot.send_photo
      data_template:
        target:
         - !secret chat_id_alex
        file: "/config/www/cam_captures/xiaofang.jpg"
        caption: "Фото сделано в - {{ states('sensor.time_date') }}"

  video2_xiaofang:
    alias: Видео Xiaofang и отправка телеграмм ботом
    sequence:
    - service: notify.telegram
      data:
        message: "Время события  {{ states('sensor.time_date') }}" 
    - service: camera.record
      data_template:
        entity_id: camera.xiaofang
        filename: "/config/www/cam_captures/xiaofang.mp4"
        duration: 15
    - delay: 00:00:35
    - service: telegram_bot.send_video
      data_template:
        target:
         - !secret chat_id_alex
        file: "/config/www/cam_captures/xiaofang.mp4"
        caption: "Видео сделано в - {{ states('sensor.time_date') }}"

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
