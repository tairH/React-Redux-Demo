import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import { ILocation } from "../../store/actions";
import { add, remove, update } from '../../store/location.reducer';
import * as Yup from 'yup';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik';
import { LocationContext } from "../../contexts/LocationContext";


type Props = {
    //saveLocation: (location: ILocation | any) => void
}
export const LocationForm: React.FC<Props> = () => {

    let { locationId }: any = useParams();//useRouteMatch('/location/edit/:topicId');
    //console.log("id url param:", locationId);
    const { setLocation } = useContext(LocationContext);
    const [curLocation, setLocationState] = useState<ILocation>();

    //onDestroy
    useEffect(() => {
        return () => {
            setLocation(undefined);
            setLocationState(undefined);
        }
    }, []);
    //Hook Redux
    const locations = useSelector(
        (state: any) => state.locations as ILocation[]);

    const dispatch = useDispatch();

    //Initialize state
    useEffect(() => {
        setLocation(locationId);
        var _location = locations.filter(l => l.id == locationId)[0];
        console.log("currentLocation", _location);
        setLocationState(_location);

    }, [locationId]);

    //Form Validation Schema
    const LocationSchema = Yup.object({
        id: Yup.number().nullable(),
        title: Yup.string(),
        description: Yup.string().nullable().notRequired()
    });
    type ILocation = Yup.InferType<typeof LocationSchema>;



    return (
        <div>
            <h2>Location Form</h2>
            {console.log('current state:', curLocation)}
            <Formik
                initialValues={curLocation ?? {} as ILocation}
                validationSchema={LocationSchema}
                enableReinitialize={true}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    setLocationState(values);
                    if (!(curLocation && curLocation.id)) {
                        dispatch(add(values));
                    }
                    else {
                        dispatch(update(values));
                    }
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                <Form className="p-5">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="Enter Location Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <Field as="textarea" id="description" name="description" placeholder="Enter Localized Post" />
                    </div>
                    {((curLocation && curLocation.id) ? true : false) && <button type="submit" >Save</button>}
                    {((curLocation === undefined || curLocation.id === 0) ? true : false) && <button type="submit">Add</button>}
                </Form>
            </Formik>

        </div>
    );
}
/*
 <form onSubmit={addNewLocation} >
 <input required type="text" id="description" placeholder="Enter Location Title" onChange={handleLocationData} /><br /><br />
 <textarea required rows={5} cols={28} placeholder="Enter Localized Post" /><br /><br />
 <button disabled={!(curLocation === undefined  || curLocation.id === 0)? true : false} onClick={addNewLocation}>Add</button>
 <button disabled={(curLocation && curLocation.id !== 0)? true : false} onClick={saveLocation}>Save</button>
</form>


    const handleLocationData = (e: React.FormEvent<HTMLInputElement>) => {
        if (curLocation) {
            setLocation({
                ...curLocation,
                [e.currentTarget.id]: e.currentTarget.value,
            })
        }
        else {
            const loc: ILocation = { id: 0, title: '', description: '' };
            setLocation({
                ...loc,
                [e.currentTarget.id]: e.currentTarget.value
            } as ILocation)
        }
    }

    const addNewLocation = (e: React.FormEvent) => {
        e.preventDefault();
        if (curLocation) {
            dispatch(add(curLocation));
        }
    }

    const saveLocation = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(curLocation);
        if (curLocation) {
            dispatch(update(curLocation));
        }
    }
 */
