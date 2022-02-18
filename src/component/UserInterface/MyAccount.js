import React,{useEffect,useState} from 'react';
import {makeStyles } from '@material-ui/core/styles';
import { postData} from '../FetchNodeService';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
   
  
     maindiv:{
     display:'flex',
     justifyContent:'center',
     alignItems:'center',
     padding:10,
    
     },
  
   list:{
  cursor:'pointer',
  padding:'15px 30px 15px',
  fontSize:15,
  borderBottom: '1px solid #dcdde1'
},
   hover:{
    "&:hover": {
      background: "#f1f2f6",
      transition: 'all 0.5s ease 0s',
    },
   }
    ,
  container:
   {
      display:'flex',
      alignItems:'center',
      justifyContent:'center', 
    },
  
 gridStyle:
 {display:'flex',
 flexDirection:'row'},

      error:{
        color:'red',
        position:"absolute",
        fontSize:12,
        margin:'2px 4px'
      },
      textfieldStyle:
      { margin:'8px 4px',
      },

}));

export default function MyAccount(props) {
    const classes = useStyles();
    const[getFirstName,setFirstName]=useState('')
    const[getEmail,setEmail]=useState('')
    const[getMobile,setMobile]=useState('')
    const[getErrFirst,setErrFirst]=useState('')

    const[getAddress,setAddress]=useState('')
    const[getState,setGetState]=useState('')
    const[getCity,setGetCity]=useState('')

    const[getErrEmail,setErrEmail]=useState('')
    const[getMsg,setMsg]=useState('')
    const[getFormFirstName,setFormFirstName]=useState('')
    const[getFormLastName,setFormLastName]=useState('')
    const[getFormEmail,setFormEmail]=useState('')
    
const CheckSession=async()=>{
    var t=localStorage.getItem('user')
        if(localStorage.getItem('user')){
            var user =JSON.parse(localStorage.getItem('user'))
            var name = user.clientname.split(' ')
            setFirstName(user.clientname)  
            setEmail(user.clientemail)
            setMobile(user.clientmobile)
            setFormFirstName(user.clientname)
            setFormLastName(name[1])
            setFormEmail(user.clientemail)
            setGetCity(user.clientcity)
            setGetState(user.clientstate)
            setAddress(user.clientbillingaddress)
            return

          }
    else{
      props.history.replace({pathname:`/home`})
    }
    
}
    
useEffect(function(){   
 CheckSession()
 window.scrollTo(0,0)
},[])


const handleOrderHistory=()=>{
props.history.push({pathname:`/orderhistory`})
}




const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit=async()=>{
   
    let body={mobileno:getMobile,username:getFormFirstName,emailaddress:getFormEmail,address:getAddress,city:getCity,state:getState}
                 
        var result= await postData('client/updateprofile',body)  
        if(result.RESULT)
        { 
          var res=await postData('client/checkUser',{emailaddress:getEmail})
          if(res.RESULT){
            localStorage.setItem('user',JSON.stringify(res.data))
            CheckSession()
          }
         setFirstName(getFormFirstName)
         setEmail(getFormEmail)
         handleClose()

         }
        else
        { handleClose() }
 
   
   
  }


const showEditDialog=()=>{
    return(
<div  >     
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title"><div  style={{color:'#de011b',fontSize:16}}>Edit Profile</div></DialogTitle>
        <div style={{padding:20}}>
 <Paper elevation={0} >    

 <Grid container spacing={1}>
 <Grid item xs={12} sm={12} >
        <TextField className={classes.textfieldStyle} fullWidth value={getFormFirstName}  id="outlined-size-small"
          variant="standard"
          size="small"  label="First Name" onChange={(event)=>setFormFirstName(event.target.value)} />
          <div  className={classes.error}><small>{getErrFirst}</small></div>
        </Grid>
     
     <Grid item xs={12} sm={12} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getFormEmail} 
          id="standard-size-small"
          variant="standard"
          size="small" label="Email-id" onChange={(event)=>setFormEmail(event.target.value)} />
        <div   className={classes.error}><small>{getErrEmail}</small></div>
      </Grid>
      <Grid item xs={12} sm={12} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getMobile} 
          id="standard-size-small"
          variant="standard"
          size="small" label="Mobile No"  />
      </Grid>

      <Grid item xs={12} sm={12} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getAddress}
          id="standard-size-small"
          variant="standard"
          size="small" label="Your Address"  />
      </Grid>

      <Grid item xs={12} sm={12} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getState}
          id="standard-size-small"
          variant="standard"
          size="small" label="State"  />
      </Grid>
      <Grid item xs={12} sm={12} >
        <TextField className={classes.textfieldStyle}  fullWidth value={getCity}
          id="standard-size-small"
          variant="standard"
          size="small" label="City"  />
      </Grid>

 
      
    <Grid item xs={12} sm={12} className={classes.container} >
   <Button variant="contained" style={{backgroundColor:'#de011b',color:'#FFFFFF'}} fullWidth onClick={()=>handleEdit()} >
    Save Changes
   </Button>
   </Grid>

   <Grid item xs={12}>
    <b>&nbsp;&nbsp;{getMsg}</b>
   </Grid>

