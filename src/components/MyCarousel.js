import  React  from  'react';
import  Carousel  from  'semantic-ui-carousel-react';

const  App  = () => {
	let  elements  = [
		{
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src="https://res.cloudinary.com/dnkxmjpxy/image/upload/v1612549382/Enviromaniacs_qxfqy8.png" alt="message"  />
			}
		},
		{
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src="https://res.cloudinary.com/dnkxmjpxy/image/upload/v1612549458/Enviromaniacs_3_gfyrwe.png" alt="message"  />
			}
        },
        {
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src="https://res.cloudinary.com/dnkxmjpxy/image/upload/v1612549512/Enviromaniacs_2_vo64kg.png" alt="message"  />
			}
        },
        {
			render:()=>{
				return <img style ={{margin:"0 auto 0 auto" , width:"50rem", height: "20rem" }}src="https://res.cloudinary.com/dnkxmjpxy/image/upload/v1612549546/Enviromaniacs_1_jlknuq.png" alt="message" />
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