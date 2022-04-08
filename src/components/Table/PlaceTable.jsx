import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "antd";
import { PlacesContext } from "../../contexts/PlacesContext";

const PlaceTable = () => {
  const [selectedPlace, setSelectedPlace] = useState([]);
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
