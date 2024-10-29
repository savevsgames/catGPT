import { Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";

import "/src/index.css";
import Landing from "./pages/Landing.tsx";
import Home from "./pages/Home.tsx";
import Signup from "./pages/signup.tsx";
import Login from "./pages/Login.tsx";
import Chat from "./pages/Chat.tsx";
import Error from "./pages/Error.tsx";
import Profile from "./pages/Profile.tsx";
import Cat from "./pages/Cat.tsx";
import { NookProvider } from "./context/NookContext.tsx";
import { CatProvider } from "./context/CatContext.tsx";
import { LoggedInProvider } from "./context/LoggedInContext.tsx";

function Layout() {
  return (
    <LoggedInProvider>
    <NookProvider>
      <CatProvider>
      <div className="h-screen flex flex-col bg-gray-800 overflow-hidden">
        <header className="flex-shrink-0">
          <NavBar />
        </header>
        <main className="flex-grow overflow-hidden">
          {" "}
          <Outlet />
        </main>
      </div>
      </CatProvider>
    </NookProvider>
    </LoggedInProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route key="LandingPage" index element={<Landing />} />
        <Route key="SignUp" path="signup" element={<Signup />} />
        <Route key-="Login" path="login" element={<Login />} />
        <Route key-="Chat" path="/:catName/Chat" element={<Chat />} />
        <Route key="Home" path="home" element={<Home />} /> {/* Page that shows all your cats */}
        <Route key-="Profile" path="profile" element={<Profile />} />
        <Route key-="Cat" path="/:catName/Cat" element={<Cat />} />
        <Route key-="Error" path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
