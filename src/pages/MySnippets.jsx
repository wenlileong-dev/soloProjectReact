import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import ExploreTags from "../components/ExploreTags";
import ExploreCodes from "../components/ExploreCodes";

import allCodes from "./../data/codesFile.json";
import tags from "../data/tagsFile.json";

const MySnippet = ({ cookies }) => {
  let navigate = useNavigate();
  const [selectTagList, setSelectTagList] = useState([]);

  // TODO GET Request to get all code snippets created by user or is saved by the user

  useEffect(() => {
    if (!cookies.get("UserID")) {
      navigate("/auth");
    }
    console.log(selectTagList);
    // TODO GET Request to filter code snippets by selected tags
  }, [selectTagList]);
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

export default MySnippet;
