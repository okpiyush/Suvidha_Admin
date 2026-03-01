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
  min-height: 120px;
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

const AddEmailModal = ({ onSuccess, onUpdate }) => {
    const { loginData } = useContext(LoginContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        designation: '',
        subject: '',
        desc: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.designation || !formData.subject || !formData.desc) {
            alert("Please fill all required fields");
            return;
        }

        setLoading(true);
        const payload = {
            name: formData.name,
            desig: formData.designation,
            subject: formData.subject,
            body: formData.desc
        };

        const headers = { "token": `Bearer ${loginData.accessToken}` };
        const url = "http://localhost:5005/api/mail/bulkmail";

        try {
            await axios.post(url, payload, { headers });
            if (onUpdate) onUpdate();
            onSuccess();
        } catch (err) {
            console.error("Bulk email error:", err);
            alert("Failed to send bulk email. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <ModalHeader>
                <h2>Broadcast Email</h2>
                <p>Send a global notification to all subscribers</p>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Sender Name</Label>
                    <Input
                        name="name"
                        placeholder="e.g. Admin Team"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Designation</Label>
                    <Input
                        name="designation"
                        placeholder="e.g. Operations Manager"
                        value={formData.designation}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email Subject</Label>
                    <Input
                        name="subject"
                        placeholder="Important Update Regarding..."
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email Content</Label>
                    <Textarea
                        name="desc"
                        placeholder="Write your message here..."
                        value={formData.desc}
                        onChange={handleChange}
                    />
                </FormGroup>
                <SubmitBtn type="submit" disabled={loading}>
                    {loading ? (
                        <i className='bx bx-loader-alt bx-spin'></i>
                    ) : (
                        <i className='bx bx-send'></i>
                    )}
                    {loading ? 'Sending...' : 'Send Broadcast'}
                </SubmitBtn>
            </Form>
        </div>
    );
};

export default AddEmailModal;