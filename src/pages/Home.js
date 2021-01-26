import React, { useContext, useEffect } from 'react';
import axios from "axios";
import WeatherBar from '../components/WeatherBar'
import { useQuery } from '@apollo/client';
import { Grid,  Divider} from 'semantic-ui-react'
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import {connect} from 'react-redux'
import { SAVE_ALL_POSTS } from '../redux/actions';
import vid from "../Pexels Videos 1204911.mp4"



let Globalposts =[]
let weather ={}


const  Home = ({posts = [], save}) => {


  const { user } = useContext(AuthContext);

  
  const {
    loading,
    data: { getPosts: postsFromDB } = {}
    } = useQuery(FETCH_POSTS_QUERY);


  useEffect(() => {
    
  Globalposts = postsFromDB
  save({type: SAVE_ALL_POSTS })

  
  axios
      .get(
        "https://api.airvisual.com/v2/nearest_city?key=a151e02a-8442-4f12-8b56-5a7bf4b9d8e1"
      )
      .then((res) => weather = res.data)
      .catch((err) => console.log(err));
    
  console.log("weather data",weather)
  })


  return (
    <>
    <div>
      <video src ={vid} autoPlay loop muted/>
      <WeatherBar weatherStuff={weather} /> 

      <Grid.Row className="page-title">
 <h1 style={{margin:"0 0 0 0 ", fontFamily:"Impact, fantasy"}}>Trending.....</h1>
      </Grid.Row>
      <Grid.Column centered columns={4}>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : ( 
          <div>
            {
              posts.map((post) => (
                console.log(post),
                <div key={post.id}  >
                  <Grid>
                  <PostCard post={post} />
                  </Grid>
                </div> 
              ) )}
          </div>
          
        )}
      </Grid.Column>
    </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => (//console.log("state is: ",state),
{
  posts: state.posts
});
const mapDispatchToProps = (dispatch) => { 
  return {
     save: () => dispatch({ type:SAVE_ALL_POSTS, payload:Globalposts}),
     }
 }
export default connect(mapStateToProps, mapDispatchToProps)(Home);