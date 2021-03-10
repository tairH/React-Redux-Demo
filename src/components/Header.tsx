import React, { useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { LocationContext } from "../contexts/LocationContext";

function Header() {

    
    const { location } = useContext(LocationContext);
    
    const [selectedLocation, setSelectedLocation] = useState(location);
    
    useEffect(() => {
        setSelectedLocation(location);
    }, [location])
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/locations">Locations</Link>
                        <ul>
                            <li>
                                <Link to={`/location/new`}>Add New Location</Link>
                            </li>
                           
                            {selectedLocation && (<>
                                <li><Link to={`/location/edit/${selectedLocation}`}>Edit </Link>  </li>
                                <li><Link to={`/location/delete/${selectedLocation}`}>Delete </Link>  </li></>
                            )}
                        </ul>
                    </li>

                </ul>
            </nav>
          
            </>
    );
}
export default Header;