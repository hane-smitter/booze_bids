import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@mui/material';
import Budget from '../components/dashboard/Budget';
import LatestOrders from '../components/dashboard/LatestOrders';
import LatestProducts from '../components/dashboard/LatestProducts';
import Sales from '../components/dashboard/Sales';
import TasksProgress from '../components/dashboard/TasksProgress';
import TotalCustomers from '../components/dashboard/TotalCustomers';
import TotalProfit from '../components/dashboard/TotalProfit';
import TrafficByDevice from '../components/dashboard/TrafficByDevice';
import { getDashboardData } from "../actions/products";
import { useDispatch, useSelector } from 'react-redux';
import { unsetErr, unsetStatus } from "../actions/errors";
import { useEffect } from 'react';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashData, loading, err, status } = useSelector(
    (state) => state.app
  );

  function fetchData() {
    dispatch(getDashboardData());
  }
  
  useEffect(() => {
    fetchData();
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    };
  }, []);
  return (
  <>
    <Helmet>
      <title>Dashboard | BidsPesa</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget prods={dashData?.products_count ?? 0}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers custs={dashData?.customers_count ?? 0}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress bids={dashData?.active_bids_count ?? 0}/>
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit profits={dashData?.profit ?? 0}  sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts products={dashData?.latest_products} sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders bids={dashData?.latest_bids} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>)
};

export default Dashboard;
