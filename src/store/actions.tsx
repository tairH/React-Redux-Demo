
export interface ILocation {
    id: number;
    title:string;
    description: string | null;
}

export interface LocationsState {
    locations: ILocation[];
}
/*
export type LocationAction = { type:string; payload: ILocation  };

export const addLocation = (location: ILocation): LocationAction => {
    return ({
        type: "ADD_Location",
        payload: location,
    });
};
export const removeLocation = (location: ILocation): LocationAction => {
    return ({
        type: "REMOVE_Location",
        payload: location,
    });
};
export const updateLocation = (location: ILocation): LocationAction => {
    return ({
        type: "UPDATE_Location",
        payload: location,
    });
};
*/