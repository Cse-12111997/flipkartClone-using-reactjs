import { Fragment } from 'react';
import Slide from "./Slide";
import { useEffect } from 'react';
import NavBar from './NavBar';
import Banner from './Banner';
import MidSection from './MidSection'
import {Box,styled} from '@mui/material';
import MidSlide from'./MidSlide';
import { getProducts } from '../../redux/actions/ProductAction';
import { useDispatch,useSelector } from 'react-redux';
const Component=styled(Box)`
padding:10px ;
background-color:#f2f2f2;
`
const Home=()=>{
    const {products}=useSelector(state=>state.getProducts);
    console.log(products);
    const dispatch=useDispatch();
    useEffect(()=>{
       dispatch(getProducts())
    },[dispatch])
    return (
       
        <Fragment>
       
        <NavBar/>
        <Component>
        <Banner/>
        <MidSlide products={products}title="Deal of the Day"timer={true}/>
        <MidSection/>
        <Slide products={products}title="Discount for you"timer={false}/>
        <Slide products={products}title="Suggesting items"timer={false}/>
        <Slide products={products}title="Top Selection"timer={false}/>
        <Slide products={products}title="Recommended Items"timer={false}/>
        <Slide products={products}title="Trending Offers"timer={false}/>
        <Slide products={products}title="Season's top picks"timer={false}/>
        <Slide products={products}title="Top Deal's on Accessories"timer={false}/>
        </Component>
        
        </Fragment>
    )
}

export default Home;


