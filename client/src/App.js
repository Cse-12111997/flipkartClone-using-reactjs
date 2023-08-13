
import Home from './components/home/Home';
import Header from './components/header/header';

import DataProvider from './context/DataProvider';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import DetailView  from './components/details/DetailView';
import Cart from './components/cart/Cart';
import {Box} from '@mui/material'
function App() {
  return (
    <DataProvider>
        <BrowserRouter>
          <Header />
          <Box style={{marginTop: 54}}>
            <Routes>
              <Route path= '/' element={<Home />} />
              <Route path= '/products/:id' element={<DetailView/>} />
              <Route path='/cart' element={<Cart/>}/>
            </Routes>
          </Box>
        </BrowserRouter>
    </DataProvider>
  );
}

export default App;
