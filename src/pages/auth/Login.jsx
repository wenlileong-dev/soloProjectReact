import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";

import Signup from "./Signup";
import "./auth.css";

const Login = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    let user = { email, password };
    let result = await axios.post(
      "http://localhost:8088/codeSnippetManager/users/login",
      user
    );
    console.log(result.headers.authorization);
    console.log(result.headers.userid);
  };

  return (
    <React.Fragment>
      <Box
        sx={{ p: 5, border: "1px dashed grey", width: "60%" }}
        className="center"
      >
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
          >
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              fullWidth
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              fullWidth
            />
            <Button variant="text" onClick={handleOpen}>
              Create An Account
            </Button>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Box>
      <Signup open={open} handleClose={handleClose} />
    </React.Fragment>
  );
};

export default Login;
