import React, { useState, useContext } from 'react';
import {DataContext} from '../../context/DataProvider';
import {Dialog,Box,TextField,Typography,Button,styled} from '@mui/material';
import {authenticatesSignup,authenticatesLogin} from '../../service/api';


const Component=styled(Box)`
    height:70vh;
    width:90vh;
`;
const Images=styled(Box)`
    background:#2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    height:100%;
    width:48%;
    marginTop:150px;
    padding:15px 15px;
    & >p,&> h5{
        color:#ffffff;
        font-weight:600;
    }
`
const Wrapper=styled(Box)`

    display:flex;
    
    flex-direction:column;
    padding:15px 15px;
    flex:1;
    & > div, & >button, & >p{
        margin-top:5px;
    }
`
const LoginButton=styled(Button)`
    text-transform:none;
    background: #FB641B;
   color:#fff;
    height:48px;
    border-radius:2px;

`

const RequestOTP=styled(Button)`
    text-transform:none;
    background: #fff;
   color:#2874f0;
    height:48px;
    border-radius:2px;
    box-shadow:0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text=styled(Typography)`
    font-size:12px;
    color: #878787;
`

const CreateAccount =styled(Typography)`
    font-size:14px;
    Text-align:center;
    color:#2874f0;
    font-weight:600;
    cursor:pointer;
`

const Error=styled(Typography)`
   font-size:10px;
   color:#ff6115;
   line-height:0;
   margin-top=10px;
   font-weight:600;
`
const accountInitialValues={
   login:{
    view:'login',
    heading:"Login",
    subHeading:'Get access to your Orders, Wishlist and Recommendations'
   },
   signup:{
    view:'signup',
    heading:"Looks like you're new here!",
    subHeading:'Sign up with your mobilenumber to get started'
   }
}

const signupInitialValues={
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password:'',
    phone:''
}

const loginInitialValues={
    username:'',
    password:''
}
const LoginDialog=({open,setOpen})=>{
    const[account,toggleAccount]=useState(accountInitialValues.login);
    const [signup,setSignup]=useState(signupInitialValues);
    const [login,setLogin]=useState(loginInitialValues);
    const [error,setError]=useState(false);
    const {setAccount} =useContext(DataContext);
    
    const handleClose=()=>{
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }

    const togglesSignup=()=>{
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange=(e)=>{
       setSignup({ ...signup,[e.target.name]:e.target.value});
      console.log(signup);
    }

    const signupUser=async()=>{
       let response= await authenticatesSignup(signup);
       if(!response)return;
       handleClose();
       setAccount(signup.firstname);
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }

    const loginUser=async()=>{
        let response=await authenticatesLogin(login);
        console.log(response);
       if(response.status===200){
        handleClose();
        setAccount(response.data.data.firstname);
       }
       else{
        setError(true);
       }
    }
    return (
      <Dialog open={open} onClose={handleClose} PaperProps={{sx:{maxwidth:'unset'}}}>
      <Component>
      <Box style={{display:'flex',height:'100%'}}>
           <Images >
                <Typography variant="h5">{account.heading}</Typography>
                <Typography style={{marginTop:20}}>{account.subHeading}</Typography>
           </Images>
           {
            account.view==='login' ?
          
            <Wrapper >
                <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='username' label="Enter username"/>
                {error && <Error>Please enter valid username or password</Error>}
                <TextField variant="standard" onChange={(e)=>onValueChange(e)} name='password' label="Enter Password"/>     
                <Text> By continuing , you agree to Flipkart's Terms of Use and Privacy Policy .</Text>
                <LoginButton onClick={()=> loginUser()}>Login</LoginButton>
                <Typography style={{textAlign:'center'}}>OR</Typography>
                <RequestOTP>Request OTP</RequestOTP>
                <CreateAccount onClick={()=>togglesSignup()}>New to Flipkart ? Create an account</CreateAccount>
            </Wrapper>
            :
            <Wrapper>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='firstname' label="Enter First Name"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='lastname' label="Enter Last Name"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='username' label="Enter Username"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='email' label="Enter Email"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='password' label="Enter Password"/>
                <TextField variant="standard" onChange={(e)=>onInputChange(e)} name='phone' label="Enter Phone"/>
                
                <LoginButton onClick={()=> signupUser()}>Continue</LoginButton>
                
            </Wrapper>
        }
        </Box>
      </Component>
      </Dialog>
    )
}
export default LoginDialog;



