import React from 'react'
import { Table, Image, Flag } from 'semantic-ui-react'
import dateFormat from 'dateformat'


export default function WeatherBar({weatherStuff}) {
  
    let aqi;
    let words, usaqiwords, area, caqiwords, time, temp, link ="https://www.airvisual.com/images/";
    let t = document.getElementById("banner");
    console.log(weatherStuff)
    console.log(weatherStuff.data)


    if(t !== null && weatherStuff.data!== undefined)
    {
        aqi = weatherStuff.data.current.pollution.aqius;

        if(aqi <= 50)
        {
         t.style.background ="#52b947" //green
         t.style.color = "black"
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
