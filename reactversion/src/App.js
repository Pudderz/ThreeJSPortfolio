import './App.css';
import Test from './Components/canvas';
import BlogPage from './pages/BlogPage'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from './Components/About';
import { GlobalProvider  } from "./contexts/GlobalContext";



function App() {


  
  return (
    <GlobalProvider>
    <div className="App" data-barba="container">
    <Router>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/contact" exact component={BlogPage} />
        <Route path="/about" exact component={About} />
        {/* <Route path="/test" exact component={TestPa} /> */}
      </Switch>
    </Router>
  </div>
  </GlobalProvider>
  );
}

export default App;
