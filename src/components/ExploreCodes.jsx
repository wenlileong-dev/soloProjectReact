import React, { useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CodeEditor from "@uiw/react-textarea-code-editor";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import EditCodeSnippet from "./EditCodeSnippet";

import { config, getUserCookies } from "./../routes";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ExploreCodes = (props) => {
  const [expanded, setExpanded] = useState(false);
  // const [isFavourite, setIsFavourite] = useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const handleEditOpen = () => setEditOpen(true);
  const handleEditClose = () => setEditOpen(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavourite = async () => {
    if (!props.code.favourite) {
      let result = await axios.get(
        `http://localhost:8088/codeSnippetManager/code/favourite/${getUserCookies()}/${
          props.code.id
        }`,
        config()
      );
      if (result.status === 200) {
        window.location.href = "/explore";
      }
    } else {
      let result = await axios.delete(
        `http://localhost:8088/codeSnippetManager/code/favourite/${getUserCookies()}/${
          props.code.id
        }`,
        config()
      );
      if (result.status === 200) {
        window.location.href = "/explore";
      }
    }
  };

  const handleDelete = async () => {
    let result = await axios.delete(
      `http://localhost:8088/codeSnippetManager/code/my/${getUserCookies()}/${
        props.code.id
      }`,
      config()
    );
    if (result.status === 200) {
      window.location.href = "/mySnippet";
    }
  };
  return (
    <React.Fragment>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title={props.code.title} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {props.code.description}
            </Typography>
            <Stack direction="row" spacing={1}>
              {props.code.tagName.map((tag) => {
                return <Chip label={tag} />;
              })}
            </Stack>
          </CardContent>
          <CardActions disableSpacing>
            {props.code.currUserAuthor ? (
              <Stack
                spacing={3}
                direction="row"
                // justifyContent="center"
                // alignItems="center"
                // mt={3}
              >
                <Button
                  onClick={handleEditOpen}
                  size="small"
                  variant="contained"
                >
                  Update
                </Button>
                <Button onClick={handleDelete} size="small" variant="outlined">
                  Delete
                </Button>
              </Stack>
            ) : (
              <IconButton
                aria-label="add to favorites"
                onClick={handleFavourite}
              >
                {props.code.favourite ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            )}

            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <CodeEditor
                value={props.code.code}
                language="java"
                placeholder="Please enter java code"
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily:
                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                }}
              />
            </CardContent>
          </Collapse>
          <EditCodeSnippet
            open={editOpen}
            handleClose={handleEditClose}
            prevcode={props.code}
          />
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default ExploreCodes;
