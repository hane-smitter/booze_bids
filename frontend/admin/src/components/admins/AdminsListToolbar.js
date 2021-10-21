import { useNavigate } from "react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import { Search as SearchIcon } from "react-feather";

const AdminsListToolbar = (props) => {
  const navigate = useNavigate();
  return (
    <Box {...props}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        {/* <Button>Import</Button>
        <Button sx={{ mx: 1 }}>Export</Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigate("create-admin")}
        >
          Add Admin
        </Button>
      </Box>
      {/* <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search category"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box> */}
    </Box>
  );
};

export default AdminsListToolbar;
