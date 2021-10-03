import { confirmable, createConfirmation } from "react-confirm";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

type ConfirmationProps = {
  okLabbel: string;
  cancelLabel: string;
  title: string;
  confirmation: string;
  show: boolean;
  proceed: (action: boolean) => void; // called when ok button is clicked.
  enableEscape: boolean;
};

const Confirmation = ({
  okLabbel,
  cancelLabel,
  title,
  confirmation,
  show,
  enableEscape,
  proceed,
}: ConfirmationProps) => {
  return (
    <Dialog
      open={show}
      onClose={() => proceed(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{confirmation}</DialogTitle>
      <DialogContent>{title}</DialogContent>
      <DialogActions>
        <Button onClick={() => proceed(false)} color="primary">
          Disagree
        </Button>
        <Button
          onClick={() => proceed(true)}
          variant="contained"
          color="secondary"
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const confirm = (
  confirmation: string,
  title: string,
  proceedLabel = "OK",
  cancelLabel = "cancel",
  options = {}
) => {
  return createConfirmation(confirmable(Confirmation))({
    confirmation,
    title,
    proceedLabel,
    cancelLabel,
    ...options,
  });
};

export default confirm;
