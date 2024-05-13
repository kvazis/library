### [Domoticz Tutorials - Introduction to DzVents](https://youtu.be/wZpS_PPtKso)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson:

```yaml
return {
active = true,
on = {
devices = {
'Кнопка 1'
}
},
execute = function(domoticz, device)
local lamp1 = domoticz.devices('Лампа 1')
local lamp2 = domoticz.devices('Лампа 2')
if (device.name == 'Кнопка 1' and device.state == 'On' ) then
if (lamp1.state == 'Off' and lamp2.state == 'Off') then
        lamp1.switchOn()
elseif (lamp1.state == 'On' and lamp2.state == 'Off'
and lamp1.lastUpdate.secondsAgo <= 3) then
lamp2.switchOn()
elseif (lamp1.state == 'On' and lamp2.state == 'Off'
and lamp1.lastUpdate.secondsAgo > 3) then
        lamp1.switchOff()
elseif (lamp1.state == 'On' and lamp2.state == 'On') then
lamp1.switchOff()
lamp2.switchOff()
end
end
end
}
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
