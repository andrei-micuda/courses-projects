import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import classes from './Posts.module.css';

class Posts extends Component {
  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('/posts')
      .then(res => {
        this.setState({ posts: res.data.slice(0, 4) })
      })
      .catch(err => {
        console.log(err);
      });
  }

  postSelectedHandler = id => {
    this.props.history.push({ pathname: '/posts/' + id });
  };

  render() {
    return (
      <div>
        <section className={classes.Posts}>
          {this.state.posts.map(post => (
            // <Link to={'/posts/' + post.id} key={post.id}>
            <Post
              title={post.title}
              key={post.id}
              clicked={() => this.postSelectedHandler(post.id)} />
            // </Link>
          ))}
        </section>

        <Route path={this.props.match.url + "/:id"} exact component={FullPost} />

      </div>
    );
  }
}

export default Posts;