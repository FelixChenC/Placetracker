import { v4 as uuidv4 } from "uuid";

export const PlacesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PLACE":
      return [
        ...state,
        {
          place: action.place,
          coord: action.coord,
          key: uuidv4(),
        },
      ];
    case "REMOVE_PLACE":
      return state.filter((p) => !action.keys.includes(p.key));
    default:
      return state;
  }
};
