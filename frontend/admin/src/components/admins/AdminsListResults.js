import { useEffect, useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { decode } from "html-entities";
import { alpha } from "@mui/material/styles";
import {
  Tooltip,
  Toolbar,
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
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
/* import getInitials from '../../utils/getInitials'; */
import customers from "src/__mocks__/customers";
import { getAdmins } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import Modal from "src/utils/modal";
import EditModal from "./modals/Edit";
import ShowFeedback from "src/utils/ShowFeedback";
import useModal from "src/utils/modal/useModal";
import useShowFeedback from "src/utils/ShowFeedback/useShowFeedback";

const ActionTableToolbar = (props) => {
  const { selectedAdminIdsLength, handleEditModal } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedAdminIdsLength > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedAdminIdsLength > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedAdminIdsLength} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Admins
        </Typography>
      )}

      {selectedAdminIdsLength == 1 ? (
        <Tooltip title="Edit">
          <IconButton onClick={handleEditModal}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {selectedAdminIdsLength > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

const AdminsListResults = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { admins, loading, err, status } = useSelector(
    (state) => state.app
  );

  function fetchAdmins() {
    dispatch(getAdmins());
  }

  useEffect(() => {
    fetchAdmins();
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    };
  }, []);

  const [selectedAdminIds, setSelectedAdminIds] = useState([]);
  const { alertOpen, msg, errAlertOpen, errMsg, severity, close } =
    useShowFeedback();
  const { showModal, toggle } = useModal();
  // const [showModal, setShowModal] = useState(false);
  const [currentCatIdSelected, setCurrentCatIdSelected] =
    useStateWithCallbackLazy("");
  // const [modalComponent, setModalComponent] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  let count = 0;

  const handleSelectAll = (event) => {
    let newSelectedAdminsIds;

    if (event.target.checked) {
      newSelectedAdminsIds = admins.map((category) => category._id);
    } else {
      newSelectedAdminsIds = [];
    }

    setSelectedAdminIds(newSelectedAdminsIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedAdminIds.indexOf(id);
    /* setCurrentCatIdSelected(id, (current) => {
    }); */
    console.log("Current selected Category id from HANDLE SELECT ONE");
    console.log(id);
    let newSelectedAdminsIds = [];

    if (selectedIndex === -1) {
      newSelectedAdminsIds = newSelectedAdminsIds.concat(
        selectedAdminIds,
        id
      );
      setCurrentCatIdSelected(id, (current) => {
        console.log(
          "Current Category index from HANDLE SELECT ONE state callback func"
        );
        console.log(current);
      });
    } else if (selectedIndex === 0) {
      newSelectedAdminsIds = newSelectedAdminsIds.concat(
        selectedAdminIds.slice(1)
      );
    } else if (selectedIndex === selectedAdminIds.length - 1) {
      newSelectedAdminsIds = newSelectedAdminsIds.concat(
        selectedAdminIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedAdminsIds = newSelectedAdminsIds.concat(
        selectedAdminIds.slice(0, selectedIndex),
        selectedAdminIds.slice(selectedIndex + 1)
      );
    }

    setSelectedAdminIds(newSelectedAdminsIds);
    /* 
    setCount(count + 1, (currentCount) => {
      if (currentCount > 1) {
        console.log('Threshold of over 1 reached.');
      } else {
        console.log('No threshold reached.');
      }
    }); */
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  /* const handleEditModal = () => {
  setShowModal(true);
  setModalComponent(<EditModal admins={admins} currentCatIdSelected={currentCatIdSelected} setShowModal={setShowModal} fetchAdmins={fetchAdmins} />);
} */

  return (
    <Card {...rest}>
      {loading && <CircularProgress />}
      {/* <Modal isVisible={showModal} toggler={setShowModal} component={modalComponent}/>
      <ShowFeedback alertOpen={alertOpen} setAlertOpen={setAlertOpen} severity={status?.info?.severity} msg={status?.info?.message} />
      {err.length > 0 && (
        err.map((error) => <ShowFeedback alertOpen={errAlertOpen} setAlertOpen={setErrAlertOpen} severity={"error"} msg={error.msg} title="Ooops!" />)
      )} */}
      <Modal title="Edit Category" isVisible={showModal} close={toggle}>
        {/* <EditModal  toggle={toggle} dispatch={dispatch} /> */}
        <EditModal
          admins={admins}
          currentCatIdSelected={currentCatIdSelected}
          toggle={toggle}
          dispatch={dispatch}
        />
      </Modal>
      <ShowFeedback
        alertOpen={alertOpen}
        close={close}
        severity={severity}
        msg={msg}
      />
      {errMsg.map((error) => (
        <ShowFeedback
          key={++count}
          alertOpen={errAlertOpen}
          close={close}
          severity={severity}
          msg={error.msg}
          title="Ooops!"
        />
      ))}
      {admins.length > 0 && (
        <>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <ActionTableToolbar
                selectedAdminIdsLength={selectedAdminIds.length}
                handleEditModal={toggle}
              />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedAdminIds.length === admins.length
                        }
                        color="primary"
                        indeterminate={
                          selectedAdminIds.length > 0 &&
                          selectedAdminIds.length < admins.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Registration On</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins
                    .slice(page * limit, page * limit + limit)
                    .map((admin, index) => {
                      const isItemSelected =
                        selectedAdminIds.indexOf(admin._id) !== -1;
                      const labelId = `cat-table-check-${index}`;

                      return (
                        <TableRow
                          hover
                          key={admin._id}
                          selected={isItemSelected}
                          onClick={(event) =>
                            handleSelectOne(event, admin._id)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              value="true"
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Typography color="textPrimary" variant="body1">
                                {decode(admin?.firstname)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{decode(admin?.email)}</TableCell>
                          <TableCell align="center">
                            {moment(new Date()).format("DD/MM/YYYY")}
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
            count={admins.length}
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

/* AdminsListResults.propTypes = {
  admins: PropTypes.array.isRequired
}; */

export default AdminsListResults;
