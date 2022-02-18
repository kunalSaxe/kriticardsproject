import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { TextField,Button, Avatar } from '@material-ui/core';
import {postDataAndImage } from '../FetchNodeService';
import Swal from 'sweetalert2';
import Paper from '@material-ui/core/Paper';
import 'react-quill/dist/quill.snow.css';

const useStyle = makeStyles((theme) => ({
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
  input: {
    display: 'none',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),

  },




  heading: {
    fontWeight: 6,
    fontSize: 20,
    color: "#009688",
    display: 'flex',
    flexDirection: 'center',
    justifyContent: "center"
  }

}))

export default function CardItems(props) {



 
  const [picture, setPicture] = useState({ filename: '', bytes: '' })
  const [cardcode, setCardcode] = useState('')
  const [cardprice, setCardprice] = useState('')
  const [stock, setStock] = useState('')
  
 


  const handlePicture = (event) => {
    setPicture({
      filename: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    })



  }

  const handleSubmit = async () => {


    var formData = new FormData()
    formData.append("cardcode", cardcode)
    formData.append("price", cardprice)   
    formData.append("stock", stock)
    formData.append("picture", picture.bytes)
 
    
    var config = { headers: { "content-type": "multipart/form-data" } };
    var result = await postDataAndImage("carditem/insertcarditem", formData, config);
    if (result) {
      Swal.fire({
        title: 'GlassKart.com',
        text: 'submitted ',
        imageUrl: '/glasskart.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
    else {
      Swal.fire({
        title: 'GlassKart.com',
        text: 'Error ',
        imageUrl: '/glasskart.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      })
    }
  }



  const classes = useStyle();
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.subdiv}>



          <Paper elevation={5} style={{ padding: 10 }} >
            <div style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: "#000",
              display: 'flex',
              flexDirection: 'center',
              justifyContent: 'center',

              padding: 5
            }}>
              <span><img src="/logo.png" width='70' alt="" /></span> <span  >ADD CARD ITEMS</span> </div>

            <Grid container xs={12} spacing={1}>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Card Code" onChange={(event) => setCardcode(event.target.value)} fullWidth />
              </Grid>
             
              <Grid item xs={12}>
                <TextField variant="outlined" label="Card Price" onChange={(event) => setCardprice(event.target.value)} fullWidth />
              </Grid>
            
              <Grid item xs={12}>
                <TextField variant="outlined" label="Stock" onChange={(event) => setStock(event.target.value)} fullWidth />
              </Grid>
              
              <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center',marginTop:20 }}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(event) => handlePicture(event)}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" color="primary" component="span" style={{ width: 150 }}>
                    Upload
                  </Button>
                </label>
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                </label>
              </Grid>
              <Grid item xs={6} style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Avatar alt="" className={classes.large} variant="rounded" src={picture.filename} />
              </Grid>


              <Grid item sm={12} style={{ padding: 10 }}>
                <div style={{ justifyContent: 'center', display: 'flex' }}><Button style={{ width: 250 }} onClick={() => handleSubmit()} variant="contained" color="primary" >ADD CART</Button></div>

              </Grid>
              
            </Grid>
          </Paper>
        </div>
      </div>
    </div>
  )
}

