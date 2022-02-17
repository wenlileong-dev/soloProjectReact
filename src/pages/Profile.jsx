import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../components/nav/NavigationBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";

const Profile = ({ cookies }) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  let config = {
    headers: {
      Authorization: cookies.get("Authorization"),
    },
  };

  const getUserDetails = async () => {
    let result = await axios.get(
      `http://localhost:8088/codeSnippetManager/users/${cookies.get("UserID")}`,
      config
    );
    if (result.status === 200) {
      setEmail(result.data.email);
    } else {
      cookies.remove("Authorization");
      cookies.remove("UserID");
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (!cookies.get("UserID")) {
      navigate("/auth");
    } else {
      getUserDetails();
    }
  }, []);

  const [password, setPassword] = useState({
    currPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const [passwordVisibly, setPasswordVisibly] = useState({
    showCurrPassword: false,
    showNewPassword: false,
    showRepeatNewPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => (event) => {
    setPasswordVisibly({ ...passwordVisibly, [prop]: !passwordVisibly[prop] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    let result = await axios.put(
      `http://localhost:8088/codeSnippetManager/users/${cookies.get("UserID")}`,
      password,
      config
    );
    setPassword({
      currPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    });
    if (result.data.status === "success") {
      window.location.href = "/profile";
    } else {
      setError(true);
      setErrorMsg(result.data.msg);
    }
  };
  return (
    <React.Fragment>
      <NavigationBar cookies={cookies} />
      <h1>Profile</h1>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <form onSubmit={handlePassword}>
          <Stack spacing={3} justifyContent="center" alignItems="center">
            <TextField
              disabled
              id="outlined-disabled"
              label="Email"
              value={email}
            />
            {isError && (
              <Alert severity="error" sx={{ width: "50ch" }}>
                {errorMsg}
              </Alert>
            )}

            <FormControl sx={{ m: 2, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Current Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={passwordVisibly.showCurrPassword ? "text" : "password"}
                value={password.currPassword}
                onChange={handleChange("currPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("showCurrPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordVisibly.showCurrPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <FormControl sx={{ m: 2, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={passwordVisibly.showNewPassword ? "text" : "password"}
                value={password.newPassword}
                onChange={handleChange("newPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("showNewPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordVisibly.showNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl sx={{ m: 2, width: "50ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Repeat New Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={
                  passwordVisibly.showRepeatNewPassword ? "text" : "password"
                }
                value={password.repeatNewPassword}
                onChange={handleChange("repeatNewPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("showRepeatNewPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {passwordVisibly.showRepeatNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Stack>
        </form>
      </Box>
    </React.Fragment>
  );
};

export default Profile;
