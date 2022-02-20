import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import ExploreTags from "../components/ExploreTags";
import ExploreCodes from "../components/ExploreCodes";

// import allCodes from "./../data/codesFile.json";
// import tags from "../data/tagsFile.json";

const MySnippet = ({ cookies }) => {
  let navigate = useNavigate();
  const [selectTagList, setSelectTagList] = useState([]);
  const [tags, setTags] = useState([]);
  const [allCodes, setAllCodes] = useState([]);

  let config = {
    headers: {
      Authorization: cookies.get("Authorization"),
    },
  };

  const getAllTags = async () => {
    let result = await axios.get(
      "http://localhost:8088/codeSnippetManager/code/tags",
      config
    );
    if (result.status === 200) {
      setTags(result.data);
    }
  };

  const getUserSnippets = async () => {
    let result = await axios.get(
      `http://localhost:8088/codeSnippetManager/code/my/${cookies.get(
        "UserID"
      )}`,
      config
    );
    if (result.status === 200) {
      setAllCodes(result.data);
    }
  };

  useEffect(() => {
    if (!cookies.get("UserID")) {
      navigate("/auth");
    } else {
      getAllTags();
      getUserSnippets();
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
          return (
            <ExploreCodes code={code} key={`explore: ${i}`} cookies={cookies} />
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default MySnippet;
