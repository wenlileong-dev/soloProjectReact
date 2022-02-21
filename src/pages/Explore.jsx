import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
// import allCodes from "./../data/codesFile.json";

import ExploreCodes from "../components/ExploreCodes";
import Grid from "@mui/material/Grid";
// import tags from "../data/tagsFile.json";
import Stack from "@mui/material/Stack";
import ExploreTags from "../components/ExploreTags";

import { config, getUserCookies } from "./../routes";

const Explore = () => {
  let navigate = useNavigate();
  const [selectTagList, setSelectTagList] = useState([]);
  const [allCodes, setAllCodes] = useState([]);
  const [tags, setTags] = useState([]);

  const getAllTags = async () => {
    let result = await axios.get(
      "http://localhost:8088/codeSnippetManager/code/tags",
      config()
    );
    if (result.status === 200) {
      setTags(result.data);
    }
  };

  const getAllCodes = async (selectTagList) => {
    let result = await axios.post(
      "http://localhost:8088/codeSnippetManager/code/all",
      { tagName: selectTagList, userId: getUserCookies() },
      config()
    );
    if (result.status === 200) {
      // console.log(selectTagList);
      setAllCodes(result.data);
      console.log(result.data);
    }
  };

  useEffect(() => {
    // console.log(cookies.get("UerID"));
    if (!getUserCookies()) {
      navigate("/auth");
    } else {
      getAllTags();
      getAllCodes(selectTagList);
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

export default Explore;
