import { Route, BrowserRouter, Switch } from "react-router-dom"
import './App.css';
import Landing from "./components/Landing";
import Home from "./components/Home";
import Form from "./components/Form";
import Details from "./components/Detail";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/form" component={Form} />
          <Route path="/detail/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
