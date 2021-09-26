import { useEffect, useState } from "react";
import { useStateWithCallbackLazy } from 'use-state-with-callback'
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
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
/* import getInitials from '../../utils/getInitials'; */
import customers from "src/__mocks__/customers";
import { getProducts, getCategories } from "src/actions/products";
import { unsetErr, unsetStatus } from "src/actions/errors";
import Modal from "src/utils/modal";
import EditModal from "./modals/Edit";
import ShowFeedback from "src/utils/ShowFeedback";

const ActionTableToolbar = (props) => {
  const { selectedCategoryIdsLength, handleEditModal } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedCategoryIdsLength > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedCategoryIdsLength > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedCategoryIdsLength} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Categories
        </Typography>
      )}

{selectedCategoryIdsLength == 1 ? (
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEditModal()}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {selectedCategoryIdsLength > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      
    </Toolbar>
  );
};

const CategoriesListResults = ({ ...rest }) => {
  const dispatch = useDispatch();
  const { categories, loading, err, status } = useSelector((state) => state.app);

  function fetchCategories() {
    dispatch(getCategories());
  }

  useEffect(() => {
    fetchCategories();
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    }
  }, []);
  useEffect(() => {
    setAlertOpen(Boolean(status?.info));
  }, [status]);
  useEffect(() => {
    setErrAlertOpen(Boolean(err.length > 0));
  }, [err]);

  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [ alertOpen, setAlertOpen ] = useState(Boolean(status?.info));
  const [ errAlertOpen, setErrAlertOpen ] = useState(Boolean(err.length > 0));
  const [ showModal, setShowModal ] = useState(false);
  const [currentCatIdSelected, setCurrentCatIdSelected] = useStateWithCallbackLazy('');
  const [ modalComponent, setModalComponent ] = useState(null);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;

    if (event.target.checked) {
      newSelectedCategoryIds = categories.map((category) => category._id);
    } else {
      newSelectedCategoryIds = [];
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCategoryIds.indexOf(id);
    /* setCurrentCatIdSelected(id, (current) => {
    }); */
    console.log("Current selected Category id from HANDLE SELECT ONE");
    console.log(id);
    let newSelectedCategoryIds = [];

    if (selectedIndex === -1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds,
        id
      );
      setCurrentCatIdSelected(id, (current) => {
        console.log("Current Category index from HANDLE SELECT ONE state callback func");
        console.log(current);
      });
    } else if (selectedIndex === 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(1)
      );
    } else if (selectedIndex === selectedCategoryIds.length - 1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, selectedIndex),
        selectedCategoryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
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

const handleEditModal = () => {
  setShowModal(true);
  setModalComponent(<EditModal categories={categories} currentCatIdSelected={currentCatIdSelected} setShowModal={setShowModal} fetchCategories={fetchCategories} />);
}

  return (
    <Card {...rest}>
      {loading && <CircularProgress />}
      <Modal isVisible={showModal} toggler={setShowModal} component={modalComponent}/>
      <ShowFeedback alertOpen={alertOpen} setAlertOpen={setAlertOpen} severity={status?.info?.severity} msg={status?.info?.message} />
      {err.length > 0 && (
        err.map((error) => <ShowFeedback alertOpen={errAlertOpen} setAlertOpen={setErrAlertOpen} severity={"error"} msg={error.msg} title="Ooops!" />)
      )}
      {categories.length > 0 && (
        <>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <ActionTableToolbar selectedCategoryIdsLength={selectedCategoryIds.length} handleEditModal={handleEditModal} />
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={
                          selectedCategoryIds.length === categories.length
                        }
                        color="primary"
                        indeterminate={
                          selectedCategoryIds.length > 0 &&
                          selectedCategoryIds.length < categories.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Registration date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    .slice(page * limit, page * limit + limit)
                    .map((category, index) => {
                      const isItemSelected =
                        selectedCategoryIds.indexOf(category._id) !== -1;
                      const labelId = `cat-table-check-${index}`;

                      return (
                        <TableRow
                          hover
                          key={category._id}
                          selected={isItemSelected}
                          onClick={(event) =>
                            handleSelectOne(event, category._id)
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
                                {decode(category.name)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{decode(category.description)}</TableCell>
                          <TableCell align="center">
                            {moment(category.createdAt).format("DD/MM/YYYY")}
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
            count={categories.length}
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

/* CategoriesListResults.propTypes = {
  customers: PropTypes.array.isRequired
}; */

export default CategoriesListResults;
