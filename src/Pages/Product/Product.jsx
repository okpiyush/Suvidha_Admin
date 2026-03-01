import React, { useContext } from 'react';

import { useParams, Link } from "react-router-dom";
import styled from 'styled-components';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';
import Loading from '../../Components/Loading/Loading';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.4s ease-out;
`;

const ProductCard = styled.div`
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-md);
  display: flex;
  overflow: hidden;
  margin-top: 2rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ImageSection = styled.div`
  flex: 1;
  background: var(--bg-main);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
  }
`;

const InfoSection = styled.div`
  flex: 1.2;
  padding: 3rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 0.5rem;
    color: var(--text-main);
  }

  .price {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    margin-bottom: 2rem;
  }

  .details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 2.5rem;

    .item {
      .label {
        font-size: 0.75rem;
        text-transform: uppercase;
        color: var(--text-muted);
        font-weight: 700;
        margin-bottom: 0.25rem;
      }
      .value {
        font-size: 1rem;
        color: var(--text-main);
        font-weight: 600;
      }
    }
  }

  .description {
    margin-bottom: 2.5rem;
    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--text-muted);
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .text {
      line-height: 1.6;
      color: var(--text-main);
    }
  }
`;

const Product = () => {
  const { id } = useParams();
  const { loginData } = useContext(LoginContext);
  const url = `${API_BASE_URL}/products/find/${id}`;
  const product = useHook(url, loginData?.accessToken);

  if (!product) return <Loading />;

  return (
    <PageContainer>
      <div className="page-header">
        <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <i className='bx bx-left-arrow-alt'></i> Back to Inventory
        </Link>
      </div>

      <ProductCard>
        <ImageSection>
          <img src={product.img} alt={product.title} />
        </ImageSection>
        <InfoSection>
          <h1>{product.title}</h1>
          <div className="price">₹{product.price}</div>

          <div className="details-grid">
            <div className="item">
              <div className="label">Categories</div>
              <div className="value">{product.categories?.join(', ') || 'N/A'}</div>
            </div>
            <div className="item">
              <div className="label">Size</div>
              <div className="value">{product.size || 'Standard'}</div>
            </div>
            <div className="item">
              <div className="label">Listed Date</div>
              <div className="value">{product.createdAt?.substring(0, 10)}</div>
            </div>
            <div className="item">
              <div className="label">In Stock</div>
              <div className="value" style={{ color: 'var(--success)' }}>Yes</div>
            </div>
          </div>

          <div className="description">
            <div className="label">Description</div>
            <div className="text">{product.desc || 'No description provided.'}</div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
            <button className="btn btn-primary" style={{ flex: 1 }}>Edit Product</button>
            <button className="btn" style={{ flex: 1, background: '#fee2e2', color: 'var(--danger)' }}>Delete</button>
          </div>
        </InfoSection>
      </ProductCard>
    </PageContainer>
  );
};

export default Product;