import React, {useState, useContext} from 'react'
import {Button, Grid, Header, Divider, Image,Icon, Card, Modal, Form, Container} from 'semantic-ui-react'
import '../App.css'
import { connect } from 'react-redux'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';

function UsersPage({posts=[]}) {
  const [open, setOpen] = useState(false)
  const { user, logout } = useContext(AuthContext);



return (
    <div>
    <Header as='h2' icon textAlign='center'>
        <Image src='https://react.semantic-ui.com/images/avatar/small/molly.png' circular />
        <Header.Content>{user ? user.username : null}</Header.Content>
    </Header>
    <Grid>
      
    <Grid.Column textAlign= 'center'>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button 
        >Update Info</Button>}
      >
      <Modal.Header>Update Your Information</Modal.Header>
      <Form /*onSubmit={onSubmit}*/ noValidate>
        <Container textAlign= 'center' id ="update">
        
            <Form.Input
                label ="Username"
                placeholder = ".."
                value = {user ? user.username : null} //make this username
                type = "text"  
             /> 
             <Form.Input
                label ="Email"
                placeholder = "...."
                value = {user ? user.email : null} //make this email
                type = "text"  
             /> 
            <Form.Input
                label ="Password"
                placeholder = "Password..."
                value = "...."  //make this password
                type = "password"  
             /> 
            <Form.Input
                label ="Confirm Password"
                placeholder = "Confirm Password..."
                value = "MollyMoo" //make this the same as password
                type = "password"  
             /> 
        </Container>
      </Form>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          No
        </Button>
        <Button
          content="Yes"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}//make this actually update stuff
          positive
        />
      </Modal.Actions>
      
    </Modal>
    </Grid.Column> 
    </Grid>
    <Divider section />
    <PostForm />
    <Divider section />
    {/* 
    <Grid>
    <Grid.Column textAlign= 'center'>
      <Form>
      <Form.Input 
      label="Title"
      placeholder="Enter a Title"
      name = "title"
      type = "text"
      />

      <Form.Input 
      label="Topic"
      placeholder="Enter a Topic"
      name = "topic"
      type = "text"
      />

      <Form.TextArea 
      label="Body"
      placeholder=""
      name = "title"
      type = "text"
      />

      <Button 
      onClick={()=>{console.log("hi")}}
      animated
      floated='right'
      >
      <Button.Content visible>Post</Button.Content>
      <Button.Content hidden>
      <Icon name='arrow right' />
      </Button.Content>
      </Button>
      </Form>
      </Grid.Column>
      </Grid>

    <Divider section /> */}


    <Grid.Column centered columns={4}>   
          <>
            { 
              posts.map((post) => (
                post.username === user.username ?
                <div key={post.id}  >
                  <Grid>
                  <PostCard post={post} />
                  </Grid>
                </div> : null
              ))}
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
     //save: () => dispatch({ type:SAVE_ALL_POSTS, payload:Globalposts}),
     }
 }


export default connect (mapStateToProps)(UsersPage)