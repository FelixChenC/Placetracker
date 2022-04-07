import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "antd";
import { PlacesContext } from "../../contexts/PlacesContext";

const columns = [
  {
    title: "Place",
    dataIndex: "place",
  },
];

const PlaceTable = ({ searchPlaces }) => {
  const [selectedPlace, setSelectedPlace] = useState([]);
  const { places } = useContext(PlacesContext);
  const [data, setData] = useState(places);
  const { dispatch } = useContext(PlacesContext);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedPlace(selectedRowKeys);
    },
  };
  useEffect(() => {
    setData(places);
  }, [places]);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() =>
            dispatch({ type: "REMOVE_PLACE", keys: selectedPlace })
          }
          style={{ margin: "1rem 0 0 1rem" }}
        >
          Delete
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        style={{ marginLeft: "1rem" }}
      />
    </div>
  );
};

export default PlaceTable;
