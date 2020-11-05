import './App.css';
import Test from './Components/canvas';
import BlogPage from './Components/BlogPage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './Components/About';




function App() {

  return (
    <div className="App" data-barba="container">
    <Router>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/contact" exact component={BlogPage} />
        <Route path="/about" exact component={About} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;
