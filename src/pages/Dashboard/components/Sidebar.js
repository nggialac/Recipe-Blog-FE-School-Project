import React, { useState } from "react";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Cookies from "js-cookie";
import Login from "../../login/Login";
import LoginGeneral from "../../login/LoginGeneral";

const Nav = styled.div`
  background: #15171c;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const NavIconRight = styled(Link)`
  margin-right: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logout = () => {
    Cookies.remove('__session');
    setIsLogout(true);
  };

  return isLogout ? (
    <Redirect to="/login" component={LoginGeneral}/>
  ) : (
    <>
      <div className="sidebar-input">
        <IconContext.Provider value={{ color: "#fff" }}>
          <Nav>
            <NavIcon to="#">
              <FaIcons.FaAlignLeft onClick={showSidebar} />
            </NavIcon>
            <NavIcon to="#">
               RECIPE DASHBOARD
            </NavIcon>
            <NavIconRight className="nav-icon-right" onClick={logout}>
              <FaIcons.FaRegThumbsDown  /> Logout
            </NavIconRight>
          </Nav>
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav>
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Sidebar;
