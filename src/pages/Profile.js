import React, {useState, useContext, useEffect} from 'react'
import {Button, Grid, Header, Divider, Image,Icon, Card, Modal, Form, Container} from 'semantic-ui-react'
import '../App.css'
import { connect } from 'react-redux'

import { withRouter } from "react-router";

import { FETCH_POSTS_QUERY } from '../util/graphql';
import { GET_ALL_POSTS } from '../redux/actions';
import { useQuery } from '@apollo/client';

import PostCard from '../components/PostCard';


let Globalposts = []

const Profile = (props) => {
    
  //const [posts, setPosts] = useState()
  const userName = props.match.params.username;

  useEffect(() => {
    console.log("State posts from profile: ",props.posts)
  })


return (

    <div style={{backgroundImage: "linear-gradient(#F7F8F8 0%, #ACBB78 100%)"}}>
    <Header as='h2' icon textAlign='center'>
        <Image src='https://www.kindpng.com/picc/m/285-2856724_user-avatar-enter-free-photo-user-avatar-green.png' circular />
        <Header.Content>{userName}</Header.Content>
    </Header>

    <Grid.Column centered columns={1}>   
          <>
            {
              props.posts.map((post) => (
                 post.username === userName?
                <div key={post.id}  >
                  <Grid>
                  <PostCard post={post} />
                  </Grid>
                </div> : null
              )) 
           } 
          </> 
      </Grid.Column>
     

</div>
)
}   

const mapStateToProps = function(state){
 return{ posts: state.posts }
};

const mapDispatchToProps = (dispatch) => { 
  return {
     getPosts: () => dispatch({ type:GET_ALL_POSTS}),
     }
 }
export default connect(mapStateToProps,mapDispatchToProps)(Profile) 