import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tabs,
  Tab,
} from '@mui/material';

import ProductTabs from './ProductTabs';
import AllProducts from './AllProducts';
import BiddableProducts from './BiddableProducts';
import UnbiddableProducts from './UnbiddableProducts';
import Modal from "src/utils/modal";
import ShowFeedback from "src/utils/ShowFeedback";
import { unsetErr, unsetStatus } from "src/actions/errors";

function spreadAttr(index) {
  return {
    id: `product-tab-${index}`,
    "aria-controls": `product-tabpanel-${index}`,
  };
}

const Products = () => {
  const dispatch = useDispatch();
  const { err, status } = useSelector((state) => state.app);
  const [view, setView] = React.useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [alertOpen, setAlertOpen] = useState(Boolean(status?.info));
  const [errAlertOpen, setErrAlertOpen] = useState(Boolean(err.length > 0));

  useEffect(() => {
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

  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
          title="Ooops!"
        />
      ))}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={view}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="All Products" {...spreadAttr(0)} />
          <Tab label="Biddable Products" {...spreadAttr(1)} />
          <Tab label="UnBiddable Products" {...spreadAttr(2)} />
        </Tabs>
      </Box>
      <ProductTabs value={view} index={0}>
        <AllProducts setModalComponent={setModalComponent} setShowModal={setShowModal} />
      </ProductTabs>
      <ProductTabs value={view} index={1}>
        <BiddableProducts setModalComponent={setModalComponent} />
      </ProductTabs>
      <ProductTabs value={view} index={2}>
        <UnbiddableProducts setModalComponent={setModalComponent} />
      </ProductTabs>
    </Box>
  );
};

export default Products;
