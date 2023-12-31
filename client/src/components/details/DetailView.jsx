
import {useEffect}from 'react';

import {useDispatch,useSelector}from 'react-redux';
import { getProductDetails } from '../../redux/actions/ProductAction';
import { useParams } from 'react-router-dom';
import {Box,Grid,styled} from '@mui/material';
import ActionItem from './ActionItem';
import ProductDetail from './ProductDetail';
 
 const Component=styled(Box)`
    background:#F2F2F2;
    margin-top:55px;
    
 `

 const Contanier=styled(Grid)(({theme})=>({
    background:'#FFFFFF',
    display:'flex',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
 }))
   
 const RightContanier=styled(Grid)`
    margin-top:50px;
 `
const DetailView=()=>{
    const dispatch=useDispatch();
    const {id}=useParams();
    const {loading,product}=useSelector(state=>state.getProductDetails);
    
    useEffect(()=>{
        if(product && id !== product.id)
           dispatch(getProductDetails(id))
    },[dispatch,id,product,loading])
    console.log(product);
    return (
        <Component>
            {
                 product && Object.keys(product).length &&
                <Contanier container >
                    <Grid item lg={4}  md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                    <RightContanier item lg={8} md={8} sm={12} xs={12}>
                       
                        <ProductDetail product={product}/>
                    </RightContanier>
                </Contanier>
            }
        </Component>
    )
}

export default DetailView;
