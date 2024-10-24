import { Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";

import "/src/index.css";
import Landing from "./pages/Landing.tsx";
import Home from "./pages/Home.tsx";
import Signup from "./pages/signup.tsx";
import Login from "./pages/Login.tsx";
import Chat from "./pages/Chat.tsx";
import Error from "./pages/Error.tsx";

function Layout() {
  return (
    <div className="flex flex-col bg-gray-800" style={{ height: "100vh" }}>
      <header>
        <NavBar />
      </header>
      <main
        className="flex-grow p-4"
        style={{ maxHeight: "calc(100vh - 100px)" }}
      >
        {" "}
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route key="LandingPage" index element={<Landing />} />
        <Route key="SignUp" path="signup" element={<Signup />} />
        <Route key-="Login" path="login" element={<Login />} />
        <Route key-="Chat" path="chat" element={<Chat />} />
        <Route key="Home" path="home" element={<Home />} />
        {/*<Route key-="Profile" path="profile" element={<Profile />} />*/}
        {/*<Route key-="Cat" path="cat" element={<Cat />} />*/}
        <Route key-="Error" path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
