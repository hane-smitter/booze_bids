import { Helmet } from 'react-helmet';
import { Box, Container } from '@mui/material';

import CategoriesListToolbar from '../components/categories/CategoriesListToolbar';
import { Outlet } from 'react-router';

const CategoriesList = () => (
  <>
    <Helmet>
      <title>Categories | BidsPesa</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CategoriesListToolbar />
        <Box sx={{ pt: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  </>
);

export default CategoriesList;
