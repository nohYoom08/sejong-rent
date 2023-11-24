import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from 'react-router-dom';

import User_Home from './routes/User_Home';
import User_Map from './routes/User_Map';
import User_Check from './routes/User_Check';
import User_Apply from './routes/User_Apply';
import User_Apply_Form from './routes/User_Apply_Form';
import User_Login from './routes/User_Login';
import Auth_Home from './routes/Auth_Home';
import Auth_Apply from './routes/Auth_Apply';
import Auth_Stuff from './routes/Auth_Stuff';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<User_Home></User_Home>}></Route>
        <Route path = '/apply' element ={<User_Apply></User_Apply>}></Route>
        <Route path='/apply_form' element = {<User_Apply_Form></User_Apply_Form>}></Route>
        <Route path='/map' element={<User_Map></User_Map>}></Route>
        <Route path='/check' element={<User_Check></User_Check>}></Route>
        <Route path='/login' element={<User_Login></User_Login>}></Route>
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