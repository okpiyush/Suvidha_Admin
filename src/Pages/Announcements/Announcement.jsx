import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';
import ConfirmationModal from '../../Components/Modals/confirmationModal';
import axios from 'axios';
import SeeAnnouncements from '../../Components/Modals/SeeAnnouncements';
import NewAnnouncement from '../../Components/Modals/NewAnnouncement';

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

const FeaturedBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: ${props => props.active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)'};
  color: ${props => props.active ? 'var(--success)' : 'var(--text-muted)'};
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
  color: ${props => props.variant === 'danger' ? 'var(--danger)' : 'var(--text-main)'};

  &:hover {
    background: ${props => props.variant === 'danger' ? 'rgba(239, 68, 68, 0.05)' : 'var(--bg-main)'};
    border-color: ${props => props.variant === 'danger' ? 'var(--danger)' : 'var(--primary)'};
    color: ${props => props.variant === 'danger' ? 'var(--danger)' : 'var(--primary)'};
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

const Announcements = () => {
  const url = `${API_BASE_URL}/announcement/getall`;
  const { loginData } = useContext(LoginContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
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
    const deleteUrl = `http://localhost:5005/api/announcement/delete/${itemToDelete._id}`;
    try {
      const headers = { token: `Bearer ${loginData.accessToken}` };
      await axios.delete(deleteUrl, { headers });
      setData(data.filter(item => item._id !== itemToDelete._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = () => {
    // Ideally refetch or update state, but NewAnnouncement doesn't return data here
    // For now we'll just reload the page or rely on the hook if it supports refetching
    window.location.reload();
  };

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <PageHeader>
        <h1 className="page-title">Broadcast Announcements</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <i className='bx bx-plus' style={{ marginRight: '0.5rem' }}></i> New Announcement
        </button>
      </PageHeader>

      <TableCard>
        <Table>
          <thead>
            <tr>
              <th>ID / Content</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>
                  <div style={{ maxWidth: '400px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      {item._id}
                    </div>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.announcement?.[0]}
                    </div>
                  </div>
                </td>
                <td>
                  <FeaturedBadge active={item.featured}>
                    <i className={`bx ${item.featured ? 'bxs-check-circle' : 'bx-circle'}`}></i>
                    {item.featured ? 'Featured' : 'Regular'}
                  </FeaturedBadge>
                </td>
                <td>
                  <ActionBtn onClick={() => { setSelectedAnnouncement(item); setShowViewModal(true); }}>
                    <i className='bx bx-show'></i>
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
            <NewAnnouncement onSuccess={() => setShowAddModal(false)} onUpdate={handleUpdate} />
          </ModalContent>
        </ModalOverlay>
      )}

      {showViewModal && selectedAnnouncement && (
        <ModalOverlay>
          <ModalContent>
            <ActionBtn
              onClick={() => setShowViewModal(false)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', margin: 0 }}
            >
              <i className='bx bx-x'></i>
            </ActionBtn>
            <SeeAnnouncements
              id={selectedAnnouncement._id}
              announcements={selectedAnnouncement.announcement}
              featured={selectedAnnouncement.featured.toString()}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {showDeleteModal && (
        <ConfirmationModal
          item={itemToDelete ? { title: itemToDelete.announcement?.[0]?.substring(0, 30) + '...' } : null}
          onDelete={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </PageContainer>
  );
};

export default Announcements;
