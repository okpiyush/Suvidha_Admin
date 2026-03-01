import React from 'react';
import styled from 'styled-components';

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

const ContentCard = styled.div`
  background: var(--bg-main);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }

  .label {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-main);
  }
`;

const AnnouncementList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AnnouncementItem = styled.li`
  padding: 1rem;
  background: white;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  color: var(--text-main);
  line-height: 1.5;
  display: flex;
  gap: 0.75rem;

  i {
    color: var(--primary);
    margin-top: 0.25rem;
  }
`;

const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${props => props.featured ? 'var(--primary)' : 'var(--bg-main)'};
  color: ${props => props.featured ? 'white' : 'var(--text-muted)'};
  border: 1px solid ${props => props.featured ? 'var(--primary)' : 'var(--border)'};
`;

const SeeAnnouncements = ({ id, announcements, featured }) => {
    return (
        <div>
            <ModalHeader>
                <h2>Announcement Cluster</h2>
                <p>Broadcast details and configuration</p>
            </ModalHeader>

            <ContentCard>
                <DetailItem>
                    <span className="label"><i className='bx bx-fingerprint'></i> Cluster ID</span>
                    <span className="value" style={{ fontFamily: 'monospace', opacity: 0.7 }}>{id}</span>
                </DetailItem>
                <DetailItem>
                    <span className="label"><i className='bx bx-star'></i> Priority Status</span>
                    <Badge featured={featured}>
                        {featured ? 'High Priority' : 'Standard'}
                    </Badge>
                </DetailItem>
            </ContentCard>

            <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Message Content
                </h4>
                <AnnouncementList>
                    {announcements && announcements.length > 0 ? (
                        announcements.map((item, index) => (
                            <AnnouncementItem key={index}>
                                <i className='bx bx-right-arrow-alt'></i>
                                <span>{item}</span>
                            </AnnouncementItem>
                        ))
                    ) : (
                        <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
                            No message content available for this cluster.
                        </p>
                    )}
                </AnnouncementList>
            </div>
        </div>
    );
};

export default SeeAnnouncements;