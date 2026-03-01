import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ModalHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-main);
    margin-bottom: 0.5rem;
  }

  p {
    color: var(--text-muted);
    font-size: 0.875rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  background: var(--bg-main);
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  span {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-main);
    word-break: break-all;
  }
`;

const IpHeader = styled.div`
  background: var(--primary-light);
  color: var(--primary);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  text-align: center;
  margin-bottom: 1.5rem;
  overflow: hidden;

  .ip-address {
    font-family: 'JetBrains Mono', 'Monaco', monospace;
    font-size: ${props => props.isIpv6 ? '1.1rem' : '1.5rem'};
    font-weight: 700;
    display: block;
    word-break: break-all;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }

  .label {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    opacity: 0.7;
    margin-bottom: 0.5rem;
    display: block;
  }
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  gap: 1.25rem;
  color: var(--text-muted);
  text-align: center;

  i {
    font-size: 2.5rem;
    color: ${props => props.error ? 'var(--danger)' : 'var(--primary)'};
  }

  span {
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .badge {
    background: var(--bg-main);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid var(--border);
    color: var(--text-main);
  }
`;

const LogModal = ({ ip }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocal, setIsLocal] = useState(false);

  // Clean the IP address (handling standard Node.js IPv4-mapped IPv6)
  const cleanIp = ip?.startsWith('::ffff:') ? ip.substring(7) : ip;
  const isIpv6 = cleanIp?.includes(':');

  useEffect(() => {
    const isInternal = cleanIp === '::1' || cleanIp === '127.0.0.1' || cleanIp?.includes('localhost');
    setIsLocal(isInternal);

    const callAPI = async (targetIp) => {
      const options = {
        method: 'GET',
        url: 'https://ip-reputation-geoip-and-detect-vpn.p.rapidapi.com/',
        params: { ip: targetIp },
        headers: {
          'X-RapidAPI-Key': '5429e89d1dmsh7d4bf3a4d13fbc9p19d657jsncde43959ed20',
          'X-RapidAPI-Host': 'ip-reputation-geoip-and-detect-vpn.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
      } catch (error) {
        console.error("IP metadata error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ip && !isInternal) {
      callAPI(cleanIp);
    } else {
      setLoading(false);
    }
  }, [ip, cleanIp]);

  if (loading) {
    return (
      <StateContainer>
        <i className='bx bx-loader-alt bx-spin'></i>
        <span>Analyzing Network Intelligence...</span>
      </StateContainer>
    );
  }

  if (isLocal) {
    return (
      <div>
        <ModalHeader>
          <h3>Internal Connection</h3>
          <p>Local loopback or private network access</p>
        </ModalHeader>
        <IpHeader isIpv6={isIpv6}>
          <span className="label">Loopback Address</span>
          <span className="ip-address">{cleanIp}</span>
        </IpHeader>
        <StateContainer>
          <div className="badge">Local Network Node</div>
          <i className='bx bx-shield-quarter'></i>
          <span>This is a local/internal request originating from the server itself or a local environment. Detailed geolocation is not available for private IPs.</span>
        </StateContainer>
      </div>
    );
  }

  return (
    <div>
      <ModalHeader>
        <h3>Connection Intelligence</h3>
        <p>Global geolocation and network reputation data</p>
      </ModalHeader>

      <IpHeader isIpv6={isIpv6}>
        <span className="label">Originating IP Address</span>
        <span className="ip-address">{cleanIp}</span>
      </IpHeader>

      {data ? (
        <InfoGrid>
          <InfoCard>
            <label><i className='bx bxs-map'></i> City</label>
            <span>{data.city || 'Unknown'}</span>
          </InfoCard>
          <InfoCard>
            <label><i className='bx bxs-flag-alt'></i> Country</label>
            <span>{data.country || 'Unknown'}</span>
          </InfoCard>
          <InfoCard>
            <label><i className='bx bxs-network-chart'></i> Provider</label>
            <span>{data.organization || 'Unknown'}</span>
          </InfoCard>
          <InfoCard>
            <label><i className='bx bxs-map-alt'></i> Zip Code</label>
            <span>{data.postal_code || 'N/A'}</span>
          </InfoCard>
        </InfoGrid>
      ) : (
        <StateContainer error>
          <i className='bx bx-error-alt'></i>
          <span>
            Unable to retrieve metadata for this address.<br />
            It may be a private IP or the reputation service is currently unavailable.
          </span>
        </StateContainer>
      )}
    </div>
  );
};

export default LogModal;