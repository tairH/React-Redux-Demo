import React, { useContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    matchPath,
    useParams,
    useLocation
} from "react-router-dom";
import { LocationContext } from "../contexts/LocationContext";

const Header = (props: any) => {


    const { location } = useContext(LocationContext);

    const [selectedLocation, setSelectedLocation] = useState(location);

    const matchEdit = useRouteMatch('/locations/:id/edit');
    //console.log("edit match", matchEdit);
    const matchAdd = useRouteMatch('/locations/new');
    //console.log("add match", matchEdit);

    const [editMatch, setEditMatch] = useState(matchEdit);
    const [addMatch, setAddMatch] = useState(matchAdd);

    const mathPath = useLocation();

    useEffect(() => {
        // The location has changed
        setEditMatch(matchEdit);
        setAddMatch(matchAdd);

    }, [mathPath])

    useEffect(() => {
        setSelectedLocation(location);
    }, [location]);

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
                        {addMatch?.isExact && 
                            <li>
                                 <Link to={`/locations/new`}>Add New Location</Link>
                            </li>}

                            {selectedLocation && (<>
                                {editMatch?.isExact && <li><Link to={`/locations/${selectedLocation}/edit`}>Edit </Link>  </li>}
                                <li><Link to={`/${selectedLocation}/delete`}>Delete </Link>  </li></>
                            )}
                        </ul>
                    </li>

                </ul>
            </nav>

        </>
    );
}
export default Header;