import React from 'react'
import { Table, Image, Flag } from 'semantic-ui-react'
import dateFormat from 'dateformat'


export default function WeatherBar({weatherStuff}) {
  
    let aqi;
    let words, usaqiwords, area, caqiwords, time, temp, link ="https://www.airvisual.com/images/";
    let t = document.getElementById("banner");


    if(t !== null && weatherStuff.data!== undefined)
    {
        aqi = weatherStuff.data.current.pollution.aqius;

        if(aqi <= 50)
        {
         t.style.background = "linear-gradient(to right, #DCE35B 0%, #45B649 100%)"; //green
         //t.style.backgroundImage= "url(https://images.unsplash.com/photo-1524535412680-21809efc44e7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80)"
         t.style.color = "black"
         t.style.width="50%"
         t.style.margin="2rem auto 2rem auto"
         t.style.borderRadius="5%"
         words = "Good"
         
        }

        else if(aqi <= 100)
        {
         t.style.background ="#f3ec19" //yellow
         t.style.color = "black"
         words = "Moderate"
        }
        
        else if(aqi <= 150)
        {
         t.style.background ="#f57e20" //orange
         t.style.color = "white"
         words = "Unhealthy for sensitive groups"
        }

        else if(aqi <= 200)
        {
         t.style.background ="#ed1d24" //red
         t.style.color = "white"
         words = "Unhealthy"
        }

        else if(aqi <= 300)
        {
         t.style.background ="#7e2b7d" //purple
         t.style.color = "white"
         words = "Very Unhealthy"
        }

        else if(aqi <= 500)
        {
         t.style.background ="#480d27" //dark purple
         t.style.color = "white"
        
         words = "Hazardous"
        }
       
    
    if(weatherStuff.data.country === "USA")
        temp = (weatherStuff.data.current.weather.tp *(9/5)+35)+"°F"
       
    else
    temp = weatherStuff.data.current.weather.tp+"°C"
    link = link + weatherStuff.data.current.weather.ic+".png"
    usaqiwords = "Air Quality Index according to the US: "+ weatherStuff.data.current.pollution.aqius
    caqiwords = "Air Quality Index according to China: "+ weatherStuff.data.current.pollution.aqicn
    words = "Air Quality: " +words;
    time=dateFormat(weatherStuff.data.current.weather.ts, "dddd, mmmm dS, yyyy")
    area = weatherStuff.data.city+", "+weatherStuff.data.state
    }
    return (
        <div>
         <Table id="banner">
             <h1>{area}</h1>
             <tr><td>{usaqiwords} <br/><br/>{caqiwords}</td><td>
                {time}
                <br/>
                <br/>
                 <Image src = {link} size="tiny" verticalAlign='middle'/>{temp}
                 </td></tr>
                 <tr><td>{words}</td></tr>
                 </Table>
        </div>
    )
}