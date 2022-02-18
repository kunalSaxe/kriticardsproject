import React,{useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from "./ListItems"
import { getData } from '../FetchNodeService';
import TodayOrder from './todayorder';
import ExitToApp from '@material-ui/icons/ExitToApp'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, 
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [view,setView]=useState()
  const [Count, setCount] = useState([])
  const [ClientVerify, setClientVerify] = useState([])
  const [ClientNotVerify, setClientNotVerify] = useState([])
  
  useEffect(function(){
    countcard()
    clientverifys()
    clientnotverifys()  },[view])
  
  const setComponent=(v)=>{
   setView(v)
  }

  const countcard=async()=>{
    var count = await getData('carditem/countcard')
    setCount(count.data[0].cardcount)
    
  }


  const clientverifys=async()=>{
    
      var countverify=await getData('carditem/countverify')
      setClientVerify(countverify.data[0].clientverify)
    

  
  }

  const clientnotverifys=async()=>{
    
    var countnotverify=await getData('carditem/countnotverify')
    setClientNotVerify(countnotverify.data[0].clientnotverify)
  


}
const LogOut=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('kriti')
  props.history.replace({pathname:'/admin'})
}
const [User, setUser] = useState([]);
const  checkSession=()=>{
    if(!localStorage.getItem('token')){
      props.history.replace({pathname:'/admin'})
    }else{
      var adm=JSON.parse(localStorage.getItem('kriti'))

      setUser(adm)
    }
  }

  useEffect(function(){
      checkSession()
  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
            Admin Name-:  {User.adminname}
            </Badge>
          </IconButton>
          <IconButton color="inherit" >
           <ExitToApp onClick={()=>LogOut()}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div>
        <Link color="primary" href="#" >
          View Stats
        </Link>
      </div>
        
       <ListItems setComponent={setComponent} history={props.history} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          
        {view?view:<>
          <Grid container xs={12} spacing={2} >
          <Grid item xs={4} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              <React.Fragment>
      <div style={{fontSize:25,color:'#3F51B5'}}>Total Cards</div>
      <Typography component="p" variant="h4">
        {Count}
      </Typography>
    
    </React.Fragment>
              </Paper>
            </Grid>

            <Grid item xs={4} md={4} lg={3}>
              
              <Paper className={fixedHeightPaper}>
              <React.Fragment>
      <div style={{fontSize:25,color:'#3F51B5'}}>Verified Clients</div>
      <Typography component="p" variant="h4">
        {ClientVerify}
      </Typography>
      <div>
        <Link color="primary" href="#" >
          View Stats
        </Link>
      </div>
    
    </React.Fragment>
            



              </Paper>
            </Grid>
            <Grid item xs={4} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
              
              <React.Fragment>
      <div style={{fontSize:25,color:'#3F51B5'}}>Not Verified Clients</div>
    <Typography component="p" variant="h4">
      {ClientNotVerify}
    </Typography>
  
    <div>
      <Link color="primary" href="#" >
        View Stats
      </Link>
    </div>
  </React.Fragment>
          


            </Paper>
          </Grid>

          <Grid item xs={4} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
            
            <React.Fragment>
    <div style={{fontSize:25,color:'#3F51B5'}}>Orders</div>
    <Typography component="p" variant="h4">
      0
    </Typography>
  
    <div>
      <Link color="primary" href="#" >
        View Stats
      </Link>
    </div>
  </React.Fragment>
          


            </Paper>
          </Grid>
          </Grid>
                    <TodayOrder/></>
                  }
        </Container>
      </main>
    </div>
  );
}