import React from 'react';
import './App.css';
import Jobs from "../src/Components/Jobs";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const JOB_API_URL = 'http://localhost:3001/jobs';

// fetch jobs by our api
async function JobFetch(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCb(json);
}

function App() {

  const [open, setOpen] = React.useState(false);
  const [jobList, updateJobs] = React.useState([]);
  const [email, setEmail] = React.useState('');

  let [helperText, label] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  // submit user email address and check email validation
  const onSubmit = () => {

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {

      label = "Error";
      helperText = "Invalid Email Address";
      console.log(helperText)
    }
    else if (email === '') {

      label = "Error";
      helperText = "Invalid Email Address";
      setOpen(true)
    }
    else {
      setOpen(false)
      console.log(email)
      label = "";
      helperText = "";
    }
  }

  React.useEffect(() => {
    JobFetch(updateJobs);
    //it shows subscribe form to user 1 minute later and clear itself
    const inter = setInterval(() => {
      setOpen(true);
      clearInterval(inter);
    }, 1000 * 60);
  }, []);

  return (
    <div className='App'>
      <Jobs jobs={jobList} />
      <div>
        <form onSubmit={onSubmit}>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Subscribe to get job list everyday, please enter your email address here.
              </DialogContentText>
              <div>
                {/* #TODO Validation message here -- check https://github.com/react-hook-form/react-hook-form-input */}
                <TextField
                  label={label}
                  // helperText={helperText}
                  // error
                  placeholder="user@email.com"
                  autoFocus
                  fullWidth
                  value={email}
                  onInput={e => setEmail(e.target.value)}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
          </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={e => onSubmit(e)}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </div>
  )
}

export default App;