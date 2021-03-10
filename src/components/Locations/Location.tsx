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
import { ILocation, LocationsState } from "../../store/actions";
import {remove} from '../../store/location.reducer';


type Props = {
    //location: ILocation
    //removeLocation: (location: ILocation) => void
}

export const Location: React.FC<Props> = (/*{ location: ILocation
    , removeLocation }*/) => {
    
    let { locationId }: any = useParams();
    const { setLocation } = useContext(LocationContext);
    
    const [currentLocation,setCurLocation] = useState<ILocation | undefined>(undefined);

    useEffect(() => {
        return () => {
            setLocation(undefined);
        }
    }, []);
    
    const locations = useSelector(
        (state:any) => state.locations as ILocation[]);
    
        console.log("id url param:",locationId);
    

    useEffect(() => {
        setLocation(locationId);

        var _location = locations.filter(l=>l.id==locationId)[0];
        console.log("currentLocation",_location);
        setCurLocation(_location);

    }, [locationId]);
    
    const dispatch: Dispatch<any> = useDispatch();

    const deleteLocation = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(remove(currentLocation));
    };
    
    /**/

    //userffect fetch topicId
    return (
    <>
        {currentLocation && (
            <>
        <div className="Location">
            <div>
                <h1>Location {currentLocation.id}</h1>
                <p>{currentLocation.description}</p>
            </div>
            <button onClick={deleteLocation}>Delete</button>
        </div>
        </>)}
    </>);
}