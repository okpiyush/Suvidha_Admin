import styled, { keyframes } from 'styled-components';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../Context/LoginContext';
import logo from "./Logo.png";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #1e1b4b, #312e81, #4338ca, #6366f1);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  overflow: hidden;
  position: relative;
`;

const DecorativeCircle = styled.div`
  position: absolute;
  width: ${props => props.size || '300px'};
  height: ${props => props.size || '300px'};
  top: ${props => props.top || 'auto'};
  left: ${props => props.left || 'auto'};
  bottom: ${props => props.bottom || 'auto'};
  right: ${props => props.right || 'auto'};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  z-index: 1;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 4rem;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 10;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.8s ease-out;
`;

const LogoContainer = styled.div`
  width: 120px;
  height: 120px;
  background: white;
  padding: 1rem;
  border-radius: 30px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.125rem;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 2rem;
  background: var(--grad-primary);
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.125rem;
  border-radius: var(--radius-md);
  margin-bottom: 1rem;
  transition: var(--transition);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.5);
    background: white;
    color: var(--primary);
  }
`;

const GhostButton = styled.button`
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 2rem;
  border-radius: var(--radius-md);
  width: 100%;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const BigLogo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 60px;
  padding: 3rem;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  opacity: 0.15;
  pointer-events: none;

  img {
    width: 100%;
    filter: grayscale(1);
  }
`;

const SidePanel = styled.div`
  position: absolute;
  height: 100%;
  width: 50%;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  padding: 4rem;
  z-index: 10;

  &.left {
    left: 0;
    &:hover { background: rgba(0, 0, 0, 0.2); }
  }

  &.right {
    right: 0;
    &:hover { background: rgba(255, 255, 255, 0.05); }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    &.right { top: 50%; }
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 400px;
`;

const PortalButton = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  padding: 1.5rem 3rem;
  border: 4px solid white;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: all 0.3s;
  margin-top: 2rem;

  &:hover {
    background: white;
    color: #1e1b4b;
    transform: scale(1.05);
  }
`;

const ExtraText = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  margin-top: 1rem;
  font-weight: 500;
`;

const Welcome = () => {
  const { loginData } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginData) {
      navigate("/home", { replace: true });
    }
  }, [loginData, navigate]);

  return (
    <Container>
      <BigLogo>
        <img src={logo} alt="Logo" />
      </BigLogo>

      <SidePanel className="left">
        <ContentBox>
          <h2 style={{ color: 'white', fontSize: '1rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.4em' }}>Customer Portal</h2>
          <PortalButton as="a" href={process.env.REACT_APP_STORE_URL || "http://localhost:3000"}>Shop Now</PortalButton>
          <ExtraText>Explore our premium e-commerce experience</ExtraText>
        </ContentBox>
      </SidePanel>

      <SidePanel className="right">
        <ContentBox>
          <h2 style={{ color: 'white', fontSize: '1rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.4em' }}>Fulfillment Center</h2>
          <PortalButton to="/login">Enter Admin</PortalButton>
          <ExtraText>Manage orders, products, and insights</ExtraText>
        </ContentBox>
      </SidePanel>

      <div style={{ position: 'absolute', bottom: '40px', width: '100%', textAlign: 'center', zIndex: 20, color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', letterSpacing: '0.1em' }}>
        © 2026 SUVIDHA ENTERPRISE SOLUTIONS
      </div>
    </Container>
  );
};

export default Welcome;