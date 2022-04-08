import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./App.css";
import { useLoadScript } from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { Layout } from "antd";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import PlaceTable from "./components/Table/PlaceTable";
import { PlacesContext } from "./contexts/PlacesContext";
import moment from "moment-timezone";

const libraries = ["places"];

const App = () => {
  const { isLoaded, loardError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [places, setPlaces] = useState("");
  const [timeZoneId, setTimeZoneId] = useState("");

  const [coordinates, setCoordinates] = useState({});
  const [localTime, setLocalTime] = useState("");
  const [currentInterval, setCurrentInterval] = useState(null);

  const { dispatch } = useContext(PlacesContext);

  useEffect(() => {
    clearInterval(currentInterval);
    const localIntervel = setInterval(() => {
      setLocalTime(moment.tz(timeZoneId).format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    setCurrentInterval(localIntervel);
  }, [timeZoneId]);

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

  const getTimezone = async (lat, lng) => {
    await axios
      .get(
        `https://dev.virtualearth.net/REST/v1/TimeZone/${lat},${lng}?key=${process.env.REACT_APP_BING_KEY}`
      )
      .then((res) => {
        const { data } = res;
        setTimeZoneId(
          data.resourceSets[0].resources[0].timeZone.ianaTimeZoneId
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSearch = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
    getTimezone(latLng.lat, latLng.lng);
    dispatch({
      type: "ADD_PLACE",
      place: value,
      coord: latLng,
    });
  };

  if (loardError) return "Error Loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <Layout className="container">
      {timeZoneId && (
        <div className="timeContainer">
          <div>{timeZoneId}</div>
          <div>{localTime}</div>
        </div>
      )}
      <Header
        places={places}
        setPlaces={setPlaces}
        getCurrentLocation={getCurrentLocation}
        handleSearch={handleSearch}
      />
      <div className="placesContainer">
        <div className="tableContainer">
          <PlaceTable />
        </div>

        <div className="mapContainer">
          <Map coordinates={coordinates} />
        </div>
      </div>
    </Layout>
  );
};

export default App;
