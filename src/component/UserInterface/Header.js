import React, { useEffect, useState } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import {Button, Grid, Hidden } from '@material-ui/core';
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { LocalMall } from '@material-ui/icons';
import {  ServerURL, postData,} from "../FetchNodeService"
import { Divider,  } from '@material-ui/core';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  list: {
    width: 400,
  },
  list2: {
    width: 270,
  },
  fullList: {
    width: 'auto',
  },
  grow: {
    flexGrow: 1,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: { 
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: { 
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
   

  },

  butt:{
    fontFamily:' sans-serif;',marginInline:20,cursor:'pointer',
  },
  logo: {  
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',justifyContent:'center',alignItems:'center',marginTop:'5px'
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [scrolled,setScrolled]=useState(false)
  const [User, setUser] = useState([]);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [Refresh, setRefresh] = useState(true);
  var dispatch = useDispatch()
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleBooking = async() => {
         var dat=new Date()
         var date=dat.getDate()
         var month=dat.getMonth()+1
         var year=dat.getFullYear()
         var d=date+"/"+month+"/"+year
    
    var body =  {
      carditem,
      name:User.clientname,
      orderdate:d,
      address:User.clientbillingaddress+user.pincode,
      city:User.clientcity,
      email:User.clientemail,
      id:User.clientid,
      mobile:User.clientmobile,
      state:User.clientstate,
      totalprice:totalamt,
      status:"ongoing",
      invoiceno:uuidv4()
    }
    var list = await postData('carditem/insertorders',body)
    if (list) {
    Swal.fire({
        title: 'Kriti Cards.com',
        text: 'Order submitted ',
        imageUrl: '/kc.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}
  else {
    Swal.fire({
      title: 'Order error',
      text: 'Error ',
      imageUrl: '/glasskart.png',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
dispatch({type:'REMOVE_ALL_CART'})
setState(false);


}



  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleScroll=() => {
    const offset=window.scrollY;
    if(offset > 110 ){
      setScrolled(true);
    }
    else{
      setScrolled(false);
    }
  }


   /////////////////DRAWER//////////////////////////
   
  
   var cart = useSelector(state => state.cart)
   var carditem = Object.values(cart)
   var user = useSelector(state => state.user)
   var key = Object.keys(cart)
   var totalamt = carditem.reduce(calaculateAmount, 0)
   var actualamount = carditem.reduce(calaculateActualAmount, 0)
   function calaculateAmount(a, b) {
     var actualprice =  b.price * b.Quantity
     return (a + actualprice)
   }
   function calaculateActualAmount(a, b) {
 
     return (a + (b.price * b.Quantity))
 
   }
 
  

   
useEffect(function(){
  CheckSession()
  CheckCart()
},[]
)

  
///////////////////////   Show Cart  ///////////////////////
const [UserName, setUserName] = useState('');
const CheckSession = async () => {
  if (localStorage.getItem("user")) {
    var user = JSON.parse(localStorage.getItem("user"));
    var name = user.username.split(" ");
    dispatch({ type: "ADD_USER", payload: [user.clientmobile, user] });
  }
};

const CheckCart = async () => {
  if (localStorage.getItem("cart")) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    dispatch({ type: "SET_ALL_CART", cartItems: cart });
  }
};

   
   const displayCartItems = () => {
       return carditem.map((item) => {
         return (
           <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: "100%" }} >
             
             <div style={{ padding: 10, margin: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
               <img alt={item.cardname} src={`${ServerURL}/images/${item.picture}`} width='100px' />
               <IconButton onClick={()=>dispatch({type:"REMOVE_CART",payload: [item.cardcode],...setState(false)})}> <DeleteIcon/> </IconButton>
              </div>
   
             <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: 30, marginTop: 3 }}>
               <div style={{ fontSize: 17, fontWeight: 700, margin: 2, letterSpacing: 1 }}>
                 {item.cardcode}
               </div>
               <div style={{ fontSize: 16, fontWeight: 500, margin: 2 }}>
                 <span> {item.color}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                 <span>&#8377; {item.price} × {item.Quantity}</span>
               </div>
              
              
   
             </div>
   
             <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 3, fontSize: 18, fontWeight: 500, margin: 0, paddingLeft: 31 }} >
             <span>&#8377; {item.price * item.Quantity}</span>
   
   
   
             </div>
   
   
   
           </div>
   
   
         )
   
   
       })
   
   
     }
   
   
   
   
   const [state, setState] = React.useState({
       top: false,
       left: false,
       bottom: false,
       right: false,
     });

     const [state2, setState2] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
   
   const toggleDrawer = (anchor, open) => {
      setState({ ...state, [anchor]: open });
     };

     const toggleDrawer2 = (anchor, open) => {
      setState2({ ...state2, [anchor]: open });
    };
   
   
   
     const list = (anchor) => (
       <div
         className={clsx(classes.list, {
           [classes.fullList]: anchor === 'top' || anchor === 'bottom',
         })}
         role="presentation">
   
   <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'10px',flexDirection:'column'}}>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 125 }}>
           <img src="kc.png" width='300' height='150' />
         </div>
   
         {key.length == 0 ? <div>
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100,flexDirection:'column' }}>
           <div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'25px',fontWeight:550,letterSpacing:1}}>Your Cart is Empty</div>
             <img src="/emptycart.png" width="100%" />
           </div>
         </div> :
           <>
             <div style={{ width: 400 }}>
               <span style={{ fontWeight: 600, padding: 1 }}>
                 <IconButton aria-label="cart">
                   <Badge badgeContent={key.length} color="secondary">
                     <img src='shopping-cart.png' width='50' />
                   </Badge>
                 </IconButton>
               </span>
               <span style={{ fontWeight: 700, float: 'right', padding: 25, fontSize: 18 }}>&#8377; {totalamt}</span>
   
             </div>
             {displayCartItems()}
             <Divider />
             <div style={{ display: 'flex', flexDirection: 'column' }}>
               <div style={{ width: 375 }}>
                 <span style={{ fontWeight: 700, padding: 15, fontSize: 19 }}>Payable:</span>
                 <span style={{ fontWeight: 600, float: 'right', padding: 5, color: 'black', fontSize: 18 }}>&#8377; {actualamount}</span>
   
               </div>
               
               <div style={{ width: 375 }}>
                 <span style={{ fontWeight: 700, padding: 15 }}>Delivery Charges:</span>
                 <span style={{ fontWeight: 600, float: 'right', padding: 5, fontSize: 16 }}>&#8377; {0}</span>
   
               </div>
   
               <Divider style={{ backgroundColor: 'silver', padding: 0.3 }} />
               <div style={{ width: 375 }}>
                 <span style={{ fontWeight: 700, padding: 15, fontSize: 18 }}>Net Amount:</span>
                 <span style={{ fontWeight: 600, float: 'right', padding: 5, fontSize: 18 }}>&#8377; {totalamt}</span>
               </div>
   
   
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
               
                  <li onClick={() => handleBooking()}
                   style={{ listStyle: 'none', display: 'block', background: '#50526e', color: '#fff', padding: 20, textAlign: 'center', marginTop: 15, fontSize: 16, letterSpacing: 0.5, cursor: 'pointer', width: 328, fontWeight: 700 }}>
                   Place Order
                 </li>
               </div>
             </div>
   
           </>}
           </div>

       </div>
        );





     const list2 = (anchor) => (
      <div
        className={clsx(classes.list2, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
      >
            <div className={classes.logo} >
              <img src='/kc.png' width='200px'  />
            </div>
   

<div style={{justifyContent:'flex-start',alignItems:'center',fontSize:20,fontWeight:600,width:'100%'  }}>
             <MenuItem className={classes.butt}  onClick={()=>props.history.push({pathname:'/home'})}  >
               HOME
             </MenuItem>
             <MenuItem style={{fontFamily:' sans-serif;',marginInline:20,cursor:'pointer' }} >
               ABOUT US
             </MenuItem>
             { User.clientid>1? <MenuItem style={{fontFamily:'sans-serif',marginInline:20,cursor:'pointer' }} onClick={()=>props.history.push({pathname:'/gallery'})} >
             Gallery
             </MenuItem>:<></>}

             { User.clientid>1?<>
      
      <MenuItem style={{marginInline:20}} onClick={()=>props.history.push({pathname:"/myaccount"})}>My account</MenuItem>
      <MenuItem  style={{marginInline:20}} onClick={()=>LogOut()}>Sign Out</MenuItem></>:<><MenuItem style={{marginInline:20}} >Signin</MenuItem>
      </>}
           
          </div>
  
            </div>
  
       
    
  
    );
  
   
     const showCart = () => {
       return (
       <div>
   
         <React.Fragment key={'right'}>
   
           <Drawer anchor={'right'} open={state['right']} onClose={() => toggleDrawer('right', false)}>
             {list('right')}
           </Drawer>
         </React.Fragment>
   
       </div>)
   
   
   
     }


   const showHamburger = () => {
       return (
       <div>
   
         <React.Fragment key={'left'}>
   
           <Drawer  anchor={'left'} open={state2['left']} onClose={() => toggleDrawer2('left', false)}>
             {list2('left')}
           </Drawer>
         </React.Fragment>
   
       </div>)
   
   
   
     }
   
   
   

   ////////////////////////////////////////////////////////


  useEffect(() => {
    window.addEventListener('scroll',handleScroll)
  })
  const  checkSession=()=>{
    if(!localStorage.getItem('user')){
      props.history.replace({pathname:'/home'})
    }else{
      var adm=JSON.parse(localStorage.getItem('user'))
      
      setUser(adm)
    }
  }

  useEffect(function(){
      checkSession()
  },[Refresh])


  const menuId = 'primary-search-account-menu';
  const LogOut=()=>{
    localStorage.removeItem('user')
    dispatch({type:'REMOVE_ALL_CART'})
    props.history.replace({pathname:'/gallery'})

   

   

  }
  const renderMenu = (

   
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >{ User.clientid>1?<>
      
      <MenuItem onClick={()=>props.history.push({pathname:"/myaccount"})}>My account</MenuItem>
      <MenuItem  onClick={()=>LogOut()}>Sign Out</MenuItem></>:<><MenuItem onClick={()=>props.history.push({pathname:'/signin'})} >Signin</MenuItem>
      </>}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
   
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton onClick={() => toggleDrawer('right', true)} aria-label="show 17 new " color="inherit">
                 <Badge badgeContent={key.length} color="secondary">
                   <LocalMall />
                 </Badge>
               </IconButton>
        <p>Cart</p>
      </MenuItem>
      
    </Menu>
  );


  return (
    <div className={classes.grow}>
      {scrolled?
       <AppBar position="fixed" style={{backgroundColor: 'white',zIndex:100,color:'black',height:100}} >
       <Grid style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginInline:'30px'}}>
       <div className={classes.logo}>
       <IconButton 
               edge="start"
               className={classes.menuButton}
               color="inherit"
               aria-label="open drawer"
               onClick={()=>toggleDrawer2('left', true)}
             >
               <MenuIcon />
             </IconButton>
       </div>
       <div className={classes.logo} >
              <img src='/kc.png' width='200px'  />
            </div>
   
            <div className={classes.logo}>
               <IconButton
                 aria-label="show more"
                 aria-controls={mobileMenuId}
                 aria-haspopup="true"
                 onClick={handleMobileMenuOpen}
                 color="inherit"
               >
                 <MoreIcon />
               </IconButton>
             </div>
   
       </Grid>
        <Toolbar>
        <Hidden smDown  >
            
              <div style={{marginTop:"5px",}}>
              <img src='/kc.png' width='200px'  />
            </div>
           
            <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',fontSize:20,fontWeight:600,width:'100%'  }}>
             <Button  style={{fontSize:18,fontWeight:600,}} className={classes.butt}  onClick={()=>props.history.push({pathname:'/home'})}  >
               HOME
             </Button>
             <Button  style={{fontSize:18,fontWeight:600,fontFamily:'sans-serif'}} className={classes.butt}  onClick={()=>props.history.push({pathname:'/aboutus'})}  >
               ABOUT US
             </Button>
             { User.clientid>1? 
             <Button style={{fontFamily:'sans-serif',marginInline:20,cursor:'pointer',fontSize:18,fontWeight:600, }} onClick={()=>props.history.push({pathname:'/gallery'})} >
             Gallery
             </Button>
             :<></>}
           
          </div>
           <div className={classes.grow} />
             <div className={classes.sectionDesktop}>
   
              
               <IconButton aria-label="show 17 new notifications" color="inherit">
                
               </IconButton>
               <IconButton
                 edge="end"
                 aria-label="account of current user"
                 aria-controls={menuId}
                 aria-haspopup="true"
                 onClick={handleProfileMenuOpen}
                 color="inherit"
               >
                 <AccountCircle />
               </IconButton>
             
   
               {User.clientid>0?
             <div className={classes.sectionDesktop}>
             </div>:<div className={classes.sectionDesktop}>
             <IconButton style={{fontSize:20,fontWeight:600}} onClick={()=>props.history.replace({pathname:"/signin"})} color="inherit">Login</IconButton>
             </div>}
   
   
   
             
               <IconButton onClick={() => toggleDrawer('right', true)} aria-label="show 17 new " color="inherit">
                 <Badge badgeContent={key.length} color="secondary">
                   <LocalMall />
                 </Badge>
               </IconButton>
             </div>
           
          </Hidden>  
           </Toolbar>
        
         </AppBar>
: <AppBar position="static" style={{backgroundColor: 'white',zIndex:100,color:'black',height:100}} >
    <Grid style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginInline:'30px'}}>
    <div className={classes.logo}>
    <IconButton 
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={()=>toggleDrawer2('left', true)}
          >
            <MenuIcon />
          </IconButton>
    </div>
    <div className={classes.logo} >
           <img src='/kc.png' width='200px'  />
         </div>

         <div className={classes.logo}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>

    </Grid>
     <Toolbar>
     <Hidden smDown  >
         
           <div style={{marginTop:"5px",}}>
           <img src='/kc.png' width='200px'  />
         </div>
        
         <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',fontSize:20,fontWeight:600,width:'100%'  }}>
             <Button  style={{fontSize:18,fontWeight:600,}} className={classes.butt}  onClick={()=>props.history.push({pathname:'/home'})}  >
               HOME
             </Button>
             <Button  style={{fontSize:18,fontWeight:600,fontFamily:'sans-serif'}} className={classes.butt}  onClick={()=>props.history.push({pathname:'/aboutus'})}  >
               ABOUT US
             </Button>
             { User.clientid>1? 
             <Button style={{fontFamily:'sans-serif',marginInline:20,cursor:'pointer',fontSize:18,fontWeight:600, }} onClick={()=>props.history.push({pathname:'/gallery'})} >
             Gallery
             </Button>
             :<></>}
           
          </div>

        


          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

           
            <IconButton aria-label="show 17 new notifications" color="inherit">
              
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          

            {User.clientid>0?
          <div className={classes.sectionDesktop}>
          </div>:<div className={classes.sectionDesktop}>
          <IconButton style={{fontSize:20,fontWeight:600}} onClick={()=>props.history.replace({pathname:"/signin"})} color="inherit">Login</IconButton>
          </div>}



          
            <IconButton onClick={() => toggleDrawer('right', true)} aria-label="show 17 new " color="inherit">
              <Badge badgeContent={key.length} color="secondary">
                <LocalMall />
              </Badge>
            </IconButton>
          </div>
        
       </Hidden>  
        </Toolbar>
     
      </AppBar>}
      
      {renderMobileMenu}
      {renderMenu}
      {showCart()}
      {showHamburger()}


      
    </div>
    
  );
}





