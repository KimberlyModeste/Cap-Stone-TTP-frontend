import './App.css';
import MenuBar from './components/MenuBar';
import {Container} from 'semantic-ui-react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import UsersPage from './components/UsersPage'
import Home from './components/Home'


function App() {
  return (
    <div className="App">
      <Container>
      <Router>
      <MenuBar/>
      <Route export path ='/' component={Home} />
      <Route export path ='/users' component={UsersPage} />
      </Router>
      </Container>
    </div>
  );
}

export default App;
