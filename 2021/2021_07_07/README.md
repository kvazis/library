### [Atom Hydrogen - universal smart home controller, overview, features, ESP Home, Home Assistant](https://youtu.be/MBxUk2AMBFQ)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


```yaml
esphome:
  name: athom-hydrogen
  platform: ESP32
  board: pico32
  includes:
    - PCA9536.h

# Enable logging
logger:

# Enable Home Assistant API
api:
  password: !secret api_password

ota:
  password: !secret ota_password

wifi:
  ssid: 'Kalimdor'
  password: !secret wifi_password
  manual_ip:
    static_ip: YOUR IP
    gateway: YOUR GATEWAY
    subnet: 255.255.255.0
    dns1: 8.8.8.8
    dns2: 8.8.4.4
    
  # Enable fallback hotspot (captive portal) in case wifi connection fails
  ap:
    ssid: "Athom-Hydrogen Fallback Hotspot"
    password: !secret fallback_password

captive_portal:

web_server:
  port: 80
  
time:
- platform: sntp
  id: sntp_time
  servers:
   - 0.pool.ntp.org
   - 1.pool.ntp.org
   - 2.pool.ntp.org

i2c:
  sda: 21
  scl: 19
  scan: True

font:
  - file: 'arial.ttf'
    id: font1
    size: 16

  - file: 'arial.ttf'
    id: font2
    size: 32

  - file: 'arial.ttf'
    id: font3
    size: 14  
    
display:
 - platform: ssd1306_i2c
   model: "SSD1306 128x64"
   address: 0x3C
   update_interval: 3s
   lambda: |-
    it.printf(64, 0, id(font1), TextAlign::TOP_CENTER, "Kvazis");
    it.strftime(0, 55, id(font2), TextAlign::BASELINE_LEFT ,"%H:%M", id(sntp_time).now());
    
mcp23008:
- id: 'mcp23008_hub'
  address: 32
  
switch:

 - platform: gpio
   name: "OUT9"
   id: relay9
   pin:
    mcp23xxx: mcp23008_hub
    number: 1
    mode: OUTPUT
    inverted: False

 - platform: gpio
   name: "OUT10"
   id: relay10
   pin:
     mcp23xxx: mcp23008_hub
     number: 0
     mode: OUTPUT
     inverted: False  
     
 - platform: gpio
   pin: 18
   name: "Enable modules"
   
 - platform: gpio
   pin: 23
   name: "R Moдуль"
   id: runit

binary_sensor:
 - platform: gpio
   name: "IN1"
   pin:
     number: 33
     inverted: True     
   on_state:
     then:
       - switch.toggle: relay9
       
 - platform: custom
   lambda: |-
     auto pca9536 = new PCA9536();
     App.register_component(pca9536);
     return {pca9536->but0, pca9536->but1, pca9536->but2, pca9536->but3};
   binary_sensors:
    - name: "Button 0"
      on_press:
        then:
          - switch.toggle: relay9    
    - name: "Button 1"
      on_press:
        then:
          - switch.toggle: relay10
    - name: "Button 2"
      on_press:
        then:
          - switch.toggle: runit  
    - name: "Button 3"
    
uart:
  rx_pin: 35
  baud_rate: 4800

sensor:
  - platform: cse7766
    update_interval: 2s
    current:
      name: "Current"
      unit_of_measurement: A
      accuracy_decimals: 3
    voltage:
      name: "Voltage"
      unit_of_measurement: V
      accuracy_decimals: 2
      filters:
        # Map from sensor -> measured value
        - calibrate_linear:
            - 0.0 -> 0.0
            - 500.0 -> 940.0
      
    power:
      name: "Power"  
      unit_of_measurement: W
      accuracy_decimals: 2
      filters:      
              # Map from sensor -> measured value
        - calibrate_linear:
            - 0.0 -> 0.0
            - 5000.0 -> 9400.0

output:
  - platform: ac_dimmer
    id: dimmer1
    gate_pin: 2
    init_with_half_cycle: true
    method: leading
    zero_cross_pin:
      number: 34
      mode: INPUT_PULLUP
      inverted: false

            
light:

  - platform: monochromatic
    output: dimmer1
    name: "Dimmer"

  - platform: fastled_clockless
    chipset: WS2811
    pin: 32
    num_leds: 60
    rgb_order: GRB
    name: "FastLED WS2811 Light"
    effects:
      - addressable_rainbow:
      - addressable_rainbow:
          name: Rainbow Effect With Custom Values
          speed: 10
          width: 50
      - random:
          name: "My Fast Random Effect"
          transition_length: 4s
          update_interval: 5s
      - addressable_color_wipe:
      - addressable_color_wipe:
          name: Color Wipe Effect With Custom Values
          colors:
            - red: 100%
              green: 100%
              blue: 100%
              num_leds: 1
            - red: 0%
              green: 0%
              blue: 0%
              num_leds: 1
          add_led_interval: 100ms
          reverse: False
      - addressable_scan:
      - addressable_scan:
          name: Scan Effect With Custom Values
          move_interval: 100ms
          scan_width: 1
      - addressable_twinkle:
      - addressable_twinkle:
          name: Twinkle Effect With Custom Values
          twinkle_probability: 5%
          progress_interval: 4ms
      - addressable_fireworks:
      - addressable_fireworks:
          name: Fireworks Effect With Custom Values
          update_interval: 32ms
          spark_probability: 10%
          use_random_color: false
          fade_out_rate: 120

```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
