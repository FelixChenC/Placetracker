import React, { createContext, useEffect, useReducer } from "react";
import { PlacesReducer } from "../reducers/PlacesReducers";

export const PlacesContext = createContext();

const PlacesContextProvicer = (props) => {
  const [places, dispatch] = useReducer(PlacesReducer, [], () => {
    const localData = localStorage.getItem("places");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(places));
  }, [places]);

  return (
    <PlacesContext.Provider value={{ places, dispatch }}>
      {props.children}
    </PlacesContext.Provider>
  );
};

export default PlacesContextProvicer;
