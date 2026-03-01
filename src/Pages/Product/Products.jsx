import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';
import AddProductModal from '../../Components/Modals/AddProductModal';
import ConfirmationModal from '../../Components/Modals/confirmationModal';
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
`;

const TableCard = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th {
    text-align: left;
    padding: 1rem 1.5rem;
    background: var(--bg-main);
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
  }

  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.875rem;
    color: var(--text-main);
  }

  tr:hover td {
    background: var(--bg-main);
  }
`;

const ProductImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--bg-main);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  margin-right: 0.5rem;
  border: none;
  cursor: pointer;
  background: ${props => props.variant === 'danger' ? '#fee2e2' : 'var(--primary-light)'};
  color: ${props => props.variant === 'danger' ? 'var(--danger)' : 'var(--primary)'};
  transition: var(--transition);

  &:hover {
    background: ${props => props.variant === 'danger' ? 'var(--danger)' : 'var(--primary)'};
    color: white;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: var(--shadow-xl);
`;

const Products = () => {
  const url = 'http://localhost:5005/api/products/';
  const { loginData } = useContext(LoginContext);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
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
    try {
      await axios.delete(`http://localhost:5005/api/products/${itemToDelete._id}`, {
        headers: { "token": `Bearer ${loginData.accessToken}` }
      });
      setData(data.filter(item => item._id !== itemToDelete._id));
      setShowDeleteModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductAdded = (newProduct) => {
    setData([newProduct, ...data]);
    setShowAddModal(false);
  };

  if (loading) return <Loading />;

  return (
    <PageContainer>
      <PageHeader>
        <h1 className="page-title">Inventory Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <i className='bx bx-plus' style={{ marginRight: '0.5rem' }}></i> Add Product
        </button>
      </PageHeader>

      <TableCard>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ProductImg>
                      <img src={item.img} alt={item.title} />
                    </ProductImg>
                    <span style={{ fontWeight: 600 }}>{item.title}</span>
                  </div>
                </td>
                <td>{item.categories?.join(', ') || 'N/A'}</td>
                <td>₹{item.price}</td>
                <td>{item.createdAt?.substring(0, 10)}</td>
                <td>
                  <Link to={`/product/${item._id}`}>
                    <ActionBtn><i className='bx bx-show'></i></ActionBtn>
                  </Link>
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
            <button
              onClick={() => setShowAddModal(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', border: 'none', background: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <i className='bx bx-x'></i>
            </button>
            <AddProductModal
              onSuccess={() => setShowAddModal(false)}
              onUpdate={handleProductAdded}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      {showDeleteModal && (
        <ConfirmationModal
          item={itemToDelete}
          onDelete={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </PageContainer>
  );
};

export default Products;
