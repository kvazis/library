### [Xiaomi 2K IP camera MJSXJ03HL, part 2 - reflashing, integration into Home Assistant](https://youtu.be/JKiatUTnPgo)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Resources:    

:white_check_mark: **Resources:**    
:ballot_box_with_check: [Github Andrik45719](https://github.com/Andrik45719/MJSXJ03HL)     

#### Generic Camera 


```yaml
Image
http://root:PASSWORD@YOUR_IP/x/image.cgi
Main stream
rtsp://thingino:thingino@YOUR_IP:554/ch0
Substream 
rtsp://thingino:thingino@YOUR_IP:554/ch1

```


:ballot_box_with_check: Template sensors    

```yaml
    template:

      - trigger:
         - platform: mqtt
           topic: "thingino/0268a8631f66"     
        binary_sensor:
          - name: lr_mi_2k_motion
            unique_id: lr_mi_2k_motion
            state: True
            auto_off: 10
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
