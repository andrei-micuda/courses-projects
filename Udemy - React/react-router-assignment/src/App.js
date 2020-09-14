import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';

import './App.css';
import Assignments from './components/Assignments';
import Users from './containers/Users/Users';
import Courses from './containers/Courses/Courses';

function App() {
  return (
    <Router>
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-evenly', padding: '0' }}>
          <li><Link to="/">Assignments</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/courses">Courses</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route path="/" exact component={Assignments} />
        <Route path="/users" exact component={Users} />
        <Route path="/courses" component={Courses} />
        <Redirect from="/all-courses" to="/courses" />
        <Route render={() => <p>Not found!</p>} />
      </Switch>
    </Router>
  );
}

export default App;
