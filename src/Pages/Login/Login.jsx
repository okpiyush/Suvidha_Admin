import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: var(--bg-main);
`;

const LeftSide = styled.div`
  flex: 1.2;
  position: relative;
  background: url('/login_bg.png') no-content center center;
  background-size: cover;
  display: none;
  
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    color: white;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(30, 27, 75, 0.8) 0%, rgba(99, 102, 241, 0.4) 100%);
    z-index: 1;
  }
`;

const BrandingContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 480px;

  h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.125rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
  }
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: white;
  z-index: 10;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  animation: fadeIn 0.6s ease-out;

  .header {
    margin-bottom: 2.5rem;
    
    h2 {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.5rem;
    }

    p {
      color: var(--text-muted);
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-main);
  }

  input {
    padding: 0.75rem 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    font-size: 1rem;
    transition: var(--transition);
    background: var(--bg-main);

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
      background: white;
    }
  }
`;

const ActionButton = styled.button`
  background: var(--grad-primary);
  color: white;
  padding: 0.875rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const HelperLinks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  font-size: 0.875rem;

  a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InfoBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: var(--primary-light);
  border-radius: var(--radius-md);
  border: 1px dashed var(--primary);
  
  p {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--primary);
    font-family: monospace;
    text-align: center;
  }
`;

const Login = () => {
  const { handleLogin, loginData } = useContext(LoginContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loginData) {
      navigate("/home", { replace: true });
    }
  }, [loginData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      // For presentation/demo, we can allow admin/admin if the API is not reachable
      // But let's try the real API first
      const response = await axios.post(`https://businessmanagementsolutionapi.onrender.com/api/auth/login`, {
        username,
        password
      }).catch(err => {
        // Fallback for demo if API fails and creds match admin/admin
        if (username === 'admin' && password === 'admin') {
          return { data: { isAdmin: true, username: 'admin', accessToken: 'mock-token' } };
        }
        throw err;
      });

      if (response.data.isAdmin) {
        handleLogin(response.data);
        navigate("/home", { replace: true });
      } else {
        setError("Unauthorized: Access restricted to administrators.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      {loading && <Loading />}
      <LeftSide>
        <BrandingContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <i className='bx bxs-shield-alt-2' style={{ fontSize: '3rem' }}></i>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.1em' }}>SUVIDHA</span>
          </div>
          <h1>Manage Your Business with Confidence</h1>
          <p>
            Experience the next generation of administrative control.
            Real-time insights, effortless product management, and powerful user oversight all in one premium workspace.
          </p>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '4rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>24k+</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Active Users</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>$1.2M</div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>Sales Tracked</div>
            </div>
          </div>
        </BrandingContent>
      </LeftSide>

      <RightSide>
        <FormWrapper>
          <div className="header">
            <h2>Welcome Back</h2>
            <p>Please enter your administrative credentials.</p>
          </div>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            {error && <p style={{ color: 'var(--danger)', fontSize: '0.875rem', margin: 0 }}>{error}</p>}

            <ActionButton type="submit" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </ActionButton>
          </Form>

          <HelperLinks>
            <Link to="/forgotpassword">Forgot password?</Link>
            <span>Need help? <Link to="/contact">Contact Support</Link></span>
          </HelperLinks>

          <InfoBox>
            <p>Demo Credentials: <strong>admin</strong> / <strong>admin</strong></p>
          </InfoBox>
        </FormWrapper>
      </RightSide>
    </PageContainer>
  );
};

export default Login;