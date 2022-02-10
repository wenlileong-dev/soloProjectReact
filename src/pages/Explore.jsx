import React, { useState, useEffect } from "react";
import NavigationBar from "../components/nav/NavigationBar";
import allCodes from "./../data/codesFile.json";

import ExploreCodes from "../components/ExploreCodes";
import Grid from "@mui/material/Grid";
import tags from "../data/tagsFile.json";
import Stack from "@mui/material/Stack";
import ExploreTags from "../components/ExploreTags";

const Explore = () => {
  const [selectTagList, setSelectTagList] = useState([]);

  useEffect(() => {
    console.log(selectTagList);
  }, [selectTagList]);

  const addTag = (tag) => {
    setSelectTagList([...selectTagList, tag]);
  };

  const removeTag = (tag) => {
    setSelectTagList(selectTagList.filter((tagInList) => tag !== tagInList));
  };

  return (
    <React.Fragment>
      <NavigationBar />
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
