import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--sidebar-width);
  background: #1e1b4b; /* Deep Indigo */
  color: white;
  transition: var(--transition);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: ${props => props.active ? 'translateX(0)' : 'translateX(-100%)'};
  box-shadow: var(--shadow-lg);

  @media (min-width: 768px) {
    transform: translateX(0);
    left: ${props => props.active ? '0' : `calc(-1 * var(--sidebar-width))`};
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .brand {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

const NavList = styled.nav`
  flex: 1;
  padding: 1rem 0.75rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #94a3b8;
  text-decoration: none;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: var(--transition);

  i {
    font-size: 1.25rem;
  }

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.05);
  }

  &.active {
    color: white;
    background: var(--grad-primary);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  }
`;

const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const LogoutButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #fca5a5;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
`;

const TopNavbar = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: var(--navbar-height);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 900;
  transition: var(--transition);

  @media (min-width: 768px) {
    left: ${props => props.sidebarActive ? 'var(--sidebar-width)' : '0'};
  }
`;

const MenuButton = styled.button`
  background: var(--primary-light);
  color: var(--primary);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: var(--transition);

  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const ExternalLink = styled.a`
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--primary-light);
  transition: var(--transition);

  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(true);
  const { loginData, handleLogout } = useContext(LoginContext);

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
    // Update main content margin
    const main = document.querySelector('.main-content');
    if (main) {
      main.classList.toggle('sidebar-active');
    }
  };

  // Initial set for sidebar active class on main content
  React.useEffect(() => {
    const main = document.querySelector('.main-content');
    if (main && sidebarActive) {
      main.classList.add('sidebar-active');
    }
  }, []);

  return (
    <>
      <TopNavbar sidebarActive={sidebarActive}>
        <MenuButton onClick={toggleSidebar}>
          <i className={`bx bi-${sidebarActive ? 'x-lg' : 'list'}`}></i>
          <i className={`bx ${sidebarActive ? 'bx-x' : 'bx-menu'}`}></i>
        </MenuButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ExternalLink href="https://suvidhaecommerce.netlify.app/" target="_blank">
            Visit Website <i className='bx bx-link-external'></i>
          </ExternalLink>
          <span style={{ fontWeight: 600 }}>Suvidha Admin</span>
        </div>
      </TopNavbar>

      <SidebarContainer active={sidebarActive}>
        <SidebarHeader>
          <Link to="/home" className="brand">
            <i className='bx bxs-shield-alt-2' style={{ color: 'var(--primary)', fontSize: '1.75rem' }}></i>
            Suvidha
          </Link>
        </SidebarHeader>

        <NavList>
          <StyledNavLink to="/home">
            <i className="bx bxs-dashboard"></i>
            Dashboard
          </StyledNavLink>

          {loginData ? (
            <>
              <StyledNavLink to="/users">
                <i className="bx bxs-user"></i>
                Users
              </StyledNavLink>
              <StyledNavLink to="/products">
                <i className='bx bx-box'></i>
                Products
              </StyledNavLink>
              <StyledNavLink to="/orders">
                <i className="bx bxs-package"></i>
                Orders
              </StyledNavLink>
              <StyledNavLink to="/announcements">
                <i className="bx bxs-megaphone"></i>
                Announcements
              </StyledNavLink>
              <StyledNavLink to="/mails">
                <i className="bx bx-envelope"></i>
                Mail
              </StyledNavLink>
              <StyledNavLink to="/slideshow">
                <i className="bx bx-slideshow"></i>
                Slideshow
              </StyledNavLink>
              <StyledNavLink to="/report">
                <i className="bx bxs-report"></i>
                Reports
              </StyledNavLink>
              <StyledNavLink to="/profile">
                <i className="bx bx-user-check"></i>
                Profile
              </StyledNavLink>
            </>
          ) : (
            <StyledNavLink to="/login">
              <i className="bx bx-log-in"></i>
              Login
            </StyledNavLink>
          )}
        </NavList>

        {loginData && (
          <Footer>
            <LogoutButton onClick={handleLogout}>
              <i className="bx bx-log-out"></i>
              Log out
            </LogoutButton>
          </Footer>
        )}
      </SidebarContainer>
    </>
  );
};

export default Navbar;
