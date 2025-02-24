#### [ANNKE video surveillance system - BR200 camera and DW41JD recorder, integration into Home Assistant](https://youtu.be/U9oVozFg4S8)    

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

## 1 channel main stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/101
    extra_arguments: "-rtsp_transport tcp"
## 1 channel sub stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/102
    extra_arguments: "-rtsp_transport tcp"
    
## 2 channel main stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/201
    extra_arguments: "-rtsp_transport tcp"
## 2 channel sub stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/202
    extra_arguments: "-rtsp_transport tcp"
    
## 3 channel main stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/301
    extra_arguments: "-rtsp_transport tcp"
## 3 channel sub stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/302
    extra_arguments: "-rtsp_transport tcp"
    
## 4 channel main stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/401
    extra_arguments: "-rtsp_transport tcp"
## 4 channel sub stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/402
    extra_arguments: "-rtsp_transport tcp"
    
## IP camera main stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/501
    extra_arguments: "-rtsp_transport tcp"
## IP camera sub stream
  - platform: ffmpeg
    name: ANNKE
    input: rtsp://admin:пароль@192.168.0.213:554/Streaming/Channels/502
    extra_arguments: "-rtsp_transport tcp"

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