</Grid>
 </Paper>

 </div>
    <DialogActions>
      <Button onClick={handleClose}style={{color:'#de011b'}}>
            CANCEL
      </Button>
          
    </DialogActions>
  </Dialog>
    </div>
    
    )

}

const AccountInformation=()=>{
    return(
        <div >
   <Paper elevation={0}style={{padding:'5px 20px 20px'}} >   
   <Grid container spacing={1}>
   <Grid  item xs={12} sm={8}>
   <h4><b>Account Information</b></h4>
   </Grid>
   <Grid item xs={12} sm={4} style={{display:'flex',justifyContent:'flex-end'}} >
         <h4 style={{color:'#de011b',cursor:'pointer'}} onClick={()=>handleClickOpen()}>Edit</h4>
   </Grid>
  <Grid   item xs={12} sm={12} style={{padding:5}}>
   <div style={{fontSize:13}}>User Name<br/>
  <b>{getFirstName}</b></div>
  </Grid>

  <Grid   item xs={12} sm={6}style={{padding:5}} >
   <div style={{fontSize:13}}>Mobile No<br/>
   <b>+91 - {getMobile}</b></div>
  </Grid>

  <Grid  item xs={12} sm={6} style={{padding:5}} >
   <div style={{fontSize:13}}>Email ID<br/>
   <b>{getEmail}</b></div>
  </Grid>
</Grid>
</Paper>
</div>
   
    )
  }
  
  
  
    const MyAccount=()=>{
      return(
       <div >
       <Paper elevation={0} style={{padding:'0px 20px 20px',backgroundColor:'#f48fb1',borderRadius:5,}}>
       <div className={classes.gridStyle} >
         <div className={classes.container} style={{padding:10}}>
          <AccountCircleIcon style={{color:'#212121',fontSize:50}}/>
          </div> 
         <div style={{padding:'25px 20px 20px',fontSize:16,color:'#212121'}}>
          <big>{getFirstName} </big><br/>
          <small><i>{getEmail}</i><br/>
           +91 {getMobile}</small>
           </div>
       </div>
       </Paper>
       </div>
     )  
    }
    


    const MyList=()=>{
        return(
         <div >
            <Paper elevation={0} >
         <Grid container spacing={0}>
         <Grid item xs={12} sm={12} className={[classes.list,classes.hover]} onClick={()=>handleOrderHistory()}> 
          Order History
            
        </Grid>
        
      </Grid>
         </Paper>
         <div> <div style={{marginTop:30}}><font size='2'>
           For any queries,<br/>
           Call us :  <font color='#de011b'>0751-4001543</font>
           </font></div>
           <div style={{marginTop:10}}><font size='2'>
          Due to current situation we are witnessing a huge surge in calls/ e-mails. There may be a 
          delay in response from our side.Kindly bear with us.
          </font></div>
          </div>
         </div>
       )  
      }


    return (
        <div style={{backgroundColor: '#f3f3f3',}}>
            <Header history={props.history}/>
        <div className={classes.container} >
         <div style={{width:'80%',padding:10}}>
         <h2 >My Account</h2>
         <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
           <div>{MyAccount()} </div> 
           </Grid>
           <Grid item xs={12} sm={6}>
            <div>  {AccountInformation()}</div>
           </Grid>
           <Grid item xs={12} sm={6}>
          <div> {MyList()}</div>
           </Grid>
         </Grid>

         {showEditDialog()}
         </div>
          </div>
      </div>

  
  );
}
