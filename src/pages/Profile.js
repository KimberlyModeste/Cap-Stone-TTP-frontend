import React, {useState, useContext, useEffect} from 'react'
import {Button, Grid, Header, Divider, Image,Icon, Card, Modal, Form, Container} from 'semantic-ui-react'
import '../App.css'
import { connect } from 'react-redux'



import { FETCH_POSTS_QUERY } from '../util/graphql';
import { SAVE_ALL_POSTS } from '../redux/actions';

import { useQuery } from '@apollo/client';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';


let Globalposts = []

function Profile({posts = []}, props) {
    
  const [open, setOpen] = useState(false)
  const { user, logout } = useContext(AuthContext); 
   
  console.log(props)

  const userName = props.match.params.username;

  const {
    loading,
    data: { getPosts: postsFromDB } = {}
    } = useQuery(FETCH_POSTS_QUERY);


  useEffect(() => {

    Globalposts = postsFromDB
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
              posts.map((post) => (
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


const mapStateToProps = (state, ownProps) => (console.log("state is: ",state),{
  posts: state.posts
});
const mapDispatchToProps = (dispatch) => { 
  return {
     save: () => dispatch({ type:SAVE_ALL_POSTS, payload:Globalposts}),
     }
 }


export default connect (mapStateToProps,mapDispatchToProps)(Profile)