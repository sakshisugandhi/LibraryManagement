import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";

const ConfirmDialog = (props) => {

const{confirmDialog , setConfirmDialog} = props

  return (
<Dialog open={confirmDialog.isOpen }>
    <DialogTitle> </DialogTitle>
    <DialogContent>
        <Typography variant = "h6">
        {confirmDialog.title}
        </Typography>
        <Typography variant = "subtitle2">
           {confirmDialog.subTitle}
        </Typography>
    </DialogContent>
    <DialogActions> 
        <Button variant="contained" onClick={()=>setConfirmDialog({...confirmDialog , isOpen:false})}>No</Button>
         <Button variant="contained" color="error" onClick={confirmDialog.onConfirm}>Yes</Button>
         </DialogActions>
</Dialog>
  );
};
 
export default ConfirmDialog;