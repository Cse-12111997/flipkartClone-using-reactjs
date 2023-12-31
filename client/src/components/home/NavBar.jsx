import {Box,Typography,styled} from '@mui/material';
import {navData} from '../../constants/data';


const Component =styled(Box)(({theme})=>({
display :'flex',
margin: '50px 50px 0 50px',
backgroud:'#fff',
justifyContent:'space-between',
[theme.breakpoints.down('lg')]:{
    margin:0
}
}));

const Container=styled(Box)`
padding:12px 8px;
text-align:center;
`

const Text=styled(Typography)`
font-size:14px;
font-weight:600;
fontfamily:inherit;
`
const NavBar=()=>{
    return (
        <Box style={{backgroud:'#fff'}}>
     <Component>
        {
            navData.map(data =>(
                
                <Container>
                    <img src={data.url} alt="nav"/>
                    <Text>
                        {data.text}
                    </Text>
                </Container>

            ))
        }
     </Component>
     </Box>
    )
}
export default NavBar;