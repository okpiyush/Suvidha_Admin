import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../../Context/LoginContext';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

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
  background: ${props => props.disabled ? 'var(--bg-main)' : 'white'};
  color: ${props => props.disabled ? 'var(--text-muted)' : 'var(--text-main)'};
  font-size: 0.875rem;
  transition: var(--transition);

  &:focus:not(:disabled) {
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
  background: white;
  color: var(--text-main);
  font-size: 0.875rem;
  min-height: 120px;
  resize: vertical;
  transition: var(--transition);

  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

const Hint = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
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

const SendSingleEmail = ({ email, onSuccess, onUpdate }) => {
  const { loginData } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    designation: '',
    subject: '',
    desc: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.designation || !formData.subject || !formData.desc) {
      alert("Please fill all required fields");
      return;
    }
    if (formData.subject.length <= 5) {
      alert("Subject must be longer than 5 characters");
      return;
    }
    if (formData.desc.length <= 50) {
      alert("Email body must be longer than 50 characters");
      return;
    }

    setLoading(true);
    const payload = {
      email: email,
      name: loginData.username.toUpperCase(),
      desig: formData.designation,
      subject: formData.subject,
      body: formData.desc
    };

    const headers = { "token": `Bearer ${loginData.accessToken}` };
    const url = `${API_BASE_URL}/mail/sendmail`;

    try {
      await axios.post(url, payload, { headers });
      if (onUpdate) onUpdate();
      onSuccess();
    } catch (err) {
      console.error("Single email error:", err);
      alert("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ModalHeader>
        <h2>Contact Subscriber</h2>
        <p>Send a direct message to {email}</p>
      </ModalHeader>

      <Form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormGroup>
            <Label>Recipient</Label>
            <Input value={email} disabled />
          </FormGroup>
          <FormGroup>
            <Label>Sender</Label>
            <Input value={loginData.username.toUpperCase()} disabled />
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Your Designation</Label>
          <Input
            name="designation"
            placeholder="e.g. Account Manager"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Subject Line</Label>
          <Input
            name="subject"
            placeholder="Concise and clear subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <Hint><i className='bx bx-info-circle'></i> Minimum 6 characters</Hint>
        </FormGroup>

        <FormGroup>
          <Label>Message Content</Label>
          <Textarea
            name="desc"
            placeholder="Write your professional message here..."
            value={formData.desc}
            onChange={handleChange}
            required
          />
          <Hint><i className='bx bx-info-circle'></i> Minimum 51 characters ({formData.desc.length}/50)</Hint>
        </FormGroup>

        <SubmitBtn type="submit" disabled={loading}>
          {loading ? (
            <i className='bx bx-loader-alt bx-spin'></i>
          ) : (
            <i className='bx bx-paper-plane'></i>
          )}
          {loading ? 'Sending Message...' : 'Send Message Now'}
        </SubmitBtn>
      </Form>
    </div>
  );
};

export default SendSingleEmail;