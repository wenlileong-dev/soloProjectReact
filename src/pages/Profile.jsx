import React, { useState, useEffect } from "react";
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

const Profile = ({ cookies }) => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("UserID")) {
      navigate("/auth");
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
    if (password.newPassword === password.repeatNewPassword) {
      console.log(password);
    } else {
      console.log("password not match");
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
              defaultValue="useremail"
            />
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
