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
        "https://api.airvisual.com/v2/nearest_city?key=bb37c382-bd04-439e-a6f7-6970a3739b22"
      )
      .then((res) => {
        setWeather(res.data)
      })
      .catch((err) => console.log(err));
    
  }, [])


  return (
    <>
    <div>
      <video src ={vid} autoPlay loop muted/>
     
      <WeatherBar weatherStuff={weather} /> 
 <ControlledCarousel />
      <Grid.Row className="page-title">
 <p style={{margin:"0 0 0 0 ", fontFamily:"Impact, fantasy"}}>Trending</p>
      </Grid.Row>
      <Grid.Column centered columns={4}>
        {loading ? (
          <p>Loading posts..</p>
        ) : ( 
          <div>
            {
              postsFromDB.map((post) => (
               
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

const mapStateToProps = (state, ownProps) => (
  console.log("state from home is: ",state),
{
  posts: state.posts
});
const mapDispatchToProps = (dispatch) => {
  return {
     save: (type,data) => dispatch({ type:type, payload:data}),
    }
 }
export default connect(mapStateToProps, mapDispatchToProps)(Home);