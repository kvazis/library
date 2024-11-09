### [Wireless IP camera Reolink E1 Zoom, review, Home Assistant, sending photos and videos to Telegram](https://youtu.be/hdkIjeu36M8)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Interface card:  

```yaml

    - type: picture-entity
      entity: camera.reolink_e1_zoom_profile000_mainstream
      camera_view: live 
      show_state: false
      show_name: false

```

#### Take photo script:  

```yaml

  photo_reolink:
    alias: Photo Reolink E1 zoom
    sequence:
       - service: camera.snapshot
         data:
              entity_id: camera.reolink_e1_zoom_profile000_mainstream
              filename: "/config/www/cam_captures/reolink.jpg"
```

#### Take video script:  

```yaml

  video_reolink:
    alias: Record Reolink E1 zoom
    sequence:
    - service: camera.record
      data_template:
        entity_id: camera.reolink_e1_zoom_profile000_mainstream
        filename: "/config/www/cam_captures/reolink.mp4"
        duration: 10
```

#### Take photo and send to Telegram script:          
        
```yaml    

  photo_reolink_telegram:
    alias: Photo Reolink E1 zoom and send to Telegram
    sequence:
       - service: camera.snapshot
         data:
              entity_id: camera.reolink_e1_zoom_profile000_mainstream
              filename: "/config/www/cam_captures/reolink.jpg"
       - delay: 00:00:15
       - service: telegram_bot.send_photo
         data_template:
           target:
            - !secret telegram_id_1
           file: "/config/www/cam_captures/reolink.jpg" 
```

#### Record video and send to Telegram script:          
        
```yaml    

  video_reolink_telegram:
    alias: Video Reolink E1 zoom and send to Telegram
    sequence:
    - service: camera.record
      data_template:
        entity_id: camera.reolink_e1_zoom_profile000_mainstream
        filename: "/config/www/cam_captures/reolink.mp4"
        duration: 10
    - delay: 00:00:45
    - service: telegram_bot.send_video
      data_template:
        target:
            - !secret telegram_id_1
        file: "/config/www/cam_captures/reolink.mp4"
        
```

#### Automation - Request to send a photo via the /photo command  
This automation uses the template `target: '{{ trigger.event.data.user_id }}'`, which sends the photo to the user who made the request.         
        
```yaml            

    - alias: request_send_photo
      id: request_send_photo
      description: Request to send a photo
      initial_state: true
      trigger:
      - platform: event
        event_type: telegram_command
        event_data:
          command: '/photo'
      action:
      - service: camera.snapshot
        data:
             entity_id: camera.reolink_e1_zoom_profile000_mainstream
             filename: "/config/www/cam_captures/reolink.jpg"
      - delay: 00:00:15
      - service: telegram_bot.send_photo
        data_template:
          target: '{{ trigger.event.data.user_id }}'
          file: "/config/www/cam_captures/reolink.jpg" 

```
____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
