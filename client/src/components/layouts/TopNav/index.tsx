import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import { NavItem } from "@components/layouts/TopNav/NavItem";
import { CustomConnectButton } from "@components/common/ConnectButton";
import useMediaQuery from "@hooks/useMediaQuery";


export const TopNav: React.FC<{ withoutLinks?: boolean }> = ({ withoutLinks }) => {
  /*
   * Context
   */

  const currentDeviceSize = useMediaQuery();

  /*
   * State
   */

  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState<string>('Landing');

  /*
   * Hooks
   */

  useEffect(() => {
    const routeName = location.pathname.split('/')[1];
    setSelectedItem(routeName || 'Landing');
  }, [location]);

  /*
   * Component
   */

  if (currentDeviceSize === 'mobile') {
    return (
      <NavBar>
        {withoutLinks ? (
          <NavBarCentered>
            <Logo size={48} to="/" onClick={() => setSelectedItem('Landing')}>
              <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="logo" />
            </Logo>
          </NavBarCentered>
        ) : (
          <LogoAndNavItems>
            <Logo to="/" onClick={() => setSelectedItem('Landing')}>
              <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="logo" />
            </Logo>
          </LogoAndNavItems>
        )}
        
        <LoginMenuContainer>
          <CustomConnectButton height={40}/>
        </LoginMenuContainer>
      </NavBar>
    );
  } else {
    return (
      <NavBar>
        {withoutLinks ? (
          <NavBarCentered>
            <Logo size={48} to="/" onClick={() => setSelectedItem('Landing')}>
              <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="logo" />
            </Logo>
          </NavBarCentered>
        ) : (
          <LogoAndNavItems>
            <Logo to="/" onClick={() => setSelectedItem('Landing')}>
              <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="logo" />
            </Logo>

            { currentDeviceSize === 'laptop' && (
              <NavItem selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            )}
          </LogoAndNavItems>
        )}

        {!withoutLinks && <CustomConnectButton height={40} />}
      </NavBar>
    );
  }
};

const NavBarCentered = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.75rem 1.75rem 1.5rem; 

  @media (min-width: 600px) {
    padding: 28px;
  }
`;

const Logo = styled(Link)<{ size?: number }>`
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.2rem;

  img {
    width: ${({ size }) => size || 32}px;
    height: ${({ size }) => size || 32}px;
    object-fit: cover;
  }
`;

const LoginMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const LogoAndNavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
