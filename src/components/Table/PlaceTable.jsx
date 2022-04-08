import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "antd";
import { PlacesContext } from "../../contexts/PlacesContext";
import "./Table.css";

const PlaceTable = () => {
  const [selectedPlace, setSelectedPlace] = useState([]);
  const [isPlaceEmpty, setIsPlaceEmpty] = useState(true);
  const { places, dispatch } = useContext(PlacesContext);
  const [data, setData] = useState(places);

  const columns = [
    {
      title: "Place",
      dataIndex: "place",
      key: "key",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedPlace(selectedRowKeys);
    },
  };
  useEffect(() => {
    setData(places);
  }, [places]);

  useEffect(() => {
    if (Object.keys(places).length !== 0) {
      setIsPlaceEmpty(false);
    }
  }, [places]);

  return (
    <div>
      <div className="tableSection">
        <Button
          type="primary"
          onClick={() =>
            dispatch({ type: "REMOVE_PLACE", keys: selectedPlace })
          }
          className="deleteButton"
          disabled={isPlaceEmpty}
        >
          Delete
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        className="placeTable"
      />
    </div>
  );
};

export default PlaceTable;
