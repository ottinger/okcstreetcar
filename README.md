# okcstreetcar

This is a web app that provides information about the Oklahoma City Streetcar. As of present, it provides a map of station locations and arrival times for each station. It is running live at http://www.streetcar.xyz.

Arrival times are provided via OKC Streetcar's real-time tracking system, run by US Fleet Tracking. This is the same information as is displayed on the arrival time displays at streetcar stops. You can get the exact same display [on their website](http://okcstreetcar.com/ride-guide/real-time/), but the interface isn't exactly the nicest to use.

## How to run

After installing node and necessary dependencies, run "node eventproxy.js". 

## Technologies/frameworks used
* Arrival times are obtained in json format from USFT's system using server-sent events. Due to same-origin policy (and to keep some stress off their systems), a crude "proxy" is used to relay this data to the user. This was built with **Node.js** and **Express.js**.
* **Bootstrap**
* **Leaflet.js**
* **Vue.js**

## To do
* Add rider alerts from the @OKCStreetcar twitter account
* Possibly add limited trip routing (ie, to help users decide between 2 close by stations on different "branches" of the loop)
* Tweak/redesign user interface
* Implement proper testing
* Implement json api for arrival times
* And so on