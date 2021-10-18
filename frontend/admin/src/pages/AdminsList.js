import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';

import AdminsListToolbar from '../components/admins/AdminsListToolbar';
import { Outlet } from 'react-router';

const AdminsList = () => (
  <>
    <Helmet>
      <title>Admins | BidsPesa</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <AdminsListToolbar />
        <Box sx={{ pt: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  </>
);

export default AdminsList;
