### [Home Assistant - energy consumption analysis, a web builder for easy logic creation](https://youtu.be/YPMFYWpvusM)

<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>



:point_right: **Version 1** - [Power Energy constructor RAW](https://raw.githubusercontent.com/kvazis/library/refs/heads/master/2026/2026_04_10/power_const.html) - show in video

:point_right: **Version 2** - [Power Energy constructor RAW](https://raw.githubusercontent.com/kvazis/library/refs/heads/master/2026/2026_04_10/power_const_v2.html)
#### Change log    
1. Added Edit Function  
   - Ability to edit existing sensors without recreating them  
   - Supports both measured and calculated sensors  
   - Phase reassignment (including 3-phase setups)

2. Added Branch Sensor  
   - New sensor type with nested child sensors  
   - Automatic calculation as: parent minus sum of children  
   - Supports multi-level hierarchy (branch → child → sub-child)  
   - Can convert existing measured sensor into a branch via edit mode  

3. Added Sankey Card Generator  
   - Generates ready-to-use YAML for ha-sankey-chart  
   - Supports both Panel view (full page) and Card YAML modes  
   - Automatic structure: sources → loads → nested loads  
   - Built-in "unknown load" calculation via remaining_parent_state  

4. Improved Visualization  
   - Phase-based color separation (L1 / L2 / L3)  
   - Branch nodes highlighted separately  
   - Child nodes use lighter shades for better hierarchy readability  
   - Unknown load visually separated

5. UX Improvements  
   - Auto YAML generation (no manual button needed)  
   - Project save/load via JSON  
   - Persistent UI state  
   - Cleaner structure for generated configs






____
<a href="https://www.youtube.com/channel/UCcq9onYHbs6go3kDpfBoqhg?sub_confirmation=1" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/subscribe.png" alt="Subscribe" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>     
<a href="http://kvazis.link/donate" target="_blank"><img src="https://raw.githubusercontent.com/kvazis/library/master/img/donate.png" alt="Donate" style="height: 71px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
