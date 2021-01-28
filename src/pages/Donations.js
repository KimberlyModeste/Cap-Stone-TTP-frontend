import React, { useState } from 'react';
import { Button, Form, Icon, Confirm} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Paypal  from "../components/Paypal";
import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Donations(props) {
  const { values, onChange } = useForm(createPostCallback, {
    body: '',
    title: 'Donations',
    img: 'https://cdn4.iconfinder.com/data/icons/care-and-help/50/38-512.png'
  });
  const [value, setValue] = useState('Wolfo Wildlife Preserve')
  


  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false)


  function handleChange (e)
  {
    setValue(e.target.innerText)
  }

  const [checkout, setCheckOut] = useState(false)

  const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy,result){
        const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
        })
        const posts = [result.data.createPost, ...data.getPosts];
        values.body = words;
        console.log(posts)
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
        
        
    },
    onError(err){
        return err;
    }
})

  function createPostCallback() {
    setConfirmOpen(false)
    setConfirmation(true)
    setTimeout(setConfirmation, 3000)
    values.body = donationScript
    createPost();
  }
  
  let words = "Are you sure you want to donate $"+values.body+" to "+value+"?";
  let donationScript = "Donated $"+values.body+" to "+value+"!"
  return (
    <div style={{width:"30rem", margin:"3rem auto 3rem auto",background:"", borderRadius:"0.5rem"}}>
      <Form className="ui form" onSubmit={() => setConfirmOpen(true)}>
        <h2>Donate to a Foundation:</h2>
        <Form.Field>
        <Form.Radio
            label='Wolfo Wildlife Preserve'
            value ='wwp'
            checked={value === 'Wolfo Wildlife Preserve'}
            onChange={handleChange}
          />
           <Form.Radio
            label='Goldies Fish Swimmy Conservative'
            value ='gfsc'
            checked={value === 'Goldies Fish Swimmy Conservative'}
            onChange={handleChange}
          />
          <Form.Radio
            label='Air Boy Cleaner Corp'
            value ='abcc'
            checked={value === 'Air Boy Cleaner Corp'}
            onChange={handleChange}
          />
          <Form.Input required
            placeholder="$.$$"
            type="number"
            min="0.01"
            step="0.01"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          {checkout && values.body? (
          <Paypal price = {values.body}/> 
          ) : (
            <>
           <Button animated type="submit" color="green" >
              <Button.Content visible>Pay</Button.Content>
              <Button.Content hidden>
              <Icon name='arrow right' />
              </Button.Content>
            </Button> 
            <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        content ={words}
        onConfirm={createPostCallback}
      />
          </>
          
          )}
      <Button animated color="blue" type="submit" onClick= {()=>{
             setCheckOut(!checkout)
           }}>
          <Button.Content visible>Pay with Paypal</Button.Content>
          <Button.Content hidden>
          <Icon name='arrow right' />
          </Button.Content>
      </Button> 
          
        </Form.Field>
      </Form>
     
      {confirmation ?(<strong style={{marginTop:"5px",fontSize:"xx-large"}}>Thank You For Kind Donation!!!</strong>):("")}
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{console.log(JSON.stringify(error, null, 2))}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $img: String ,$body: String!) {
    createPost( title: $title, img: $img ,body: $body) {
      id
      title
      img
      body
      createdAt
      causes
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default Donations;
