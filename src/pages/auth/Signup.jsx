import React, { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { baseURL } from "./../../routes";

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

const Singup = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    let user = { username, email, password };
    let result = await axios.post(`${baseURL}/users`, user);
    if (result.status === 200) {
      clearInput();
      window.location.href = "/";
    }
  };

  const clearInput = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h1 className="center">Sign Up</h1>
        <form autoComplete="off" onSubmit={handleSignUp}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            mt={3}
          >
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              fullWidth
            />
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
            <Button variant="contained" type="submit">
              Sign Up
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default Singup;
