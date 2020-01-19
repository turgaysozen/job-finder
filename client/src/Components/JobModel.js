import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function JobModel({ job, open, handleClose }) {

  if (job.title === '') {
    return <div></div>
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <div>
        <label style={{fontSize:'30px'}}>{job.title}</label>
        {<img style={{ height: '40px', float: "right", marginRight:'50px' }} alt="" src={job.company_logo} />}
          </div></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"
          dangerouslySetInnerHTML={{__html: job.description}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button color="primary">
            <a target={'_blank'} href={job.url}>Apply</a>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}