import { useEffect, useState, useCallback, useMemo } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
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
  Paper,
} from "@mui/material";
import { getProductBidWinners } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import ShowFeedback from "src/utils/ShowFeedback";
import useShowFeedback from "src/utils/ShowFeedback/useShowFeedback";
// import ActionsToolBar from './ActionsToolBar';
import { Outlet } from "react-router";
import imgDefault from "src/images/products/default.jpeg";

const WinnersListResults = ({ ...rest }) => {
  const dispatch = useDispatch();
  const {
    bidwinners,
    loading,
    err,
    status,
  } = useSelector((state) => state.app);
  const { alertOpen, msg, errAlertOpen, errMsg, severity, close } =
    useShowFeedback();
  let count = 0;

  const winners = useMemo(() => bidwinners, [bidwinners]);

  const fetchWinners = useCallback(() => {
    dispatch(getProductBidWinners());
  }, []);

  useEffect(() => {
    fetchWinners();
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    };
  }, []);

  const [showModal, setShowModal] = useState(false);
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
            close={close}
            severity={severity}
            msg={msg}
          />
          {errMsg.map((error) => (
            <ShowFeedback
              key={count+1}
              alertOpen={errAlertOpen}
              close={close}
              severity={severity}
              msg={error.msg}
              title="Ooops!"
            />
          ))}
          {winners?.length == 0 ? (
            <Paper variant="outlined">
              <Typography
                variant="h5"
                color="textSecondary"
                paddingX={2}
                align="center"
              >
                Sorry! No winners are available!!
              </Typography>
            </Paper>
          ) : (
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
                        <TableCell>Item min. BidPrice</TableCell>
                        <TableCell>Winner</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Bids Registered</TableCell>
                        <TableCell>Total Amount from Bids</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Delivered</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {winners?.map((winner, index) => {
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
                                      {winner.bid.product?.name}
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
                                      {winner.bid.product?.cost}
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
                                      {winner.bid.bidPrice}
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
                                      {winner.bid.user.fullname}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell>
                                  <Typography  variant="caption" component="p" color="textPrimary">
                                    {winner.bid.user.phone}
                                  </Typography>
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
                                      {winner.bid.bidsCount}
                                    </Typography>
                                  </Box>
                                </TableCell>

                                <TableCell>
                                  <Typography  variant="caption" component="p" color="textPrimary">
                                    {winner.bid.bidAmountTotal}
                                  </Typography>
                                </TableCell>
                                
                                <TableCell>
                                  <Typography  variant="caption" component="p" color="textPrimary">
                                    {winner.bid.user.location}
                                  </Typography>
                                </TableCell>

                                <TableCell>
                                  <Typography  variant="caption" component="p" color="textPrimary">
                                    {winner.delivered}
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
                count={winners?.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
              />
            </>
          )}
        </Card>
        <Outlet />
      </Container>
    </Box>
  );
};

export default WinnersListResults;
