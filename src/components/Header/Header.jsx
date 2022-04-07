import React, { useEffect, useContext } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { PageHeader, Input } from "antd";
import { AimOutlined } from "@ant-design/icons";
import { PlacesContext } from "../../contexts/PlacesContext";

const { Search } = Input;

const Header = ({
  places,
  setPlaces,
  searchPlaces,
  setSearchPlaces,
  getCurrentLocation,
  setCoordinates,
  setTimeZoneId,
}) => {
  const { dispatch } = useContext(PlacesContext);

  const handleChange = async (value) => {
    setPlaces(value);
  };

  const handleSelect = async (value) => {
    setPlaces(value);
  };

  const getTimezone = (lat, lng) => {
    axios
      .get(
        `https://dev.virtualearth.net/REST/v1/TimeZone/${lat},${lng}?key=${process.env.REACT_APP_BING_KEY}`
      )
      .then((res) => {
        const { data } = res;
        setTimeZoneId(
          data.resourceSets[0].resources[0].timeZone.ianaTimeZoneId
        );
      });
  };

  const handleSearch = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
    const searchInput = { place: value };
    setSearchPlaces([...searchPlaces, searchInput]);
    getTimezone(latLng.lat, latLng.lng);
    dispatch({
      type: "ADD_PLACE",
      place: value,
      coord: latLng,
    });
  };

  useEffect(() => {
    localStorage.setItem("places", JSON.stringify(searchPlaces));
  }, [searchPlaces]);

  return (
    <div style={{ margin: "20px" }}>
      <PageHeader
        className="site-page-header"
        title="Track places"
        subTitle="Saving searched placed on the table"
      />
      <PlacesAutocomplete
        value={places}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Search
              {...getInputProps({
                placeholder: "Search a place",
              })}
              allowClear
              enterButton="Search"
              size="large"
              suffix={
                <AimOutlined
                  onClick={(e) => {
                    getCurrentLocation();
                  }}
                />
              }
              value={places}
              onSearch={handleSearch}
              style={{ margin: "0 1rem", width: "94.8vw" }}
            />
            <div style={{ margin: " 0 1rem", width: "94.8vw" }}>
              {loading && <div>Loading ...</div>}
              {suggestions.map((suggestion) => {
                const style = suggestion.active
                  ? { backgroundColor: "#1890ff", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Header;
