import { createContext, useState, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";

const LocationContext = createContext({
    location: undefined,
    setLocation: (newLocation:any) => {},
  });


const LocationDataContextProvider = ({ children }: any) => {
/*
  let { locationId }: any = useParams();
  let currentLocation = !(locationId.isNan()&&locationId!=undefined)?locationId:undefined;
  console.log(currentLocation);*/

    const [location, _setLocation] = useState(undefined);
    const setLocation = (newLocation:any) => _setLocation(newLocation);
    
    return (
        <LocationContext.Provider value={{
            location,
            setLocation,
          }}>
            {children}
        </LocationContext.Provider>
    );
};

export { LocationContext, LocationDataContextProvider };