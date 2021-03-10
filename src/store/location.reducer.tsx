import { createReducer, createSlice } from '@reduxjs/toolkit';
import { Reducer } from 'react';
import { ILocation, LocationsState } from './actions'


export const initialLocationState: ILocation[] =
    [
        {
            id: 1,
            title: "first Location",
            description: "Post on first Location"
        }, {
            id: 2,
            title: "second Location",
            description: "Post on second Location"
        }
    ];

export const locationsSlice = createSlice({
    name: 'locationsSlice',
    initialState: initialLocationState,
    reducers: {
        add: (state, action) => {
            const newLocation: ILocation = {
                id: Math.random(), // not really unique
                description: action.payload.description,
                title: action.payload.title
            }
            return state.concat(newLocation);
        },
        remove: (state, action) => {
            const updatedLocations: ILocation[] = state.filter(
                location => location.id !== action.payload.id
            )
            return updatedLocations;
        },
        update: (state, action) => {
            const updatedLocations: ILocation[] = state.map(
                location => {
                    const locationToUpdate = location.id === action.payload.id ?
                        action.payload :
                        location;
                    return locationToUpdate;
                }
            )
            return updatedLocations;
        }
    }/*,
    // default reducer
    (state,action) => {
         return state;
    }*/
})
// Action creators are generated for each case reducer function
export const { add, remove, update } = locationsSlice.actions;

export type LocationsReducerState = ReturnType<typeof locationsSlice.reducer>

export default locationsSlice.reducer;

