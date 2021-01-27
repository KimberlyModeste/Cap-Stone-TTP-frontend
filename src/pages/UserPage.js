import React, {useState, useContext, useEffect} from 'react'
import {Button, Grid, Header, Divider, Image,Icon, Card, Modal, Form, Container} from 'semantic-ui-react'
import '../App.css'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';


import { FETCH_POSTS_QUERY } from '../util/graphql';
import { SAVE_ALL_POSTS } from '../redux/actions';

import { useQuery } from '@apollo/client';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';


//let Globalposts = []
function UsersPage({posts = [], save}) {



  const [open, setOpen] = useState(false)
  const { user, logout } = useContext(AuthContext);


  const {
    loading,
    data: { getPosts: postsFromDB } = {}
    } = useQuery(FETCH_POSTS_QUERY);


    useEffect(() => {
      save(SAVE_ALL_POSTS, postsFromDB)
    

  })


return (

    <div style={{backgroundImage: "linear-gradient(#F7F8F8 0%, #ACBB78 100%)"}}>
    <Header as='h2' icon textAlign='center'>
        <Image src='https://www.kindpng.com/picc/m/285-2856724_user-avatar-enter-free-photo-user-avatar-green.png' circular />
        <Header.Content>{user ? user.username : null}</Header.Content>
    </Header>
    <Grid>
      
    <Grid.Column textAlign= 'center'>
      <Button as={Link} to={`/Donations/${user.username}`}>Donation</Button>
    <Modal
    style={{width:"30rem"}}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button 
        >Show Info</Button>}
      >
      <Modal.Header >Your Information</Modal.Header>

      <div class="ui list" style={{alignItems:"center"}}>
  <div class="item">
    <i class="user icon"></i>
    <div class="content">
    {user ? user.username : null}
    </div>
  </div>
  <div class="item">
    <i class="marker icon"></i>
    <div class="content">
      New York, NY
    </div>
  </div>
  <div class="item">
    <i class="mail icon"></i>
    <div class="content">
      <a href="mailto:jack@semantic-ui.com">{user ? user.email : null} </a>
    </div>
  </div>
</div>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Go Back
        </Button>
      </Modal.Actions>
      
    </Modal>
    </Grid.Column> 
    </Grid>
    <Divider section />
    <PostForm />


    <Grid.Column centered columns={1}>   
          <>
            { 
              posts.map((post) => (
                user && post.username === user.username ?
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
    save: (type,data) => dispatch({ type:type, payload:data}),
  }
 }


export default connect (mapStateToProps,mapDispatchToProps)(UsersPage)

