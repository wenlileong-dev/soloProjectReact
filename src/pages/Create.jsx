import React, { useState } from "react";
import NavigationBar from "../components/nav/NavigationBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

var tags = require("./../data/tagsFile.json");

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState(`System.out.println("Hello World")`);
  const [codetags, setcodeTags] = useState([]);

  const createCodeSnippet = async (e) => {
    e.preventDefault();
    let codeSnippet = { title, description, code, codetags };
    let stringi = JSON.stringify(codeSnippet);
    console.log(stringi);
  };

  return (
    <React.Fragment>
      <NavigationBar />
      <Box sx={{ flexGrow: 1 }} mt={3}>
        <form onSubmit={createCodeSnippet} autoComplete="off">
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <CodeEditor
                value={code}
                language="java"
                placeholder="Please enter java code"
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                multiple
                id="tags-filled"
                options={tags.map((option) => option.name)}
                freeSolo
                onChange={(e, v) => {
                  setcodeTags(v);
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    label="Tags"
                    placeholder="tags"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" type="submit">
                Created
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default Create;
