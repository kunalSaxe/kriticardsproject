import React, { useEffect, useState } from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import "aos/dist/aos.css"
import Header from './Header';
import Fade from 'react-reveal/Fade';
import { getData} from '../FetchNodeService';
import { Button, Container } from '@material-ui/core';
import Footer from "./Footer";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from '@material-ui/core';
import { UserGalleryComponent } from './UserGalleryComponent';
const useStyles = makeStyles({});



export default function UserGallery(props) {
  const [status, setStatus] = useState(false)
  const [GalleryPic, setGalleryPic] = useState([])
  const classes = useStyles();
 
  useEffect(function () {
    fetchAllGalleryPic()

  }, [])

  const fetchAllGalleryPic = async () => {  
    var list = await getData('carditem/fetchalluserinterfacecarditem')
    setGalleryPic(list.data)
    setData(list.data)
    setStatus(true)
  }
  const Reset=()=>{
    fetchAllGalleryPic()
    setData(GalleryPic)
    setStatus(!status)

  }
  const [refresh,setRefresh]=useState(true)
 

 
  const top = GalleryPic

  const displaPic = () => {
    return Data.map((item) => {

      return (
        <UserGalleryComponent item={item} history={props.history} />
      )

    })


  }


  const [Data, setData] = useState([]);
  const Setfilter=(value)=>{
    var filterdata = GalleryPic.filter(item=>{
      return item.cardcode===value
    })
    setData(filterdata)
    setRefresh(!refresh)

    if(value==""){
      fetchAllGalleryPic()
      setRefresh(!refresh)
    }
    
  }
  return (
    <>
      <Header history={props.history} />

      <Container maxWidth="lg">
      <div >
              
         <Grid container xs={12}  >
         <Grid item xs={12}  style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px',}} >
               <Autocomplete
               fullWidth
               id="combo-box-demo"
               options={top}
               onChange={(event, newValue) => {
                 Setfilter(newValue.cardcode);
                
               }}
               onKeyPress={(event,newValue)=>event.key==='Enter'?Setfilter(newValue.cardcode) : ""}
               getOptionLabel={(option) => option.cardcode}
               renderInput={(params) => <TextField {...params} label="Combo box"  variant="standard" />}
           />
           <Button onClick={()=>Reset()}>RESET</Button>
               </Grid>
         </Grid>

                      
                        </div>

        <p style={{marginTop:'4%'}} className={classes.homeheading}>  <span>GALLERY</span></p>
      </Container>
      <div  >
        <Fade bottom>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", padding: 25 }}>

            {displaPic()}
          </div>
        </Fade>
      </div>

      <div>
        <Footer/>
      </div>
    </>
  )
}


