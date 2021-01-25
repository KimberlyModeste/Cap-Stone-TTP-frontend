import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {Button, Grid, Header, Divider, Image,Icon, Card, Modal, Form, Container} from 'semantic-ui-react'
import { AuthContext } from '../context/auth';




function PostCard({
  post: {title,causes, body,img, createdAt, id, username, likeCount, commentCount, likes }
}) {
  const { user } = useContext(AuthContext);
  return (
    <>

        <Card id = "templates" className = 'ui centered card'>
          <Card.Content>
             <Image
            floated='left'
            size= 'tiny'
            src={img}
            circular
            />
            <Card.Header>{title}</Card.Header>
            <Card.Meta>{username}</Card.Meta>
            <Card.Description>
            <div>{body}</div>
            </Card.Description>
            </Card.Content>
        </Card>
    </>
  );
}

export default PostCard;