import React from "react";
import propTypes from "prop-types";
import PlacesAutocomplete from "react-places-autocomplete";
import { PageHeader, Input } from "antd";
import { AimOutlined } from "@ant-design/icons";

const { Search } = Input;

const Header = ({ places, setPlaces, getCurrentLocation, handleSearch }) => {
  const handleChange = async (value) => {
    setPlaces(value);
  };

  const handleSelect = async (value) => {
    setPlaces(value);
  };

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
                  onClick={() => {
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
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={suggestion.description}
                  >
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
