import React, { useEffect , useState} from 'react';
import axios from "axios";
import WeatherBar from '../components/WeatherBar'

import { useQuery } from '@apollo/client';
import { Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import {connect} from 'react-redux'
import { SAVE_ALL_POSTS } from '../redux/actions';
import vid from "../Pexels Videos 1204911.mp4"
import ControlledCarousel from "../components/MyCarousel"

import Footer from '../components/Footer';


const  Home = ({ save}) => {


  //const { user } = useContext(AuthContext);
  const  [weather, setWeather ] = useState({}) 

  const {
    loading,
    data: { getPosts: postsFromDB } = {}
    } = useQuery(FETCH_POSTS_QUERY);


  useEffect(() => {
  save(SAVE_ALL_POSTS, postsFromDB)
  axios
      .get(

       "https://api.airvisual.com/v2/nearest_city?key=7d2389af-d3a9-40ed-b6dc-e60db096c399"
      )
      .then((res) => {
        setWeather(res.data)
      })
      .catch((err) => console.log("Api Error fetches exceeded limit: ", err));
  
  }, [save, postsFromDB])



  return (
    <div>
      <video src ={vid} autoPlay loop muted/>
      <WeatherBar weatherStuff={weather} /> 
      <ControlledCarousel />
      <Grid.Row className="page-title" >
        <p style={{margin:"0 0 0 0 ", fontFamily:"Impact, fantasy"}}>Trending</p>
      </Grid.Row>
      <Grid.Column  columns={4} >
        {loading ? (
          <p style={{fontSize:"x-large", margin:"2rem auto 2rem auto" }}>Loading posts..</p>
        ) : ( 
          <div>
            {
              postsFromDB.map((post) => (

                <div key={post.id}  >
                  <Grid >
                  <PostCard post={post} />
                  </Grid>
                </div> 
              ) )}
          </div>
        )}
      </Grid.Column>

     <Footer />
    </div>
  );
}

const mapStateToProps = (state) => (
{
  posts: state.posts
});
const mapDispatchToProps = (dispatch) => {
  return {
    
    save: (type,data) => dispatch({ type:type, payload:data}),
    }
 }
export default connect(mapStateToProps, mapDispatchToProps)(Home);