import React, { useContext } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { PlacesContext } from "../../contexts/PlacesContext";

const Map = ({ coordinates }) => {
  const { places } = useContext(PlacesContext);

  return (
    <div style={{ height: "100%", width: "95%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {places &&
          places.map((place) => (
            <Marker
              key={place.key}
              lat={place.coord.lat}
              lng={place.coord.lng}
              text={"marker"}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
