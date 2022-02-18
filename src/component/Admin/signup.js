import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getData, postData, postDataAndImage } from '../FetchNodeService';
import swal from 'sweetalert';
import { Paper } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 50


  },
  subdiv: {
    width: 700,
    height: "auto",

    padding: 20,

    borderRadius: 5



  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',

  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),

  },

}));

export default function SignUp() {
  const classes = useStyles();
  const [Clientname, setClientname] = useState('')
  const [Email, setEmail] = useState('')
  const [pincode, setPincode] = useState('')
  const [PhoneNumber, setPhoneNumber] = useState('')
  const [Address, setAddress] = useState('')
  const [Country, setCountry] = useState('INDIA')
  const [State, setState] = useState('')
  const [City, setCity] = useState('')
  const [BillingAddress, setBillingAddress] = useState('')
  const [Password, setPassword] = useState("")
  const [LoginStatus, setLoginStatus] = useState('New Client')
  const handleSubmit = async () => {
    var body = { "email": Email }
    var list = await postData('client/chksignup', body)
    if (!list) {

      swal({
        title: "Bad luck!",
        text: "already email in use",
        icon: "error",
        button: "OK",
      });

    } else {
      var body = { "name": Clientname, "email": Email, "mobileno": PhoneNumber, "address": Address, "country": Country, "state": State, "city": City,"pincode":pincode, "billingaddress": BillingAddress, "password": Password,status:LoginStatus }
      var result = await postData("client/insertsignupclient", body);
      if (result) {
        swal({
          title: "Good job!",
          text: "Successfully Submited",
          icon: "success",
          button: "OK",
        });
      }
      else {
        swal({
          title: "!OOPS",
          text: "Something Wrong",
          icon: "error",
          button: "OK",
        });
      }
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.subdiv}>

          <Paper style={{ padding: 20, width: 600 }}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}><Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography style={{ }} component="h1" variant="h5">
          Sign up
        </Typography></div>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="fname"
                  onChange={(event) => setClientname(event.target.value)}
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="Client Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  variant="outlined"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                  fullWidth
                  label="Phone Number"

                />
              </Grid>
              <Grid item xs={6}>
                <TextField

                  onChange={(event) => setEmail(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  label="Email Id"

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(event) => setAddress(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Address"

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  value='INDIA'
                  disabled
                  required
                  fullWidth
                  label="Country"

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(event) => setState(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  label="State"

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(event) => setCity(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth

                  label="City"

                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(event) => setBillingAddress(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  label="Billing Address"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  onChange={(event) => setPincode(event.target.value)}
                  variant="outlined"
                  required
                  fullWidth
                  label="Pin Code"
                />
              </Grid>


              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(event) => setPassword(event.target.value)}
                  name="password"
                  label="Create Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
             



              <Grid item sm={12} style={{ padding: 10 }}>
                <div style={{ justifyContent: 'center', display: 'flex' }}><Button style={{ width: 250 }} onClick={() => handleSubmit()} variant="contained" color="primary" >SIGN UP</Button></div>

              </Grid>
            </Grid>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>

          </Paper>
        </div>
      </div>


    </Container>
  );
}