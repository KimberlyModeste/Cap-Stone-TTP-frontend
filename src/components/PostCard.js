import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Form, Image, Card, Button, Icon} from 'semantic-ui-react'
import { AuthContext } from '../context/auth';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import gql from 'graphql-tag';

import { useMutation } from '@apollo/react-hooks';


function PostCard({
  post: {title, comments , body,img, createdAt, id, username, likeCount, likes }
}) {

  

  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');
  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      id,
      body: comment
    }
  })

  return (
    <>
        <Card id = "templates" className = 'ui centered card'  style={{marginTop:"2rem",marginBottom:"2rem"}}>
          <Card.Content>
             <Image
            floated='left'
            size= 'medium'
            src={img}
            circular
            />
            <Card.Header>{title}</Card.Header>
            <Card.Header as={Link} to={`/profile/${username}`} style={{color:"green"}}>{username}</Card.Header>
            <Card.Meta >
              {moment(createdAt).fromNow(true)}
            </Card.Meta>
            <Card.Description>
            <div>{body}</div>
            </Card.Description>
            <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            
            {user && user.username === username && <DeleteButton postId={id} />}

          </Card.Content>

          
          
           {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                     
                      <Button animated type="submit" color="green"
                       disabled={comment.trim() === ''}
                       onClick={submitComment}
                       >
                      <Button.Content visible>Submit</Button.Content>
                      <Button.Content hidden>
                      <Icon name='arrow right' />
                      </Button.Content>
                      </Button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}

          {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
            </Card.Content>
        </Card>
    </>
  );
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($id: String!, $body: String!) {
    createComment(postId: $id, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;


export default PostCard;