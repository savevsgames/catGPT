import {Outlet, Route, Routes} from 'react-router-dom';
import NavBar from './components/navBar';

import '/src/index.css';
import Landing from "./pages/Landing.tsx";
import Signup from "./pages/signup.tsx";
import Login from "./pages/Login.tsx";
import Error from "./pages/Error.tsx";

function Layout() {
    return (
        <div className='p-4 bg-gray-800 min-h-screen'>
            <header>
                <NavBar/>
            </header>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route key="LandingPage" index element={<Landing />} />
                <Route key="SignUp" path="signup" element={<Signup />} />
                <Route key-="Login" path="login" element={<Login />} />
                {/*<Route key-="Profile" element={<Profile />} />*/}
                {/*<Route key-="Cat" element={<Cat />} />*/}
                <Route key-="Error" path="*" element={<Error />} />
            </Route>
        </Routes>
    )
}

export default App;
