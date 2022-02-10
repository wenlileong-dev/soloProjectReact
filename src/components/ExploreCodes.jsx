import React, { useState } from "react";
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
  const [isFavourite, setIsFavourite] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFavourite = () => {
    setIsFavourite(!isFavourite);
    // TODO add to favourite
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
              {props.code.codetags.map((tag) => {
                return <Chip label={tag} />;
              })}
            </Stack>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              {isFavourite ? (
                <FavoriteIcon onClick={handleFavourite} />
              ) : (
                <FavoriteBorderIcon onClick={handleFavourite} />
              )}
            </IconButton>
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
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default ExploreCodes;
