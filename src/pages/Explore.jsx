import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import allCodes from "./../data/codesFile.json";

import ExploreCodes from "../components/ExploreCodes";
import Grid from "@mui/material/Grid";
import tags from "../data/tagsFile.json";
import Stack from "@mui/material/Stack";
import ExploreTags from "../components/ExploreTags";

const Explore = ({ cookies }) => {
  let navigate = useNavigate();
  const [selectTagList, setSelectTagList] = useState([]);

  // TODO GET Request to get all code snippets which are public

  useEffect(() => {
    console.log(cookies.get("UerID"));
    if (!cookies.get("UserID")) {
      navigate("/auth");
    }
    console.log(selectTagList);
    // TODO GET Request to filter code snippets by selected tags
  }, [selectTagList, cookies]);

  const addTag = (tag) => {
    setSelectTagList([...selectTagList, tag]);
  };

  const removeTag = (tag) => {
    setSelectTagList(selectTagList.filter((tagInList) => tag !== tagInList));
  };

  return (
    <React.Fragment>
      <NavigationBar cookies={cookies} />
      <Stack direction="row" spacing={2} mt={3} mb={3}>
        {tags.map((tag) => {
          return (
            <ExploreTags tag={tag.name} addTag={addTag} removeTag={removeTag} />
          );
        })}
      </Stack>
      <Grid container spacing={2}>
        {allCodes.map((code, i) => {
          return <ExploreCodes code={code} key={`explore: ${i}`} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default Explore;
