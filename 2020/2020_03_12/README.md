### [Home Assistant. Lesson 8.1 Automations - structure, triggers, conditions, actions. Scripts](https://youtu.be/sJ9oIDFpJOU)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Automations - Link to external folder    

```yaml

automation: !include_dir_merge_list includes/automation

```

### Triggers:
:ballot_box_with_check: Multiple triggers operate in OR mode. For the automation action to be executed, the activation of ANY trigger is sufficient.    
#### Start/stop the system:  

```yaml

- platform: homeassistant
  event: start
  
- platform: homeassistant
  event: shutdown

```

#### Start at a specific time:  

```yaml

- platform: time
  at: "14:14:14"

```

#### Periodic launch at a specified time interval:  

```yaml

- platform: time_pattern
  seconds: '/30'
  
- platform: time_pattern
  minutes: '/2'
  
- platform: time_pattern
  hours: '/3'  

```

#### Periodic launch at a template time:  
##### Every hour at XX:10 minutes:  
```yaml

- platform: time_pattern
  minutes: 10

```

##### Every minute of the sixth hour:  
```yaml

- platform: time_pattern
  hours: "6"
  minutes: "*"

```

#### States:  
##### Device states:  
```yaml

- platform: state
  entity_id: Entity ID
  to: (single, double, triple, quadruple, many, long, long_release click etc)

```

##### to "Unavailable" status:  
```yaml

- platform: state
  entity_id: Entity ID
  to: 'unavailable'

```

##### from "Unavailable" status:  

```yaml

- platform: state
  entity_id: Entity ID
  from: 'unavailable'

```

##### Switching from on to off state:  

```yaml
- platform: state
  entity_id: Entity ID
  from: 'on'
  to: 'off'

```

##### Switching to the off state and staying in it for 5 minutes:  

```yaml
- platform: state
  entity_id: Entity ID
  to: 'off'  
  for:
    minutes: 5

```

##### Switching to the off state and staying in it for 5 minutes:  

```yaml
- platform: state
  entity_id: Entity ID
  to: 'off'  
  for:
    minutes: 5

```

##### Тhreshold value:  

```yaml

- platform: numeric_state
  entity_id: Entity ID
  below: value
  
- platform: numeric_state
  entity_id: Entity ID
  above: value

```

#### Events:  
##### Device events:  
```yaml

- platform: event
  event_type: xiaomi_aqara.click
  event_data:
    entity_id: binary_sensor.switch_*********
    click_type: (single, double, triple, quadruple, many, long, long_release click etc)

```

##### Timer countdown completed:  

```yaml

- platform: event
  event_type: timer.finished
  event_data:
    entity_id: timer.******

```

##### Timer countdown completed:   

```yaml

- platform: event
  event_type: timer.finished
  event_data:
    entity_id: timer.******

```

### Conditions:

:ballot_box_with_check: Multiple conditions, by default, operate in AND mode. The automation will execute only if ALL specified conditions are met.    
:ballot_box_with_check: If only one of the listed conditions needs to be met, the OR construction is as follows:    

```yaml

  condition:
    condition: or
    conditions:

```

:ballot_box_with_check: If you need to combine both options, the construction looks like this:    

```yaml

  condition:
# The first two conditions must both be met (AND)
    - condition: state
      entity_id: Entity ID
      state: STATE
    - condition: state
      entity_id: Entity ID
      state: STATE
# The third and fourth conditions – it is sufficient for any one of them to be met (OR).
    - condition: or
      conditions:
         - condition: state
           entity_id: Entity ID
           below: VALUE
         - condition: numeric_state
           entity_id: Entity ID
           above: VALUE

```

#####  The state of the entity – on or off:   

```yaml

- condition: state
  entity_id: Entity ID
  state: 'on'
  
- condition: state
  entity_id: Entity ID
  state: 'off'

```

##### The specified state persists for no less than the specified duration, for example, 1 hour, 10 minutes, and 5 seconds:    

```yaml

- condition: state
  entity_id: Entity ID
  state: STATE
  for:
    hours: 1
    minutes: 10
    seconds: 5

```

##### A numerical value:     

```yaml
- condition: numeric_state
  entity_id: Entity ID
  below: VALUE
  
- condition: numeric_state
  entity_id: Entity ID
  above: VALUE
  
- condition: numeric_state
  entity_id: Entity ID
  above: VALUE
  below: VALUE
```

##### Within the specified time range – after 16:00 and before 21:00:     

```yaml

- condition: time
  after: '16:00:00'
  before: '21:00:00'

```

##### On specified days of the week (can be combined with time in a single condition) – specify the required days of the week:    

```yaml

- condition: time
  weekday:
    - mon
    - tue
    - wed
    - thu
    - fri
    - sat
    - sun

```

### Actions:
#### Switches – On / Off / Toggling:  

```yaml

- service: switch.turn_on
  entity_id: switch.******
  
- service: switch.turn_off
  entity_id: switch.******

- service: switch.toggle
  entity_id: switch.******

```

#### Using a single service for multiple entities:  

```yaml

  entity_id:
    - switch.******
    - switch.******
    - switch.******

```

#### Lights:  

```yaml

- service: light.turn_on
  entity_id: light.******
  
- service: light.turn_off
  entity_id: light.******
  
- service: light.toggle
  entity_id: light.******

  entity_id:
    - light.******
    - light.******
    - light.******

```

#### Specifying a set brightness and color temperature (60% brightness, 4000 K): 

```yaml

- service: light.turn_on
  entity_id: light.******
  data_template:
    brightness_pct: 60
    kelvin: 4000

```

#### Specifying a set brightness and color for RGB:    

```yaml

- service: light.turn_on
  entity_id: light.******
  data_template:
    brightness_pct: 60
    rgb_color: [169, 153, 255]

```

#### Timers:    

```yaml

# Start
- service: timer.start
  entity_id: timer.*****
  
# Setting the timer duration in the automation.
- service: timer.start
  entity_id: timer.*****
  data_template:
     duration: 00:05:00
     
# Cancel
- service: timer.cancel
  entity_id: timer.*****

```

#### A universal service for any entities:    

```yaml

- service: homeassistant.turn_on
  entity_id: *****
  
- service: homeassistant.turn_off
  entity_id: *****

```

#### Scripts:    

```yaml

- service: script.turn_on
  entity_id: script.******
  
- service: script.turn_off
  entity_id: script.******
  
```






____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
