import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const FormContainer = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    color: var(--text-main);
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  grid-column: ${props => props.fullWidth ? '1 / -1' : 'auto'};

  label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  font-family: inherit;
  font-size: 0.875rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  font-family: inherit;
  font-size: 0.875rem;
  min-height: 100px;
  resize: vertical;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-light);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  background: var(--grad-primary);
  color: white;
  padding: 0.875rem;
  border-radius: var(--radius-md);
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: var(--text-muted);
  }
`;

const Loader = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

const Message = styled.div`
  padding: 0.75rem;
  border-radius: var(--radius-sm);
  margin-top: 1rem;
  font-size: 0.875rem;
  background: ${props => props.type === 'error' ? '#fee2e2' : '#ecfdf5'};
  color: ${props => props.type === 'error' ? 'var(--danger)' : 'var(--success)'};
  border: 1px solid ${props => props.type === 'error' ? '#fecaca' : '#d1fae5'};
  grid-column: 1 / -1;
`;

const ImagePreview = styled.div`
  grid-column: 1 / -1;
  width: 100%;
  height: 200px;
  border-radius: var(--radius-md);
  border: 2px dashed var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg-main);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .placeholder {
    color: var(--text-muted);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
  }
`;

const AddProductModal = ({ onSuccess, onUpdate }) => {
    const { loginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        categories: '',
        img: '',
        size: '',
        desc: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'img') setImageError(false);
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!formData.name || !formData.price || !formData.img || !formData.categories) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        const payload = {
            title: formData.name,
            desc: formData.desc,
            categories: formData.categories.split(/[ ,]+/).filter(Boolean),
            size: formData.size,
            img: formData.img,
            price: Number(formData.price),
            featured: true
        };

        const headers = {
            token: `Bearer ${loginData.accessToken}`
        };

        const url = "https://businessmanagementsolutionapi.onrender.com/api/products/";

        try {
            const response = await axios.post(url, payload, { headers });
            if (onUpdate) onUpdate(response.data);
            onSuccess();
        } catch (err) {
            console.error(err);
            setError("Failed to add product. Please check the information and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormContainer>
            <h2>Add New Product</h2>

            <Form onSubmit={handleSubmit}>
                <ImagePreview>
                    {formData.img && !imageError ? (
                        <img
                            src={formData.img}
                            alt="Preview"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="placeholder">
                            <i className='bx bx-image-add' style={{ fontSize: '3rem' }}></i>
                            {imageError ? 'Invalid image URL' : 'Image Preview'}
                        </div>
                    )}
                </ImagePreview>

                <FormGroup>
                    <label htmlFor="name">Product Title*</label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Classic Denim Jacket"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="price">Price (₹)*</label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="e.g. 1999"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup fullWidth>
                    <label htmlFor="img">Image URL*</label>
                    <Input
                        id="img"
                        name="img"
                        placeholder="e.g. https://images.unsplash.com/photo-..."
                        value={formData.img}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="categories">Categories (comma or space separated)*</label>
                    <Input
                        id="categories"
                        name="categories"
                        placeholder="e.g. Men Outerwear Denim"
                        value={formData.categories}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <label htmlFor="size">Size</label>
                    <Input
                        id="size"
                        name="size"
                        placeholder="e.g. S, M, L, XL"
                        value={formData.size}
                        onChange={handleChange}
                    />
                </FormGroup>

                <FormGroup fullWidth>
                    <label htmlFor="desc">Description</label>
                    <Textarea
                        id="desc"
                        name="desc"
                        placeholder="Provide a detailed description of the product..."
                        value={formData.desc}
                        onChange={handleChange}
                    />
                </FormGroup>

                {error && <Message type="error">{error}</Message>}

                <SubmitButton type="submit" disabled={loading}>
                    {loading ? <Loader /> : <i className='bx bx-check-double'></i>}
                    {loading ? 'Creating Product...' : 'Create Product'}
                </SubmitButton>
            </Form>
        </FormContainer>
    );
};

export default AddProductModal;