import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import NavigationBar from "../components/nav/NavigationBar";
import ExploreCodes from "../components/ExploreCodes";
import ExploreTags from "../components/ExploreTags";
import { config, getUserCookies, baseURL } from "./../routes";

const Explore = () => {
  let navigate = useNavigate();
  const [selectTagList, setSelectTagList] = useState([]);
  const [allCodes, setAllCodes] = useState([]);
  const [tags, setTags] = useState([]);

  const getAllTags = async () => {
    let result = await axios.get(`${baseURL}/code/tags`, config());
    if (result.status === 200) {
      setTags(result.data);
    }
  };

  const getAllCodes = async (selectTagList) => {
    let result = await axios.post(
      `${baseURL}/code/all`,
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
      getAllCodes(selectTagList);
    }
  }, [selectTagList, navigate]);

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
        {tags.map((tag, i) => {
          return (
            <ExploreTags
              tag={tag.name}
              addTag={addTag}
              removeTag={removeTag}
              key={`exploreTag: ${i}`}
            />
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
