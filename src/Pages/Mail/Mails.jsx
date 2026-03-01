import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';
import AddEmailModal from '../../Components/Modals/AddEmailModal';
import ConfirmationModal from '../../Components/Modals/confirmationModal';
import SendSingleEmail from "../../Components/Modals/SendSingleEmail";
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease-out;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
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

const MailIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-light);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
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
  margin-right: 0.5rem;
  color: ${props => props.variant === 'danger' ? 'var(--danger)' : props.variant === 'success' ? 'var(--success)' : 'var(--text-main)'};

  &:hover {
    background: ${props => props.variant === 'danger' ? 'rgba(239, 68, 68, 0.05)' : props.variant === 'success' ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-main)'};
    border-color: ${props => props.variant === 'danger' ? 'var(--danger)' : props.variant === 'success' ? 'var(--success)' : 'var(--primary)'};
    color: ${props => props.variant === 'danger' ? 'var(--danger)' : props.variant === 'success' ? 'var(--success)' : 'var(--primary)'};
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
  max-width: 500px;
  padding: 2.5rem;
  position: relative;
  box-shadow: var(--shadow-xl);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Mails = () => {
  const url = 'https://businessmanagementsolutionapi.onrender.com/api/mail/getmails/';
  const { loginData } = useContext(LoginContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSingleModal, setShowSingleModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedMail, setSelectedMail] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchedData = useHook(url, loginData?.accessToken);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
      setLoading(false);
    }
  }, [fetchedData]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const deleteUrl = `https://businessmanagementsolutionapi.onrender.com/api/mail/delete/${itemToDelete._id}`;
    try {
      await axios.delete(deleteUrl);
      setData(data.filter(item => item._id !== itemToDelete._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendSingle = (mail) => {
    setSelectedMail(mail);
    setShowSingleModal(true);
  };

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <PageHeader>
        <h1 className="page-title">Email Communications</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <i className='bx bx-send' style={{ marginRight: '0.5rem' }}></i> Broadcast Email
        </button>
      </PageHeader>

      <TableCard>
        <Table>
          <thead>
            <tr>
              <th>Subscriber</th>
              <th>Email Address</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MailIcon><i className='bx bx-user'></i></MailIcon>
                    <span style={{ fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item._id}</span>
                  </div>
                </td>
                <td style={{ fontWeight: 500 }}>{item.mail}</td>
                <td>{item.createdAt?.substring(0, 10)}</td>
                <td>
                  <ActionBtn variant="success" onClick={() => handleSendSingle(item.mail)}>
                    <i className='bx bx-mail-send'></i>
                  </ActionBtn>
                  <ActionBtn variant="danger" onClick={() => handleDeleteClick(item)}>
                    <i className='bx bx-trash'></i>
                  </ActionBtn>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableCard>

      {showAddModal && (
        <ModalOverlay>
          <ModalContent>
            <ActionBtn
              onClick={() => setShowAddModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', margin: 0 }}
            >
              <i className='bx bx-x'></i>
            </ActionBtn>
            <AddEmailModal onSuccess={() => setShowAddModal(false)} onUpdate={() => window.location.reload()} />
          </ModalContent>
        </ModalOverlay>
      )}

      {showSingleModal && (
        <ModalOverlay>
          <ModalContent>
            <ActionBtn
              onClick={() => setShowSingleModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', margin: 0 }}
            >
              <i className='bx bx-x'></i>
            </ActionBtn>
            <SendSingleEmail
              onSuccess={() => setShowSingleModal(false)}
              onUpdate={() => { }}
              email={selectedMail}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {showDeleteModal && (
        <ConfirmationModal
          item={itemToDelete ? { title: itemToDelete.mail } : null}
          onDelete={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </PageContainer>
  );
};

export default Mails;
