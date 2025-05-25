### [Home Assistant. Lesson 9.3 ADD-ON - Xiaomi Gateway 3, Xiaomi device tokens, 2021 firmware update](https://youtu.be/FVWfjE5tx2g)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

#### Code from the lesson  (updated 2025_05_25) :

**Command to enable Telnet**

```json
{"method":"set_ip_info","params":{"ssid":"\"\"","pswd":"123123 ; passwd -d admin ; echo enable > /sys/class/tty/tty/enable; telnetd"}}
```

**Convenient Telnet client** – [https://www.putty.org/](https://www.putty.org/)
**Login:** `admin`

**FIRMWARE UPDATE PROCESS:**

```bash
wget -O /tmp/curl " http://master.dl.sourceforge.net/project/mgl03/bin/curl?viasf=1 "  && chmod +x /tmp/curl  
export PATH="$PATH:/tmp"
```

**Firmware selection script**

```bash
curl -s -k -L -o /tmp/update.sh https://raw.githubusercontent.com/zvldz/mgl03_fw/main/firmware/mgl03_update.sh && sh /tmp/update.sh
```

**Choose the firmware based on recommendations here –**
[https://github.com/AlexxIT/XiaomiGateway3/wiki](https://github.com/AlexxIT/XiaomiGateway3/wiki)

---

**OLD VERSION:**

**Install curl (one-time operation)**

```bash
wget -O /tmp/wget http://pkg.musl.cc/wget/mipsel-linux-musln32/bin/wget && chmod +x /tmp/wget  
/tmp/wget -O /tmp/curl http://mipsel.vacuumz.info/files/curl && chmod +x /tmp/curl && rm -rf /tmp/wget  
export PATH="$PATH:/tmp"
```

**If 'pkg.musl.cc' is not working then use this:**

```bash
printf 'GET /files/curl HTTP/1.1\r\nHost: mipsel-ssl.vacuumz.info\r\nUser-Agent: Wget/1.20.3\r\nConnection: close\r\n\r\n' | openssl s_client -quiet -tls1_1 -connect mipsel-ssl.vacuumz.info:443 -servername mipsel-ssl.vacuumz.info | sed '/alt-svc.*/d' | tail -n +19 > /tmp/curl && chmod +x /tmp/curl  
export PATH="$PATH:/tmp"
```

**Firmware selection script**

```bash
curl -s -k -L -o /tmp/update.sh https://gist.github.com/zvldz/b40b4873e3c4c1a64ac536e8ce5dbdad/raw/mgl03_update.sh && sh /tmp/update.sh
```

____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
