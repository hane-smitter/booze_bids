import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';

import StoresListToolbar from '../components/stores/StoresListToolbar';
import { Outlet } from 'react-router';

const StoresList = () => (
  <>
    <Helmet>
      <title>Stores | BidsPesa</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <StoresListToolbar />
        <Box sx={{ pt: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  </>
);

export default StoresList;
