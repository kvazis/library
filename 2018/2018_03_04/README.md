### [Domoticz Tutorials - Introduction to DzVents](https://youtu.be/wZpS_PPtKso)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

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
### You can become a regular sponsor on any of these platforms -     
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg/join" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/youtube.png" alt="Youtube Sponsorship" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.patreon.com/alex_kvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/patreon-button.png" alt="Patreon Support" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.buymeacoffee.com/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/buymeacoffee.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<a href="https://www.paypal.com/paypalme/greatkvazis" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/paypal.png" alt="PayPal Me" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### Or a donation of any amount -     
<img src="https://raw.githubusercontent.com/kvazis/library/master/img/usdt.png" alt="USDT TRC20" style="height: 200px !important;width: 200px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<img src="https://raw.githubusercontent.com/kvazis/library/master/img/ton.png" alt="TON" style="height: 200px !important;width: 200px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<img src="https://raw.githubusercontent.com/kvazis/library/master/img/btc.png" alt="Bitcoin" style="height: 200px !important;width: 200px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
<img src="https://raw.githubusercontent.com/kvazis/library/master/img/eth.png" alt="Etherium" style="height: 200px !important;width: 200px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
