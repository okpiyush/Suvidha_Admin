import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';

const ModalHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  h2 {
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-main);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-main);
  font-size: 0.875rem;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-main);
  font-size: 0.875rem;
  min-height: 80px;
  resize: vertical;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 0.875rem;
  border-radius: var(--radius-md);
  border: none;
  background: var(--primary);
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ColorGrid = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

const ColorSwatch = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  box-shadow: ${props => props.active ? '0 0 0 2px var(--bg-card)' : 'none'};
  transition: var(--transition);

  &:hover {
    transform: scale(1.1);
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StepIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--primary)' : 'var(--bg-main)'};
  color: ${props => props.active ? 'white' : 'var(--text-muted)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  transition: var(--transition);
`;

const PreviewModal = styled.div`
  background: var(--bg-main);
  border-radius: var(--radius-lg);
  padding: 1rem;
  border: 1px solid var(--border);
`;

const MicroSlide = styled.div`
  width: 100%;
  height: 200px;
  background-color: #${props => props.bg || 'f8fafc'};
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  padding: 1.5rem;
  overflow: hidden;

  .text {
    flex: 1;
    h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; }
    p { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem; }
    button { 
      padding: 6px 16px; font-size: 10px; background: var(--accent); 
      color: white; border-radius: 50px; border: none; font-weight: 700;
    }
  }
  .image {
    flex: 1;
    height: 100%;
    img { width: 100%; height: 100%; object-fit: contain; }
  }
`;

const AddSlideModal = ({ onSuccess, onUpdate }) => {
  const { loginData } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [previewError, setPreviewError] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    img: '',
    link: '',
    color: '0f172a',
    desc: ''
  });

  const themes = [
    { name: 'Midnight', value: '0f172a' },
    { name: 'Emerald', value: '10b981' },
    { name: 'Slate', value: '94a3b8' },
    { name: 'Rose', value: 'f43f5e' },
    { name: 'Amber', value: 'f59e0b' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'img') setPreviewError(false);
  };

  const handleCreate = async () => {
    setLoading(true);
    const url = "https://businessmanagementsolutionapi.onrender.com/api/slideshow/";
    const headers = { "token": `Bearer ${loginData.accessToken}` };

    try {
      const response = await axios.post(url, formData, { headers });
      if (onUpdate) onUpdate(response.data);
      onSuccess();
    } catch (err) {
      console.error("Add slide error:", err);
      alert("Failed to add slide. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ModalHeader>
        <h2>{step === 1 ? 'Configure Slide' : 'Confirm Creation'}</h2>
        <p>{step === 1 ? 'Design your featured homepage banner' : 'Review your slide appearance'}</p>
      </ModalHeader>

      <StepHeader>
        <StepIcon active={step === 1}>1</StepIcon>
        <div style={{ width: '40px', height: '2px', background: 'var(--border)' }}></div>
        <StepIcon active={step === 2}>2</StepIcon>
      </StepHeader>

      {step === 1 ? (
        <Form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <FormGroup>
              <Label>Title</Label>
              <Input
                name="title"
                placeholder="New Arrivals"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Theme Presets</Label>
              <ColorGrid>
                {themes.map(t => (
                  <ColorSwatch
                    key={t.value}
                    color={`#${t.value}`}
                    active={formData.color === t.value}
                    onClick={() => setFormData({ ...formData, color: t.value })}
                    title={t.name}
                  />
                ))}
              </ColorGrid>
            </FormGroup>
          </div>

          <FormGroup>
            <Label>Custom Color (Hex Code)</Label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <div style={{ padding: '0.75rem', background: 'var(--bg-main)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontWeight: 700 }}>#</div>
              <Input
                name="color"
                placeholder="0f172a"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
          </FormGroup>

          <FormGroup>
            <Label>Image URL</Label>
            <Input
              name="img"
              placeholder="https://example.com/banner.png"
              value={formData.img}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Link Path</Label>
            <Input
              name="link"
              placeholder="/products"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Description</Label>
            <Textarea
              name="desc"
              placeholder="Describe this section..."
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitBtn type="submit">
            Continue to Preview <i className='bx bx-right-arrow-alt'></i>
          </SubmitBtn>
        </Form>
      ) : (
        <div>
          <PreviewModal>
            <MicroSlide bg={formData.color}>
              <div className="text">
                <h3>{formData.title || 'Headline'}</h3>
                <p>{formData.desc || 'Section description'}</p>
                <button>SHOP NOW</button>
              </div>
              <div className="image">
                <img src={formData.img} alt="Slide Preview" onError={() => setPreviewError(true)} />
              </div>
            </MicroSlide>
            {previewError && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>Warning: Image failing to load</p>}
          </PreviewModal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            <SubmitBtn
              style={{ background: 'var(--bg-main)', color: 'var(--text-main)', border: '1px solid var(--border)' }}
              onClick={() => setStep(1)}
            >
              <i className='bx bx-edit-alt'></i> Edit Details
            </SubmitBtn>
            <SubmitBtn onClick={handleCreate} disabled={loading}>
              {loading ? <i className='bx bx-loader-alt bx-spin'></i> : <i className='bx bx-check-circle'></i>}
              {loading ? 'Saving...' : 'Confirm & Create'}
            </SubmitBtn>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSlideModal;