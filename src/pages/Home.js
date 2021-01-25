import React, { useContext, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { Grid,  Divider} from 'semantic-ui-react'
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import {connect} from 'react-redux'
import { SAVE_ALL_POSTS } from '../redux/actions';

let Globalposts =[]


const  Home = ({posts = [], save}) => {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: postsFromDB } = {}
    } = useQuery(FETCH_POSTS_QUERY);


  useEffect(() => {
    Globalposts = postsFromDB
    save({type: SAVE_ALL_POSTS })
    })


  return (
    <>
    <div>
      <Grid.Row className="page-title">
        <h1>Trending.....</h1>
      </Grid.Row>
      <Divider section />
      <Grid.Column centered columns={4}>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : ( 
          <>
            { console.log(posts),
              posts.map((post) => (
                
                <div key={post.id}  >
                  <Grid>
                  <PostCard post={post} />
                  </Grid>
                </div>
              ))}
          </> 
          
        )}
      </Grid.Column>
    </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => (console.log("state is: ",state),{
  posts: state.posts
});
const mapDispatchToProps = (dispatch) => { 
  return {
     save: () => dispatch({ type:SAVE_ALL_POSTS, payload:Globalposts}),
     }
 }
export default connect(mapStateToProps, mapDispatchToProps)(Home);