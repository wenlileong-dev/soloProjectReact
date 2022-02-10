import React, { useState } from "react";
import Chip from "@mui/material/Chip";

const ExploreTags = (props) => {
  const [isTagSelect, setTagSelect] = useState("outlined");

  const handleClick = (name) => {
    props.addTag(name);
    setTagSelect("filled");
  };

  const handleDelete = (name) => {
    props.removeTag(name);
    setTagSelect("outlined");
  };
  return (
    <Chip
      label={props.tag}
      variant={isTagSelect}
      onClick={() => {
        handleClick(props.tag);
      }}
      onDelete={() => {
        handleDelete(props.tag);
      }}
    />
  );
};

export default ExploreTags;
