import React, { useContext, useRef, useState, useMutation } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Button, Grid, Header, Form, Divider, Image,Icon, Card, Label} from 'semantic-ui-react'
import { AuthContext } from '../context/auth';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import PopUp from '../util/PopUp';
import gql from 'graphql-tag';




function PostCard({
  post: {title, comments , body,img, createdAt, id, username, likeCount, commentCount, likes }
}) {


  const { user } = useContext(AuthContext);

  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');
  
  // const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
  //   update() {
  //     setComment('');
  //     commentInputRef.current.blur();
  //   },
  //   variables: {
  //     id,
  //     body: comment
  //   }
  // })

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
            <Card.Header as={Link} to={{
  pathname: '/Profile',
  search: 'username',
  hash: '#the-hash',
  state: { fromDashboard: true }
}} style={{color:"green"}}>{username}</Card.Header>
            <Card.Meta >
              {moment(createdAt).fromNow(true)}
            </Card.Meta>
            <Card.Description>
            <div>{body}</div>
            </Card.Description>
            <Card.Content extra>
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <PopUp content="Comment on post">
              <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                <Button color="blue" basic>
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
            </PopUp>
            {user && user.username === username && <DeleteButton postId={id} />}

          </Card.Content>

          
          {/* commenting on a post
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
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )} */}

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
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
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