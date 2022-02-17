import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const NavigationBar = ({ cookies }) => {
  const handleLogout = () => {
    cookies.remove("Authorization");
    cookies.remove("UserID");
    window.location.href = "/";
  };
  return (
    <div role="presentation" onClick={handleClick}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={9}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/explore">Explore</Link>
            <Link to="/create">New</Link>
            <Link to="/mySnippet">My Snippets</Link>
            <Link to="/profile">Profile</Link>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default NavigationBar;
