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
} from "@mui/material";
import { getBids } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import Modal from "src/utils/modal";
import EditModal from "./modals/Edit";
import ShowFeedback from "src/utils/ShowFeedback";
import ActionsToolBar from './ActionsToolBar';


  
  const BidsList = ({ ...rest }) => {
    const dispatch = useDispatch();
    const { bids: { allbids:bids }, loading, err, status } = useSelector((state) => state.app);
  
    function fetchBids() {
      dispatch(getBids());
    }
  
    useEffect(() => {
        fetchBids();
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
                    <TableCell>Retail Price</TableCell>
                    <TableCell>Min. Bid Price</TableCell>
                    <TableCell>Bids Registered</TableCell>
                    <TableCell>No. of bidders</TableCell>
                    <TableCell>Total Amount from Bids</TableCell>
                    <TableCell>Target Amount</TableCell>
                    <TableCell>Slots</TableCell>
                    <TableCell>Extra Slots</TableCell>
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
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {decode(bid.product.name)}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {bid.product.cost}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {bid.bidPrice}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {bid.prodbids.reduce((prev, curr) => prev + curr.bidsCount, 0)}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {bid.prodbids.length}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {bid.prodbids.reduce((prev, curr) => prev + curr.bidAmountTotal,0)}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {bid.targetAmount}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {bid.slots}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              <Typography color="textPrimary" variant="body1" >
                                {bid.extraSlots}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
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
  );
};

export default BidsList;
