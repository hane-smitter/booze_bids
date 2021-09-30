import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { alpha } from "@mui/material/styles";

const ActionsToolBar = (props) => {
    const { selectedBidIdsLength, handleEditModal } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(selectedBidIdsLength > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {selectedBidIdsLength > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedBidIdsLength} selected
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
  
  {selectedBidIdsLength == 1 ? (
          <Tooltip title="Edit">
            <IconButton onClick={() => handleEditModal()}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {selectedBidIdsLength > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        
      </Toolbar>
    );
  };

  export default ActionsToolBar;