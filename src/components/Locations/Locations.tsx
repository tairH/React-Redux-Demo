import React, { Dispatch, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { LocationContext } from "../../contexts/LocationContext";
import { ILocation } from "../../store/actions";
import  { LocationsReducerState, locationsSlice } from '../../store/location.reducer';

import { Location } from './Location';
import { LocationForm } from './LocationForm';

function Locations() {

  const { setLocation } = useContext(LocationContext);

  useEffect(() => {
    setLocation(undefined);
  }, [])

  let match = useRouteMatch();

  
  const _locations = useSelector(
    //(state) => state.locations
    (state: any) => state.locations as ILocation[]
  );
console.log("locatioms from redux",_locations);
  //const dispatch: Dispatch<any> = useDispatch()



  return (
    <div>
      <h2>Locations</h2>
      <ul>
        {_locations && _locations &&
          _locations.map(l => {
            return <li key={l.id}>
              <Link to={`${match.url}/${l.id}/read`}>{l.description}</Link></li>;
          })}
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:locationId/read`}>
          <Location />
        </Route>
        <Route path={`${match.path}/:locationId/edit`}>
          <LocationForm />
        </Route>
        <Route path={`${match.path}/new`}>
          <LocationForm />
        </Route>
        <Route path={match.path}>
          <h3>Please select a location.</h3>
        </Route>
      </Switch>
    </div>
  );
}
export default Locations;