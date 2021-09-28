import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";
// import { useSelector, useDispatch } from "react-redux";

function ProductTabs(props) {
    const { children, value, index, ...others } = props;
    /* const products = useSelector((state) => state.app.products);
    const loading = useSelector((state) => state.app.loading); */
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`products-tabpanel-${index}`}
        aria-labelledby={`products-tab-${index}`}
        {...others}
      >
        {value === index && (
          <Box sx={{ pt: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  ProductTabs.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  export default ProductTabs;