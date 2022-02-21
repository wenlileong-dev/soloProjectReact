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
import { config, getUserCookies } from "./../routes";

const MySnippet = () => {
  let navigate = useNavigate();
  const [selectTagList, setSelectTagList] = useState([]);
  const [tags, setTags] = useState([]);
  const [allCodes, setAllCodes] = useState([]);

  const getAllTags = async () => {
    let result = await axios.get(
      "http://localhost:8088/codeSnippetManager/code/tags",
      config()
    );
    if (result.status === 200) {
      setTags(result.data);
    }
  };

  const getUserSnippets = async (selectTagList) => {
    let result = await axios.post(
      `http://localhost:8088/codeSnippetManager/code/my/${getUserCookies()}`,
      { tagName: selectTagList, userId: getUserCookies() },
      config()
    );
    if (result.status === 200) {
      setAllCodes(result.data);
    }
  };

  useEffect(() => {
    if (!getUserCookies()) {
      navigate("/auth");
    } else {
      getAllTags();
      getUserSnippets(selectTagList);
    }
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

export default MySnippet;
