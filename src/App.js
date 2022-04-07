import React, { useState, useEffect } from "react";
import "./App.css";
import { useLoadScript } from "@react-google-maps/api";

import { Layout } from "antd";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import PlaceTable from "./components/Table/PlaceTable";
import PlacesContextProvicer from "./contexts/PlacesContext";
import moment from "moment-timezone";

const libraries = ["places"];

const App = () => {
  const [places, setPlaces] = useState([]);
  const [searchPlaces, setSearchPlaces] = useState([]);
  const [timeZoneId, setTimeZoneId] = useState("");

  const [coordinates, setCoordinates] = useState({});
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      setLocalTime(moment.tz(timeZoneId).format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
  }, []);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const { isLoaded, loardError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loardError) return "Error Loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Layout style={{ minHeight: "100vh", maxWidth: "100vw" }}>
      <PlacesContextProvicer>
        {timeZoneId && (
          <div
            style={{
              position: "absolute",
              top: "4vh",
              right: "3rem",
              zIndex: "5",
            }}
          >
            <div>{timeZoneId}</div>
            <div>{localTime}</div>
          </div>
        )}
        <Header
          timeZoneId={timeZoneId}
          setTimeZoneId={setTimeZoneId}
          searchPlaces={searchPlaces}
          setSearchPlaces={setSearchPlaces}
          places={places}
          setPlaces={setPlaces}
          getCurrentLocation={getCurrentLocation}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
        <div style={{ display: "flex" }}>
          <div style={{ width: "30vw", height: "80vh", margin: "0 1rem" }}>
            <PlaceTable searchPlaces={searchPlaces} />
          </div>

          <div style={{ width: "70vw", height: "80vh", marginLeft: "1rem" }}>
            <Map coordinates={coordinates} timeZoneId={timeZoneId} />
          </div>
        </div>
      </PlacesContextProvicer>
    </Layout>
  );
};

export default App;
