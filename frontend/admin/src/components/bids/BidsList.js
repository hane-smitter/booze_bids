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
  Avatar
} from "@mui/material";
import { getBids } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import Modal from "src/utils/modal";
import EditModal from "./modals/Edit";
import ShowFeedback from "src/utils/ShowFeedback";
import ActionsToolBar from './ActionsToolBar';
import { Outlet } from "react-router";
import imgDefault from "src/images/products/default.jpeg";

  
  const BidsList = ({ ...rest }) => {
    const dispatch = useDispatch();
    const { bids: { allbids:bids }, loading, err, status } = useSelector((state) => state.app);
  
  
    useEffect(() => {
      dispatch(getBids());
      return () => {
          batch(() => {
            dispatch(unsetErr());
            dispatch(unsetStatus());
          });
      }
    }, []);
    useEffect(() => {
      setAlertOpen(Boolean(status?.info));
    }, [status]);
    useEffect(() => {
      setErrAlertOpen(Boolean(err.length > 0));
    }, [err]);
  
    const [selectedBidIds, setSelectedBidIds] = useState([]);
    const [ alertOpen, setAlertOpen ] = useState(Boolean(status?.info));
    const [ errAlertOpen, setErrAlertOpen ] = useState(Boolean(err.length > 0));
    const [ showModal, setShowModal ] = useState(false);
    const [currentBidIdSelected, setCurrentBidIdSelected] = useStateWithCallbackLazy('');
    const [ modalComponent, setModalComponent ] = useState(null);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
  
    const handleSelectAll = (event) => {
      let newSelectedBidIds;
  
      if (event.target.checked) {
        newSelectedBidIds = bids.map((bid) => bid._id);
      } else {
        newSelectedBidIds = [];
      }
  
      setSelectedBidIds(newSelectedBidIds);
    };
  
    const handleSelectOne = (event, id) => {
      const selectedIndex = selectedBidIds.indexOf(id);
      /* setCurrentCatIdSelected(id, (current) => {
      }); */
      let newSelectedBidIds = [];
  
      if (selectedIndex === -1) {
        newSelectedBidIds = newSelectedBidIds.concat(
          selectedBidIds,
          id
        );
        setCurrentBidIdSelected(id, (current) => {
        //   console.log("Current Category index from HANDLE SELECT ONE state callback func");
        //   console.log(current);
        });
      } else if (selectedIndex === 0) {
        newSelectedBidIds = newSelectedBidIds.concat(
          selectedBidIds.slice(1)
        );
      } else if (selectedIndex === selectedBidIds.length - 1) {
        newSelectedBidIds = newSelectedBidIds.concat(
          selectedBidIds.slice(0, -1)
        );
      } else if (selectedIndex > 0) {
        newSelectedBidIds = newSelectedBidIds.concat(
          selectedBidIds.slice(0, selectedIndex),
          selectedBidIds.slice(selectedIndex + 1)
        );
      }
  
      setSelectedBidIds(newSelectedBidIds);
    };
  
    const handleLimitChange = (event) => {
      setLimit(event.target.value);
    };
  
    const handlePageChange = (event, newPage) => {
      setPage(newPage);
    };
  
  const handleEditModal = () => {
    setShowModal(true);
    setModalComponent(<EditModal bids={bids} currentBidIdSelected={currentBidIdSelected} setShowModal={setShowModal} /* fetchBids={fetchBids} */ />);
  }
    
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
            <Modal
              isVisible={showModal}
              toggler={setShowModal}
              component={modalComponent}
            />
            <ShowFeedback
              alertOpen={alertOpen}
              setAlertOpen={setAlertOpen}
              severity={status?.info?.severity}
              msg={status?.info?.message}
            />
            {err.length > 0 &&
              err.map((error) => (
                <ShowFeedback
                  alertOpen={errAlertOpen}
                  setAlertOpen={setErrAlertOpen}
                  severity={"error"}
                  msg={error.msg}
                  title={error.title ?? "Ooops"}
                />
              ))}
            {bids.length > 0 && (
              <>
                <PerfectScrollbar>
                  <Box sx={{ minWidth: 1050 }}>
                    <ActionsToolBar
                      selectedBidIdsLength={selectedBidIds.length}
                      handleEditModal={handleEditModal}
                    />
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
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bids
                          .slice(page * limit, page * limit + limit)
                          .map((bid, index) => {
                            const isItemSelected =
                              selectedBidIds.indexOf(bid._id) !== -1;
                            const labelId = `bid-table-check-${index}`;

                            return (
                              <TableRow key={index} >
                                <TableCell>
                                <Box
                                  sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                  }}
                                >
                                  <Avatar
                                    src={bid?.product?.image ?? imgDefault}
                                    sx={{ mr: 2 }}
                                  >
                                    {/* {getInitials(product.name)} */}
                                  </Avatar>
                                  <Typography
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {bid?.product?.name}
                                  </Typography>
                                </Box> 
                                </TableCell>

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
                                    <Box
                                    sx={{
                                      alignItems: "left",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography variant="caption" color="textPrimary" component="p">
                                      <b>Bid Price:</b> {bid.bidPrice}
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

                                <TableCell>
                                  <Box
                                    sx={{
                                      alignItems: "left",
                                      display: "flex",
                                    }}
                                  >
                                    <Typography color="textPrimary" variant="body1">
                                    <Chip label={bid.status} color={bid.status == "Active" ? "success" : ""} />
                                    </Typography>
                                  </Box>
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
                  count={bids.length}
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

export default BidsList;
