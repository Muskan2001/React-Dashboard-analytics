import { Container, Tab, Tabs } from "@mui/material";
import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import FilterPanel from "../components/FilterPanel";

function DashboardPage() {
  const [tab, setTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleUserSelect = (userId: number) => {
    setSelectedUser(userId);
  };

  return (
    <>
      <TopBar onUserSelect={handleUserSelect} />
      <Container maxWidth="lg" sx={{ paddingY: 4 }}>
        <Tabs value={tab} onChange={handleTabChange}>
          <Tab label="Metrics View" />
          <Tab label="Analytics View" />
        </Tabs>
        {tab === 0 && (
          <>
            <div>Metrics View </div>
          </>
        )}
        {tab === 1 && (
          <>
            <div>Analytics View </div>
          </>
        )}
      </Container>
    </>
  );
}

export default DashboardPage;
