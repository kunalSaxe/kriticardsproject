import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { postData } from '../FetchNodeService';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  var dispatch=useDispatch()
  const classes = useStyles();
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState("")

  const handleSubmit = async () => {


    var body ={"email":Email,"password":Password}
    var result = await postData("client/usersignin", body);
    if (result.status) {
     
      var user = JSON.stringify(result.data[0])
      swal({
        title: "Good job!",
        text: "Successfully signin as client",
        icon: "success",
        button: "OK",
      });

     

      localStorage.setItem('user',user)
      dispatch({type:'ADD_USER',payload:[result.data[0].clientmobile,result.data[0]]})
      props.history.replace({ pathname: '/home' })
    }
    else {
      swal({
        title:result.yuhi,
        text: "Invalid Email/Password",
        icon: "error",
        button: "OK",
      });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
           
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            
            onChange={(event) => setPassword(event.target.value)}
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

            onClick={() => handleSubmit()}
          >
            Sign In
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      
      </div>
    
    </Container>
  );
}