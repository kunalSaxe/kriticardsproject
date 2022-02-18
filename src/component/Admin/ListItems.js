import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import DisplayAllUser from './DisplayAllUser';
import DisplayAllItems from './DisplayAllCarditem';
import { Divider } from '@material-ui/core';
import OrderDetail from './orderdetail';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ProductPictures from './ProductPicture';
import ImageIcon from '@material-ui/icons/Image';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function ListItems(props)
{ const classes = useStyles();
  const handleClick=(v)=>{
  props.setComponent(v)

  }
    return(
 <div>
 <div>
    <ListItem button onClick={()=>handleClick(0)}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

  
          <Divider/>
       

     

    <ListItem button onClick={()=>handleClick(<DisplayAllItems setComponent={props.setComponent}/>)} >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Card Stock" />
    </ListItem>
    <Divider/>
    <ListItem button onClick={()=>handleClick(<ProductPictures setComponent={props.setComponent}/>)} >
      <ListItemIcon>
        <ImageIcon />
      </ListItemIcon>
      <ListItemText primary="Card pics" />
    </ListItem>
    <Divider/>
    <ListItem button onClick={()=>handleClick(<DisplayAllUser setComponent={props.setComponent}/>)} >
      <ListItemIcon>
        <PersonIcon />
      </ListItemIcon>
      <ListItemText primary="User Allowance" />
    </ListItem>

    <ListItem button onClick={()=>handleClick(<OrderDetail  setComponent={props.setComponent} history={props.history} />)} >
      <ListItemIcon>
        <ShowChartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
      </div>
  </div>
  )

}
