import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
// import MetricsView from '../components/MetricsView';

const DashboardPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Metrics View" />
        <Tab label="Analytics View" />
      </Tabs>

      {/* {tabIndex === 0 && <MetricsView />}
      {tabIndex === 1 && <AnalyticsView />} */}
    </Box>
  );
};

export default DashboardPage;
