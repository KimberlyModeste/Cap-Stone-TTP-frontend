import React from 'react'
import { Table, Image} from 'semantic-ui-react'
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

         t.style.background = "linear-gradient(90deg, #56ab2f 0%, #FFFFFF 100%)"; //green
         //t.style.background= "url(https://png.pngtree.com/thumb_back/fw800/back_pic/00/05/33/86562656f65b38e.png)"
         t.style.color = "black"

         words = "Good"
         
        }

        else if(aqi <= 100)
        {
        t.style.background = "linear-gradient(90deg, #fffc00 0%, #FFFFFF 100%)"; //green
        t.style.color = "black"
         words = "Moderate"
        }
        
        else if(aqi <= 150)
        {
        t.style.background = "linear-gradient(90deg, #f12711 0%, #f5af19 100%)"; //green
         t.style.color = "white"
         words = "Unhealthy for sensitive groups"
        }

        else if(aqi <= 200)
        {
        t.style.background = "linear-gradient(90deg, #ff416c 0%, #ff4b2b 100%)"; //green
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
         <Table id="banner" style={{ margin:"0 auto 1rem auto",padding:"2rem",borderRadius:"5%", width:"50%", border:"0.2rem solid white"}}>
             <h1>{area}</h1>
             <tr><td style={{fontSize:"large"}}>{usaqiwords} <br/><br/><p >{caqiwords}</p></td><td style={{fontSize:"large"}}>
                {time}
                <br/>
                <br/>
                 <Image src = {link} size="tiny" verticalAlign='middle'/>{temp}
                 </td></tr>
                 <tr><td style={{fontSize:"large"}}>{words}</td></tr>
                 </Table>
        </div>
    )
}

