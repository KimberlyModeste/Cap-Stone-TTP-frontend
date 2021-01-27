import React, { useState } from 'react';
import { Button, Form, Icon, Confirm } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Donations(props) {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
    title: 'Donations',
    img: 'https://cdn4.iconfinder.com/data/icons/care-and-help/50/38-512.png'
  });
  const [value, setValue] = useState('')
  let username = props.match.params.username;
  const [confirmOpen, setConfirmOpen] = useState(false);
  function handleChange (e)
  {
    setValue(e.target.innerText)
  }


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
    values.body = donationScript
    createPost();
  }
  
  console.log(values.body)
  console.log(values)
  console.log(username+' donated $'+Math.round(values.body *100)/100+' to the '+value+"!")
  let words = "Are you sure you want to donate $"+values.body+" to "+value+"?";
 let donationScript = username+" donated $"+values.body+" to "+value+"!"
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
            label='Air Boy Cleaner Corp.'
            value ='abcc'
            checked={value === 'Air Boy Cleaner Corp'}
            onChange={handleChange}
          />
          <Form.Input
            placeholder="$.$$"
            type="number"
            min="0.01"
            step="0.01"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button animated type="submit" color="green">
          <Button.Content visible>Donate</Button.Content>
      <Button.Content hidden>
      <Icon name='arrow right' />
      </Button.Content>
          </Button>
        </Form.Field>
      </Form>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        content ={words}
        onConfirm={createPostCallback}
    />
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
