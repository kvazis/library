### [Xiaomi Air Monitor - Add to Home Assistant](https://youtu.be/hrww-ruoCsQ)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


#### Install php pc:    

```yaml

sudo apt-get -y install php bc

```

#### Install php-miio    

```yaml

sudo git clone https://github.com/skysilver-lab/php-miio.git

```

#### Test request    

```yaml

php /home/NAME/php-miio/miio-cli.php --ip IP_DEVICE --token TOKEN --info

```

#### Script:          
        
```yaml    

#!/bin/bash

id=$(echo $RANDOM % 1000 + 1 | bc)

php /home/ИМЯ/php-miio/miio-cli.php --ip IP_DEVICE --token TOKEN --sendcmd '{"id":'"$id"',"method":"get_air_data","params":[]}' | tail -1 | sed 's/{"result"://g' | sed 's/\,"id.*//g'
 
```

#### Making the script executable          
        
```yaml    

sudo chmod 777 ~/scripts/air.sh
        
```

#### Chmod for folders    
        
```yaml            

sudo chmod -R 777 /usr/share/hassio/homeassistant/bash/

/home/NAME/scripts/air.sh > /usr/share/hassio/homeassistant/bash/air.txt

```

#### Execute every minute in cron    
        
```yaml            

sudo crontab -e

* * * * * /home/NAME/scripts/air.sh > /usr/share/hassio/homeassistant/bash/air.txt

```

#### Check in cron    
        
```yaml            

sudo crontab -e

sudo crontab -l

```


____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
