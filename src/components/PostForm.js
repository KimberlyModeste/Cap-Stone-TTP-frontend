import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: '',
    title: '',
    img: ''

  });

  const [createPost, {error}] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy,result){
        const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
        })
        const posts = [result.data.createPost, ...data.getPosts];
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts: posts } });
        values.body ='';
    },
    onError(err){
        return err;
    }
})

  function createPostCallback() {
    createPost();
  }

  return (
    <div style={{width:"60rem", marginLeft:"50%" }}>
      <Form onSubmit={onSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
        <Form.Input
            placeholder="title..."
            name="title"
            onChange={onChange}
            value={values.title}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="body..."
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Form.Input
            placeholder="Image Link..."
            name="img"
            onChange={onChange}
            value={values.img}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
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
  mutation createPost($title: String!, $img: String! ,$body: String!) {
    createPost(body: $body, title: $title, img: $img ) {
      id
      title
      img
      body
      createdAt
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

export default PostForm;