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

const EditCodeSnippet = ({ open, handleClose, cookies, prevcode }) => {
  const [title, setTitle] = useState(prevcode.title);
  const [description, setDescription] = useState(prevcode.description);
  const [code, setCode] = useState(prevcode.code);
  const [tagName, setcodeTags] = useState(prevcode.tagName);
  const [tags, setTags] = useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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

  const handleEdit = async (e) => {
    e.preventDefault();
    let userId = cookies.get("UserID");
    let codeSnippet = { title, description, code, tagName, userId };
    let result = await axios.put(
      `http://localhost:8088/codeSnippetManager/code/my/${prevcode.id}`,
      codeSnippet,
      config
    );
    if (result.status === 200) {
      window.location.href = "/mySnippet";
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form autoComplete="off" onSubmit={handleEdit}>
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
