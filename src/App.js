import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import Home from './routes/Home';
import Map from './routes/Map';
import Check from './routes/Check';
import Apply from './routes/Apply';
import Apply_Form from './routes/Apply_Form';
import Login from './routes/Login';
import Auth_Home from './routes/Auth_Home';
import Auth_Apply from './routes/Auth_Apply';
import Auth_Stuff from './routes/Auth_Stuff';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Home></Home>}></Route>
        <Route path = '/apply' element ={<Apply></Apply>}></Route>
        <Route path='/apply_form' element = {<Apply_Form></Apply_Form>}></Route>
        <Route path='/map' element={<Map></Map>}></Route>
        <Route path='/check' element={<Check></Check>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/auth_home' element={<Auth_Home></Auth_Home>}></Route>
        <Route path='/auth_apply' element={<Auth_Apply></Auth_Apply>}></Route>
        <Route path='/auth_stuff' element={<Auth_Stuff></Auth_Stuff>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
//"homepage": "https://coderorlim.github.io/Sejong_Rent/"
//"homepage": "http://localhost:3000/"