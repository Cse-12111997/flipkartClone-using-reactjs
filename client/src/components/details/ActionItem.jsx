import{useState} from 'react';


import {Box,Button,styled} from '@mui/material';
import {ShoppingCart as Cart,FlashOn as Flash} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartAction';
import {payUsingPaytm} from '../../service/api';
import {post } from '../../utils/paytm'
// const LeftContainer=styled(Box)`
//     min-width:40%
//     padding: 40px 0 0 80px;
// `
// const Image=styled('img')({
//     padding:'15px 20px',
//     border:   '1px  solid #f0f0f0',
//     width: '95%'

// })

// const StyleButton=styled(Button)`
//     width:46%;
//     height:50px;
//     border-radius:2px;

// `

// const ActionItem=({product})=>{
//         return (
//            <LeftContainer>
//             <Image src={product.detailUrl}/>
//             <StyleButton variant="contained" style={{marginRight:10,background:'#ff9f00'}}>Add To Cart</StyleButton>
//             <StyleButton variant="contained" style={{background:'#fb541b'}}>Buy Now</StyleButton>
//            </LeftContainer>
//         )
// }
// export default ActionItem;


// import { useState } from 'react';

// import { Button, Box, styled } from '@mui/material';
// import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

// import { useNavigate } from 'react-router-dom';
// import { payUsingPaytm } from '../../service/api';
// import { post } from '../../utils/paytm';

// import { addToCart } from '../../redux/actions/cartActions';
// import { useDispatch } from 'react-redux';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))

const Image = styled('img')({
    padding: '15px 20px',
    border: '1px solid #f0f0f0',
    width: '95%'
});

const StyledButton = styled(Button)(({theme})=>({
    width:'48%',
    height:'50px',
    borderRadius:2,
    [theme.breakpoints.down('lg')]:{
        width:'46'
    },
    [theme.breakpoints.down('sm')]:{
        width:'48%'
    }
}));
   




const ActionItem = ({ product }) => {
    const navigate = useNavigate();
    const { id } = product;
        
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'codeforinterview01@gmail.com'});
        var information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response    
        }
        post(information);
    }

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity));
        navigate('/cart');
    }
    

    
    return (
        <LeftContainer>
            <Box style={{padding:'15px 20px',border:'1px solid #f0f0f0',marginBottom:10}}>
                <Image src={product.detailUrl} alt="product"/>
            </Box>
            
            <StyledButton  style={{marginRight: 10, background: '#ff9f00'}} variant="contained" onClick={()=>addItemToCart()}><Cart />Add to Cart</StyledButton>
            <StyledButton  style={{background: '#fb641b'}} variant="contained" onClick={()=>buyNow()}><Flash /> Buy Now</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;