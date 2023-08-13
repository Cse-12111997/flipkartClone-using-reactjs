import {useState,useEffect} from 'react';
import {InputBase,Box,List,ListItem,styled} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useSelector,useDispatch}from 'react-redux';
import {getProducts} from '../../redux/actions/ProductAction';
import {Link} from 'react-router-dom';
const SearchContainer=styled(Box)`
background:#fff;
width:35%;
border-radius:2px;
margin-left:10px;
display:flex;
`;


const InputSearchBase=styled(InputBase)`

padding-left:20px;
width:100%;
font-size:unset;
`;

const SearchIconWrapper=styled(Box)`
    color:blue;
    padding:5px;
    display:flex;
`
const ListWrapper = styled(List)`
    position:absolute;
    background:#FFFFFF;
    color:#000000;
    margin-top:36px;
`
const Search=()=>{
    const [text,setText]=useState('');

    const {products} = useSelector(state=> state.getProducts);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    const getText=(text)=>{
        setText(text);
    }
    return (
        <SearchContainer>
       <InputSearchBase
        placeholder='Search for products, brands, more'
        onChange={(e)=>getText(e.target.value)}
        value={text}
       />
       <SearchIconWrapper>
        <SearchIcon/>
       </SearchIconWrapper>
       {
        text &&
        <ListWrapper>
            {
                products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                    <ListItem>
                        <Link 
                        to={`/product/${product.id}`}
                        onClick={()=>setText('')}
                        style={{ textDecoration:'none',color:'inherit'}}
                       
                        >
                            {product.title.longTitle}
                        </Link>
                    </ListItem>
                ))
            }
        </ListWrapper>
       }
       </SearchContainer>
      
          )
}
export default Search;

// import { useState, useEffect } from 'react';

// import SearchIcon from '@mui/icons-material/Search';
// import { InputBase, List, ListItem, Box, styled } from '@mui/material';

// import { useSelector, useDispatch } from 'react-redux'; // hooks
// import { getProducts as listProducts } from '../../redux/actions/ProductActions.jsx';
// import { Link } from 'react-router-dom';

// const SearchContainer = styled(Box)`
//   border-radius: 2px;
//   margin-left: 10px;
//   width: 38%;
//   background-color: #fff;
//   display: flex;
// `;

// const SearchIconWrapper = styled(Box)`
//   margin-left: auto;
//   padding: 5px;
//   display: flex;
//   color: blue;
// `;

// const ListWrapper = styled(List)`
//   position: absolute;
//   color: #000;
//   background: #FFFFFF;
//   margin-top: 36px;
// `;

// const InputSearchBase = styled(InputBase)`
//   font-size: unset;
//   width: 100%;
//   padding-left: 20px;
// `;

// const Search = () => {
//     const [ text, setText ] = useState();
//     const [ open, setOpen ] = useState(true)

//     const getText = (text) => {
//         setText(text);
//         setOpen(false)
//     }

//     const getProducts = useSelector(state => state.getProducts);
//     const { products } = getProducts;

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(listProducts())
//     }, [dispatch])

//     return (
//         <SearchContainer>
//             <InputSearchBase
//               placeholder="Search for products, brands and more"
//               inputProps={{ 'aria-label': 'search' }}
//               onChange={(e) => getText(e.target.value)}
//             />
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             {
//               text && 
//               <ListWrapper hidden={open}>
//                 {
//                   products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
//                     <ListItem>
//                       <Link 
//                         to={`/product/${product.id}`} 
//                         style={{ textDecoration:'none', color:'inherit'}}
//                         onClick={() => setOpen(true)}  
//                       >
//                         {product.title.longTitle}
//                       </Link>
//                     </ListItem>
//                   ))
//                 }  
//               </ListWrapper>
//             }
//         </SearchContainer>
//     )
// }

// export default Search;