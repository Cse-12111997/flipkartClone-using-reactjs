import {useState,useContext} from 'react';
import {Box,Button, Typography,Badge,styled } from '@mui/material'
import {ShoppingCart} from '@mui/icons-material';
import { DataContext} from '../../context/DataProvider';
import LoginDialog from '../login/LoginDialog';
import Profile from './Profile';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
const Wrapper=styled(Box)(({theme})=>({
    display:'flex',
    margin: '0 3% 0 auto',
    padding:'10%',
    textDecoration: 'none',
    color:'#FFFFFF',
    // fontSize: 12,
    alignItems: 'center',
   '& > *': {
        marginRight:'40px !important',
        // marginRight:'40',
        fontSize:'16',
        alignItems:'center'
    },
    [theme.breakpoints.down('md')]:{
        display:'block',
        color:'#000000'
    }
}));


const Container=styled(Link)(({theme})=>({
    display:'flex',
    // color:'#FFFFFF',
    textDecoration:'none',
    color:'inherit',
    [theme.breakpoints.down('md')]:{
        display:'block',
        color:'#000000'
    }
}));

const LoginButton=styled(Button)`
color:#2874f0;
background:#FFFFFF;
text-transform:none;

padding:5px 40px;
border-radius:2px;
box-shadow:none;
font-weight:600;
height:32px;

`
const CustomButton=()=>{
    const[open,setOpen]=useState(false);
    const {account,setAccount}=useContext(DataContext);
    const {cartItems}=useSelector(state=>state.cart);
    const openDialog=()=>{
        setOpen(true);
    }
    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount}/> :
                <LoginButton variant="contained"onClick={()=>openDialog()} >Login</LoginButton>
            }
            
            <Typography style={{ marginTop:3,padding:10, width:135}}>Become a Seller</Typography>
            <Typography style={{marginTop:3,padding:10}}>More</Typography>
            <Container to="/cart">
            <Badge badgeContent={cartItems?.length} color="secondary">
            <ShoppingCart />
            </Badge>
                <Typography style={{marginLeft:10}}>Cart</Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen}/>
        </Wrapper>
       
    )
}

export default CustomButton;
