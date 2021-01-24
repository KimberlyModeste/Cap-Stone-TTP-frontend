import React, {useState} from 'react'
import {Button, Grid, Header, Divider, Image,Icon, Card, Modal, Form, Container} from 'semantic-ui-react'
import '../App.css'
import WildFires from '../PostsExamples/WildFires'
import Marine from '../PostsExamples/Marine'
import Air from '../PostsExamples/Air'


export default function UsersPage() {
    const [open, setOpen] = useState(false)
  

return (
    <div>
    <Header as='h2' icon textAlign='center'>
        <Image src='https://react.semantic-ui.com/images/avatar/small/molly.png' circular />
        <Header.Content>Molly</Header.Content>
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
                placeholder = "Username..."
                value = "Molly" //make this username
                type = "text"  
             /> 
             <Form.Input
                label ="Email"
                placeholder = "Email..."
                value = "Molly@gmail.com" //make this email
                type = "text"  
             /> 
            <Form.Input
                label ="Password"
                placeholder = "Password..."
                value = "MollyMoo" //make this password
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

    <Divider section />
        <Card id = "templates" className = 'ui centered card'>
          <Card.Content>
             <Image
            floated='left'
            size= 'tiny'
            src='https://cdn.vox-cdn.com/thumbor/skL3_Hff3QqdE6hOuOADfbjty6U=/0x0:4000x2667/820x461/filters:focal(2078x283:2718x923):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66063681/GettyImages_1197451354.0.jpg'
            circular
            />
            <Card.Header>Australian wildfires</Card.Header>
            <Card.Meta>Wild Fires</Card.Meta>
            <Card.Description>
            <WildFires/>
            </Card.Description>
            </Card.Content>
        </Card>
        
        <Card id = "templates" className = 'ui centered card'>
          <Card.Content>
             <Image
            floated='left'
            size= 'tiny'
            src='https://media.nationalgeographic.org/assets/photos/199/936/966a6644-a092-4ec0-899f-f6bb377af14b.jpg'
            circular
            />
            <Card.Header>Marine pollution</Card.Header>
            <Card.Meta>pollution</Card.Meta>
            <Card.Description>
            <Marine/>
            </Card.Description>
            </Card.Content>
        </Card>
       
        <Card id = "templates" className = 'ui centered card'>
          <Card.Content>
             <Image
            floated='left'
            size= 'tiny'
            src='https://assets.nrdc.org/sites/default/files/styles/full_content--retina/public/media-uploads/health4_26_airpollguide_istock_2796602_2400.jpg?itok=n2tBYa7S'
            circular
            />
            <Card.Header>Air pollution</Card.Header>
            <Card.Meta>pollution</Card.Meta>
            <Card.Description>
            <Air />
            </Card.Description>
            </Card.Content>
        </Card>

</div>
    
)
}
