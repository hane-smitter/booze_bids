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
import EditModal from './Product/modals/Edit';
import ShowFeedback from "src/utils/ShowFeedback";
import { unsetErr, unsetStatus } from "src/actions/errors";
import useShowFeedback from 'src/utils/ShowFeedback/useShowFeedback';
import useModal from 'src/utils/modal/useModal';

function spreadAttr(index) {
  return {
    id: `product-tab-${index}`,
    "aria-controls": `product-tabpanel-${index}`,
  };
}

const Products = () => {
  const dispatch = useDispatch();
  const [view, setView] = React.useState(0);
  const [imgPrev, setImgPrev] = useState('');
  const [imgObj, setImgObj] = useState({});
  const [product, setProduct] = useState({});
  const { alertOpen, msg, errAlertOpen, errMsg, severity, close } = useShowFeedback();
  const { showModal, toggle } = useModal();
  let count = 0;

  useEffect(() => {
    return () => {
      dispatch(unsetErr());
      dispatch(unsetStatus());
    }
  }, []);

  const handleChange = (event, newValue) => {
    setView(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
    <Modal
      title="Edit Product"
      isVisible={showModal}
      close={toggle}
    >
      <EditModal product={product} imgObj={imgObj} imgPrev={imgPrev} setImgPrev= {setImgPrev} toggle={toggle} dispatch={dispatch} />
    </Modal>
    <ShowFeedback
      alertOpen={alertOpen}
      close={close}
      severity={severity}
      msg={msg}
    />
    {errMsg.map((error) => (
        <ShowFeedback
        key={count++}
          alertOpen={errAlertOpen}
          close={close}
          severity={severity}
          msg={error.msg}
          title="Ooops!"
        />
      ))}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={view}
          onChange={handleChange}
          aria-label="Product view tabs"
        >
          <Tab label="All Products" {...spreadAttr(0)} />
          <Tab label="Biddable Products" {...spreadAttr(1)} />
          <Tab label="UnBiddable Products" {...spreadAttr(2)} />
        </Tabs>
      </Box>
      <ProductTabs value={view} index={0}>
        <AllProducts imgObj={imgObj} setImgObj={setImgObj} imgPrev={imgPrev} setImgPrev= {setImgPrev} setProduct={setProduct} toggle={toggle} dispatch={dispatch} />
      </ProductTabs>
      <ProductTabs value={view} index={1}>
        <BiddableProducts /* setModalComponent={setModalComponent} */ />
      </ProductTabs>
      <ProductTabs value={view} index={2}>
        <UnbiddableProducts /* setModalComponent={setModalComponent} */ />
      </ProductTabs>
    </Box>
  );
};

export default Products;
