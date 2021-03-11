import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Header from './components/Header';
import About from './components/About';
import Home from './components/Home';
import Locations from './components/Locations/Locations';
import { LocationContext, LocationDataContextProvider } from './contexts/LocationContext';
import { Location } from './components/Locations/Location'
import { LocationForm } from "./components/Locations/LocationForm";
function App() {

  return (

    <div>

      <LocationDataContextProvider>
        <Router>
          <Header />
          <Switch>

            <Route path="/locations">
              <Locations />
            </Route>
            {/*<Route path={`${match.path}/edit/:topicId`}>
              <LocationForm />
            </Route>
            <Route path={`${match.path}/read/:topicId`}>
              <About />
  </Route>
            <Route path="/locations/new">
              <LocationForm />
            </Route>*/}
            <Route path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Router>

      </LocationDataContextProvider>
    </div >

  );
}

export default App;




function EditTopic() {
  let { topicId }: any = useParams();
  return <input type="text" name="" placeholder={`edit topic  ${topicId}`} id="" />;
}

function AddTopic() {
  return <input type="text" name="" id="" />;
}