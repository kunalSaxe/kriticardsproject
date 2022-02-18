import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {postData,} from '../FetchNodeService';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Header from './Header';
import Footer from './Footer';
import { Hidden } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  center:{
    display:'flex',justifyContent:'center',alignItems:'center'
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 50


  },
  subdiv: {
    width: 1600,
    height: "auto",

    padding: 20,

    borderRadius: 5
  },
  hover: {
    "&:hover": {
      background: "#FFC312",
      transform: "scale(1)",
      color: "#000",
    },
  },
   gridStyle: {
    display: 'flex',
    padding:'30px 50px 30px 50px',
    flexDirection:'row'


  },
   filterStyleHeading: {
    display: 'flex', 
    fontSize: 20,
    fontFamily:'Calibri',
    color:'#000000',
    letterSpacing:1,
    fontWeight:600,
  },
  filterStyle: {
    fontSize: 14,
    fontFamily:'Calibri',
    border:'1px solid #dfe6e9',
    borderRadius:1,
    padding: 10,
  },
  divider:{
    margin:'4px 4px 0px 4px',
    backgroundColor:'#ff4757',
    height:2,
    width:'99%',
  },
  order:{
    [theme.breakpoints.down('xs')]:{
      display:'flex',flexDirection:'row',justifyContent:'space-between'
    }
  },
  details:{
    [theme.breakpoints.down('xs')]:{
      paddingTop:3
        }
  },
  loop:{
    [theme.breakpoints.up('lg')]:{
display:'none'        }
  }

}));

export default function OrderHistory(props) {
    const classes = useStyles();
    const [getOrderHistory,setOrderHistory]=useState([])
    const [getUser,setUser]=useState([])
    const [getStatus,setStatus]=useState(false)
 

 

    const CheckSession=async()=>{
      if(!localStorage.getItem('user')){
        props.history.replace({pathname:`/UserLogin`})
        }
}


 const fetchOrderHistory=async()=>{
  var user=JSON.parse(localStorage.getItem('user'))
    setUser(user)
   var body={email:user.clientemail}
   var list=await postData('carditem/orderdisplaybyemail',body)
   setOrderHistory(list)
 }  
 


useEffect(function(){
  CheckSession()
  window.scrollTo(0,0)
  fetchOrderHistory()
},[setStatus])
    
const trialLoop=()=>{
  return getOrderHistory.map((item)=>{
    return(
<div style={{paddingBottom:30,fontSize:20,fontWeight:'bold',fontFamily:'Calibri',color:'#212121'}}>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={1}>
          <div>Order No</div>
        </Grid>
        
        <Grid item xs={12} sm={2}>
          <div>Card Code</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Price/Unit</div>
        </Grid>
        <Grid item xs={12} sm={1}>
          <div>Quantity</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Total Amount Paid</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Order Placed at</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Status</div>
        </Grid>
      </Grid>
    </div>
  
    )
  })
}
  
const OrderDetailsHeading=()=>{
  return(
    <div style={{paddingBottom:10,fontSize:20,fontWeight:'bold',fontFamily:'Calibri',color:'#212121'}}>
      <Grid container spacing={1}>
      <Grid item xs={12} sm={1}>
          <div>Order No</div>
        </Grid>
        
        <Grid item xs={12} sm={2}>
          <div>Card Code</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Price/Unit</div>
        </Grid>
        <Grid item xs={12} sm={1}>
          <div>Quantity</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Total Amount Paid</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Order Placed at</div>
        </Grid>
        <Grid item xs={12} sm={2}>
          <div>Status</div>
        </Grid>
      </Grid>
    </div>
  )
}

const OrderDetails=()=>{
return(
    getOrderHistory.map(function(item,key){
      
      return(
        <div>
          <div style={{fontSize:18,fontWeight:550,fontFamily:'Calibri',color:'#2c3e50',paddingBottom:21}}>
             <Grid container spacing={1}>
             <Grid   item xs={12} sm={1}>
             <div  className={classes.details}>{item.orderid}</div>
             </Grid>
            
             <Grid item xs={12} sm={2} >
             <div className={classes.details}>{item.cardcode}</div>
             </Grid>
             <Grid item xs={12} sm={2} >
             <div className={classes.details}>{item.cardprice}</div>
             </Grid>
             <Grid item xs={12} sm={1} >
             <div className={classes.details}>{item.qty}</div>
             </Grid>

             <Grid  item xs={12} sm={2}>
             <div className={classes.details}><span>&#8377;</span> {item.totalprice}</div>
             </Grid>
             <Grid item xs={12} sm={2} >
             <div className={classes.details}>{item.orderdate}</div>
             </Grid>
             
             <Grid item xs={12} sm={2}>
            {item.status=="Confirmed"?<div style={{background:"#4caf50",color:'white',display:'flex',justifyContent:'center',width:'100px',borderRadius:'5px'}}>{item.status}</div>:<><div style={{background:"red",color:'white',display:'flex',justifyContent:'center',width:'100px',borderRadius:'5px'}}>Ongoing</div></>}

             </Grid>
             </Grid>
             <Divider style={{marginBottom:10}}/>
        </div>
       </div>

      )

    })

)

 }

 



  
    return (<>
    <Header history={props.history}/>
      <div className={classes.root}>
      <div className={classes.subdiv}>
            <Grid container spacing={1} className={classes.gridStyle} >
              {getOrderHistory.length && !getStatus ?  <> 
              <Grid item xs={12} sm={3} >
                <div className={classes.filterStyleHeading}>MY ORDER</div>
              </Grid>
              <Grid item xs={12} sm={9} >
                <div style={{float:'right',fontWeight:'bold',fontFamily:'Calibri'}}>{getOrderHistory.length} order had placed  from your account</div>
              </Grid>
              <Divider className={classes.divider}/>
              <Grid item xs={12} sm={12} className={classes.order} >
               <Hidden xsDown>
               <div>{OrderDetailsHeading()}</div>
               </Hidden>
               <div className={classes.loop}>{trialLoop()}</div>
                <div >{OrderDetails()}</div>
              </Grid>
              </>
            :<div><h2>No Order has Placed from your Account</h2></div>}
            </Grid>
        </div>
        </div>
<Footer/>
        </>
  );
}