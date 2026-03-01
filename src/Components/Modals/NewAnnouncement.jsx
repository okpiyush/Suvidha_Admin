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

const InputGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
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
  }
`;

const AddBtn = styled.button`
  padding: 0 1rem;
  border-radius: var(--radius-md);
  border: none;
  background: var(--primary-light);
  color: var(--primary);
  font-weight: 700;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const AnnouncementChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background: var(--bg-main);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .remove {
    color: var(--text-muted);
    cursor: pointer;
    &:hover { color: var(--danger); }
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--bg-main);
  color: var(--text-main);
  font-size: 0.875rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--primary);
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

const NewAnnouncement = ({ onSuccess, onUpdate }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginData } = useContext(LoginContext);

  const addAnnouncement = () => {
    if (!currentLine.trim()) return;
    setAnnouncements([...announcements, currentLine.trim()]);
    setCurrentLine('');
  };

  const removeAnnouncement = (index) => {
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (announcements.length === 0) {
      alert("Please add at least one announcement line");
      return;
    }

    setLoading(true);
    const payload = {
      announcement: announcements,
      featured: featured
    };

    const headers = { "token": `Bearer ${loginData.accessToken}` };
    const url = `${API_BASE_URL}/announcement/`;

    try {
      const response = await axios.post(url, payload, { headers });
      if (onUpdate) onUpdate(response.data);
      onSuccess();
    } catch (err) {
      console.error("Add announcement error:", err);
      alert("Failed to create announcement cluster. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ModalHeader>
        <h2>Broadcast Message</h2>
        <p>Create a series of notifications for the user feed</p>
      </ModalHeader>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Announcement Lines</Label>
          <InputGroup>
            <Input
              placeholder="Type an announcement line..."
              value={currentLine}
              onChange={(e) => setCurrentLine(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAnnouncement())}
            />
            <AddBtn type="button" onClick={addAnnouncement}>
              <i className='bx bx-plus'></i>
            </AddBtn>
          </InputGroup>
        </FormGroup>

        <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '1rem' }}>
          {announcements.map((item, index) => (
            <AnnouncementChip key={index}>
              <span>{item}</span>
              <i className='bx bx-x remove' onClick={() => removeAnnouncement(index)}></i>
            </AnnouncementChip>
          ))}
        </div>

        <FormGroup>
          <Label>Display Priority</Label>
          <Select value={featured} onChange={(e) => setFeatured(e.target.value === 'true')}>
            <option value="false">Regular Announcement</option>
            <option value="true">Featured (High Priority)</option>
          </Select>
        </FormGroup>

        <SubmitBtn type="submit" disabled={loading || announcements.length === 0}>
          {loading ? (
            <i className='bx bx-loader-alt bx-spin'></i>
          ) : (
            <i className='bx bx-megaphone'></i>
          )}
          {loading ? 'Publishing...' : 'Publish Broadcast'}
        </SubmitBtn>
      </Form>
    </div>
  );
};

export default NewAnnouncement;