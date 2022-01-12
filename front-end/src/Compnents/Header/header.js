import React, { useEffect, useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
// import logo from '../../assests/newLogo.png';
import { loadAccountAddress } from '../../Api/api';
import MyContainer from "../container/Container";

function Header() {
  const [account, setAccount] = useState("Connect Wallet");
  const [disable, setDisable] = useState(false)
  
 
  return (
    <>
      <Navbar style={{ background: "#12102d" }}>
        <Container>
          <Navbar.Brand href="#home">
              
            {/* <img src={logo}
              width="120px"
            // height="80px"
            /> */}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                {/* <Link to="/"> */}
              <button disabled={disable} className="btn btn-primary" >{account}</button>
              {/* </Link> */}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <MyContainer setAccount={setAccount}/>
    </>
  );
}

export default Header;
