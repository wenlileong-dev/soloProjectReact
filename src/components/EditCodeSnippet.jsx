import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CodeEditor from "@uiw/react-textarea-code-editor";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";

import { config, getUserCookies, baseURL } from "./../routes";

const EditCodeSnippet = ({ open, handleClose, prevcode }) => {
  const [title, setTitle] = useState(prevcode.title);
  const [description, setDescription] = useState(prevcode.description);
  const [code, setCode] = useState(prevcode.code);
  const [tagName, setcodeTags] = useState(prevcode.tagName);
  const [tags, setTags] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "80%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    overflow: "scroll",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getAllTags = async () => {
    let result = await axios.get(`${baseURL}/code/tags`, config());
    if (result.status === 200) {
      setTags(result.data);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    let userId = getUserCookies();
    let codeSnippet = { title, description, code, tagName, userId };
    let result = await axios.put(
      `${baseURL}/code/my/${prevcode.id}`,
      codeSnippet,
      config()
    );
    if (result.status === 200 && result.data.status === "success") {
      window.location.reload(false);
    } else {
      setIsError(true);
      setErrorMsg(result.data.msg);
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form autoComplete="off" onSubmit={handleEdit}>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {isError && (
              <Alert severity="error" sx={{ width: "60%" }}>
                {errorMsg}
              </Alert>
            )}
            <Grid item xs={9}>
              <TextField
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
                options={tags.map((option) => option.name)}
                freeSolo
                defaultValue={tagName}
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
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditCodeSnippet;
