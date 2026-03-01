import React, { useContext } from 'react';
import styled from 'styled-components';
import Graph from './Graph';
import Summary from './Summary';
import NewUser from './NewUser';
import NewOrder from './NewOrder';
import { useHook } from '../../Hooks/useHook';
import { LoginContext } from '../../Context/LoginContext';

const DashboardContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: fadeIn 0.4s ease-out;
`;

const SectionHeader = styled.div`
  margin-top: 1rem;
  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-main);
    margin-bottom: 1.5rem;
  }
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ListsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Homey = () => {
  const { loginData } = useContext(LoginContext);

  // Data URLs
  const userStatsUrl = "http://localhost:5005/api/users/stats";
  const productStatsUrl = "http://localhost:5005/api/products/stats";

  // Fetch data
  const userStats = useHook(userStatsUrl, loginData?.accessToken);
  const productStats = useHook(productStatsUrl, loginData?.accessToken);

  // Process data (sort by month ID)
  const sortedUserStats = (userStats || []).slice().sort((a, b) => a._id - b._id);
  const sortedProductStats = (productStats || []).slice().sort((a, b) => a._id - b._id);

  return (
    <DashboardContainer>
      <Summary />

      <SectionHeader>
        <h3>Performance Insights</h3>
        <ChartsGrid>
          <Graph
            data={sortedUserStats}
            title="User Growth"
            dataKey="total"
            grid
          />
          <Graph
            data={sortedProductStats}
            title="Inventory Analytics"
            dataKey="total"
            grid
          />
        </ChartsGrid>
      </SectionHeader>

      <SectionHeader>
        <h3>Real-time Activities</h3>
        <ListsGrid>
          <NewUser />
          <NewOrder />
        </ListsGrid>
      </SectionHeader>

      {/* Spacer for bottom padding */}
      <div style={{ height: '2rem' }} />
    </DashboardContainer>
  );
};

export default Homey;