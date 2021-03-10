import { useCallback, useEffect, useState } from "react";
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


type Props = {
    //saveLocation: (location: ILocation | any) => void
}
export const LocationForm: React.FC<Props> = () => {

    let { locationId }: any = useRouteMatch('/location/edit/:topicId');//useParams();
    console.log("id url param:", locationId);

    const [curLocation, setLocation] = useState<ILocation>();

    //onDestroy
    useEffect(() => {
        return () => {
            setLocation(undefined);
        }
    }, []);
    //Hook Redux
    const locations = useSelector(
        (state: any) => state.locations as ILocation[]);
    
    const dispatch = useDispatch();

    //Initialize state
    useEffect(() => {

        var _location = locations.filter(l => l.id == locationId)[0];
        console.log("currentLocation", _location);
        setLocation(_location);

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
                    setLocation(values);
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
                    <button type="submit" disabled={!(curLocation && curLocation.id) ? true : false}>Save</button>
                    <button type="submit" disabled={!(curLocation === undefined || curLocation.id === 0) ? true : false}>Add</button>
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
