import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

export interface ConfirmationOptions {
  title: string;
  description: string;
}

interface ConfirmationModalProps extends ConfirmationOptions {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    open,
    title,
    description,
    onSubmit,
    onClose
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={onSubmit}>
                    Cancel
                </Button>
                <Button color="primary" variant="contained"  onClick={onClose} autoFocus={true}>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export { ConfirmationModal };