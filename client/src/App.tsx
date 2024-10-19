import { Outlet } from 'react-router-dom';
import NavBar from './components/navBar';

import '/src/index.css';

function App() {

  return (
    <div className='p-4 bg-gray-800 min-h-screen'>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main> 
    </div>
  )
}

export default App;
