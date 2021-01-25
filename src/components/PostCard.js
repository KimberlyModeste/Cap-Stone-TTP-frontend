import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Button, Grid, Header, Divider, Image,Icon, Card, Label} from 'semantic-ui-react'
import { AuthContext } from '../context/auth';

import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import PopUp from '../util/PopUp';
import gql from 'graphql-tag';




function PostCard({
  post: {title, comments , body,img, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);
  return (
    <>

        <Card id = "templates" className = 'ui centered card'  style={{marginTop:"2rem",marginBottom:"2rem"}}>
          <Card.Content>
             <Image
            floated='left'
            size= 'tiny'
            src={img}
            circular
            />
            <Card.Header>{title}</Card.Header>
            <Card.Header>{username}</Card.Header>
            <Card.Meta as={Link} to={`/posts/${id}`}>
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