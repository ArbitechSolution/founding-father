// import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from './Compnents/Header/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from './Compnents/container/Container'

function App() {
  return (
    
    <div className="App">
    <div className="appimage">
    <ToastContainer/>
      <Header/>
      {/* <Container /> */}
    </div>
  </div>
  );
}

export default App;
