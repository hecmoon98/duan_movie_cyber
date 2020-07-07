import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import * as action from "./../../redux/action";
import { connect } from "react-redux";
import Facebook from './../../component/facebook';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
function SignIn(props) {

  const classes = useStyles();

  useEffect(() => {
    // component will mao
    props.postDangNhap()
  }, []);

  const [taiKhoan, settaiKhoan] = useState({
    "taiKhoan": "string",
  });
  const [matKhau, setmatKhau] = useState({
    "matKhau": "string"
  });







  const handleClick = (e)=>{
    e.preventDefault();
  let user = {
    taiKhoan,
    matKhau
  }
    console.log(user)

    props.postDangNhap(user, props.history);

  }



  return (
    <div style={{ marginTop: "150px" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="taiKhoan"
              autoComplete="email"
              autoFocus
              onChange={e=>{settaiKhoan(e.target.value)}}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="matKhau"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>{setmatKhau(e.target.value)}}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={ handleClick }
            >
              Sign In
            </Button>
            <Facebook/>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}



const mapDispatchToProps = dispatch => {
    return {
      postDangNhap: (user, history,keyLink) => {
        dispatch(action.actDangNhapHome(user, history,keyLink));
      },
  
      
    };
  };
  
  export default connect(null, mapDispatchToProps)(SignIn);
