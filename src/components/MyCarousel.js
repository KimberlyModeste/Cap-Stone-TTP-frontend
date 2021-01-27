import  React  from  'react';
import  Carousel  from  'semantic-ui-carousel-react';
import logo1 from "../assets/Enviromaniacs.png"
import logo2 from "../assets/Enviromaniacs (1).png"
import logo3 from "../assets/Enviromaniacs (2).png"
import logo4 from "../assets/Enviromaniacs (3).png"
const  App  = () => {
	let  elements  = [
		{
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src={logo1} alt="message"  />
			}
		},
		{
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src={logo2} alt="message"  />
			}
        },
        {
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src={logo3} alt="message"  />
			}
        },
        {
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src={logo4} alt="message" />
			}
        }
	]
	return (
        <div style={{ background: "transparent",padding:"30px" ,width: "60rem", margin:"0 auto 0 auto" , textAlign:"center"}}>
			<Carousel
                
				elements  =  {  elements  }
				duration  ={5000}
				animation  ='slide left'
				showNextPrev  =  {false}
				showIndicators  ={true}
			/>
        </div>
	)

}
export  default  App;