import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';

import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import { Outlet } from 'react-router';

const CustomerList = () => (
  <>
    <Helmet>
      <title>Customers | Booze Bids</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
