import { Sidebar } from '../../components/sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './App.css'
import logo from '../../resources/Logo.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt='logo' src={logo}/>
      </header>
        <div className="App-mainBody">
          <Sidebar/>
          <Outlet/>
        </div>
    </div>
  );
}

export default App;
