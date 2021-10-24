import { useEffect, useState } from "react";
import { useStateWithCallbackLazy } from 'use-state-with-callback'
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector, batch } from "react-redux";
import { decode } from "html-entities";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
  Chip,
  Container,
  Avatar,
  Paper
} from "@mui/material";
import { getProductBidWinners } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import ShowFeedback from "src/utils/ShowFeedback";
// import ActionsToolBar from './ActionsToolBar';
import { Outlet } from "react-router";
import imgDefault from "src/images/products/default.jpeg";

  
  const WinnersListResults = ({ ...rest }) => {
    const dispatch = useDispatch();
    const { bidWinners , loading, err, status } = useSelector((state) => state.app);
  
    console.log(bidWinners)

    function fetchWinners() {
      dispatch(getProductBidWinners());
    }
  
    useEffect(() => {
      fetchWinners();
      return () => {
        dispatch(unsetErr());
        dispatch(unsetStatus());
      };
    }, []);

    useEffect(() => {
      setAlertOpen(Boolean(status?.info));
    }, [status]);
    useEffect(() => {
      setErrAlertOpen(Boolean(err.length > 0));
    }, [err]);
  
    const [ alertOpen, setAlertOpen ] = useState(Boolean(status?.info));
    const [ errAlertOpen, setErrAlertOpen ] = useState(Boolean(err.length > 0));
    const [ showModal, setShowModal ] = useState(false);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
  
    
    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
    
  return (
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Card {...rest}>
            {loading && <CircularProgress />}
            
            <ShowFeedback
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
              severity={status?.info?.severity}
              msg={status?.info?.message}
            />
            {err?.length > 0 &&
              err?.map((error) => (
                <ShowFeedback
                  alertOpen={errAlertOpen}
                  setAlertOpen={setErrAlertOpen}
                  severity={"error"}
                  msg={error.msg}
                  title={error.title ?? "Ooops"}
                />
              ))}
            {bidWinners?.length == 0 ?
            (<Paper variant="outlined">
              <Typography
                variant="h5"
                color="textSecondary"
                paddingX={2}
                align="center"
              >
                Sorry! No winners are available!!
              </Typography>
            </Paper>)
            : (
              <>
                <PerfectScrollbar>
                  <Box sx={{ minWidth: 1050 }}>
                    {/* <ActionsToolBar
                      selectedBidIdsLength={selectedBidIds.length}
                      handleEditModal={handleEditModal}
                    /> */}
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Item Name</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Bids Registered</TableCell>
                          <TableCell>No. of bidders</TableCell>
                          <TableCell>Total Amount from Bids</TableCell>
                          <TableCell>Target Amount</TableCell>
                          <TableCell>Slots</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bidWinners?.map((bid, index) => {
                            return (
                              <TableRow key={index} >
                                <TableCell align="left">
                                  <Box
                                    sx={{
                                      alignItems: "left",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography variant="caption" color="textPrimary" component="p">
                                      <b>RRP:</b> {bid.product?.cost}
                                    </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell align="left">
                                  <Box
                                    sx={{
                                      alignItems: "left",
                                      display: "flex",
                                      justifyContent: "left"
                                    }}
                                  >
                                    <Typography color="textPrimary" variant="body1">
                                      {bid.prodbids.reduce((prev, curr) => prev + curr.bidsCount, 0)}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell align="left">
                                  <Box
                                    sx={{
                                      alignItems: "left",
                                      display: "flex",
                                      justifyContent: "left"
                                    }}
                                  >
                                    <Typography color="textPrimary" variant="body1">
                                      {bid.prodbids.length}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell align="left">
                                  <Box
                                    sx={{
                                      alignItems: "left",
                                      display: "flex",
                                      justifyContent: "left"
                                    }}
                                  >
                                    <Typography color="textPrimary" variant="body1">
                                      {bid.prodbids.reduce((prev, curr) => prev + curr.bidAmountTotal,0)}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell align="left">
                                  <Box
                                    sx={{
                                      alignItems: "left",
                                      display: "flex",
                                      justifyContent: "left"
                                    }}
                                  >
                                    <Typography color="textPrimary" variant="body1">
                                      {bid.targetAmount}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell>
                                  <Typography  variant="caption" component="p" color="textPrimary">
                                    Slots: {bid.slots}
                                  </Typography>
                                  <Typography  variant="caption" component="p" color="textPrimary">
                                    Extra slots: {bid.extraSlots}
                                  </Typography>
                                </TableCell>                                
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </Box>
                </PerfectScrollbar>
                <TablePagination
                  component="div"
                  count={bidWinners?.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25]}
                />
              </>
            )}
          </Card>
          <Outlet/>
        </Container>
      </Box>
  );
};

export default WinnersListResults;
