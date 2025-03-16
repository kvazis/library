### [Home Assistant Voice Preview Edition – Introduction, Features, Practical Use](https://youtu.be/wBC7BpnxgTM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Package:  

```yaml
ha_voice:

    template:
      - sensor:
          - name: temp_outdoor_state
            unique_id: temp_outdoor_state
            state: >-
              {% set t = states('sensor.0x00158d0001a4b9da_temperature') | float %}
              {% set status = 'Холодно' if t < 10 else 'Тепло' if t < 25 else 'Спека' %}
              {% set number_map = {
                0: 'нуль', 1: 'один', 2: 'два', 3: 'три', 4: 'чотири',
                5: 'п’ять', 6: 'шість', 7: 'сім', 8: 'вісім', 9: 'дев’ять',
                10: 'десять', 11: 'одинадцять', 12: 'дванадцять', 13: 'тринадцять',
                14: 'чотирнадцять', 15: 'п’ятнадцять', 16: 'шістнадцять',
                17: 'сімнадцять', 18: 'вісімнадцять', 19: 'дев’ятнадцять',
                20: 'двадцять', 30: 'тридцять', 40: 'сорок',
                50: 'п’ятдесят', 60: 'шістдесят', 70: 'сімдесят',
                80: 'вісімдесят', 90: 'дев’яносто'
              } %}
              {% set degrees = t | round | int %}
              {% set tens = (degrees // 10) * 10 %}
              {% set ones = degrees % 10 %}
              
              {% if degrees in number_map %}
                {% set number_text = number_map[degrees] %}
              {% else %}
                {% set number_text = number_map[tens] + ' ' + number_map[ones] %}
              {% endif %}
    
              {% if degrees % 10 == 1 and degrees % 100 != 11 %}
                {{ status }} {{ number_text }} градус
              {% elif 2 <= degrees % 10 <= 4 and (degrees % 100 < 10 or degrees % 100 >= 20) %}
                {{ status }} {{ number_text }} градуси
              {% else %}
                {{ status }} {{ number_text }} градусів
              {% endif %}

    automation:

      - alias: ha_voice_temp
        id: ha_voice_temp
        description: Голосовий запит, температура на вулиці
        initial_state: true
        triggers:
          - trigger: conversation
            command: Що на вулиці
        action:
         - action: tts.cloud_say
           data:
             entity_id: media_player.home_assistant_voice_092538_media_player
             message: "{{states('sensor.temp_outdoor_state')}}"
         - delay: 00:00:05
         
      - alias: ha_voice_test
        id: ha_voice_test
        description: Голосовий запит визначення ассистенту
        initial_state: true
        triggers:
          - trigger: conversation
            command: Привіт
        action:
            - choose:
              - conditions:
                  - condition: template
                    value_template: "{{ states('assist_satellite.home_assistant_voice_092538_assist_satellite') != 'idle'}}"
                sequence:
                  - action: tts.cloud_say
                    data:
                      entity_id: media_player.home_assistant_voice_092538_media_player
                      message: Перший асистент на зв'язку
              - conditions:
                  - condition: template
                    value_template: "{{ states('assist_satellite.home_assistant_voice_091cce_assist_satellite') != 'idle'}}"
                sequence:
                  - action: tts.cloud_say
                    data:
                      entity_id: media_player.home_assistant_voice_091cce_media_player
                      message: Другий асистент на зв'язку
            - delay: 00:00:05
```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
