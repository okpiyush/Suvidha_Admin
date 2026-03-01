import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';
import axios from 'axios';
import LogModal from '../../Components/Modals/LogModal';
import { API_BASE_URL } from "../../config";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease-out;
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 1.875rem;
    font-weight: 800;
    color: var(--text-main);
  }
`;

const TableCard = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th {
    background: var(--bg-main);
    padding: 1rem 1.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
    color: var(--text-main);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background: var(--bg-main);
  }
`;

const IpBadge = styled.code`
  background: var(--bg-main);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  color: var(--primary);
  font-weight: 600;
  font-family: inherit;
`;

const ActionBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  color: var(--text-main);

  &:hover {
    background: var(--bg-main);
    border-color: var(--primary);
    color: var(--primary);
    transform: translateY(-1px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 450px;
  padding: 2.5rem;
  position: relative;
  box-shadow: var(--shadow-xl);
  animation: slideUp 0.3s ease-out;
`;

const Logs = () => {
  const url = `${API_BASE_URL}/auth/getallip`;
  const { loginData } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedIp, setSelectedIp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!loginData?.accessToken) return;
      try {
        const headers = { token: `Bearer ${loginData.accessToken}` };
        const response = await axios.get(url, { headers });
        setData(response.data);
      } catch (err) {
        console.error("Error fetching logs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [loginData, url]);

  const handleInfoClick = (ip) => {
    setSelectedIp(ip);
    setShowModal(true);
  };

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <PageHeader>
        <h1>Security Reports</h1>
        <p style={{ color: 'var(--text-muted)' }}>Monitor administrative access and login attempts</p>
      </PageHeader>

      <TableCard>
        <Table>
          <thead>
            <tr>
              <th>IP Address / Log</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <IpBadge>{item.Logs}</IpBadge>
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <i className='bx bx-calendar'></i>
                    {item.createdAt.substring(0, 10)}
                  </div>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <i className='bx bx-time'></i>
                    {item.createdAt.substring(11, 19)}
                  </div>
                </td>
                <td>
                  <ActionBtn onClick={() => handleInfoClick(item.Logs)}>
                    <i className='bx bx-info-circle'></i>
                  </ActionBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableCard>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ActionBtn
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', margin: 0 }}
            >
              <i className='bx bx-x'></i>
            </ActionBtn>
            <LogModal ip={selectedIp} />
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Logs;
