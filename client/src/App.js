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

// let mockJobs = [];
// let searchKeywords = [];
// let filteredmockJobs = [];
// let lastFilteredJobs = [];

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
  const errors = {}

  const handleClose = () => {
    setOpen(false);
  };

  // submit user email address and check email validation
  const onSubmit = () => {

    if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      errors.email = 'Invalid email address';

      console.log(errors.email)
    }
    else if (email === '') {
      setOpen(true)
    }
    else setOpen(false);
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
                {/* #TODO Validation message here */}
                <TextField
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
                submit
              </Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </div>
  )
}

export default App;
// export default class App extends React.Component {


//   state = {
//     mockJobs: [],
//     isRemote: false,
//     lastFilteredJobs: [],
//   }

//   componentDidMount() {

//     this.handleLoad();
//   }

//   handleLoad = async () => {
//     const proxyurl = "https://cors-anywhere.herokuapp.com/";
//     const url = "https://jobs.github.com/positions.json"; // site that doesn’t send Access-Control-*
//     fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
//       .then(response => response.json())
//       .then(contents => {

//         // convert objects to array
//         mockJobs = Object.keys(contents).map((key) => {
//           return contents[key];
//         });

//         this.setState({
//           mockJobs: this.state.mockJobs,
//         });
//         mockJobs = mockJobs.sort((a, b) => {
//           return a.diffDays - b.diffDays;
//         });

//         // filter jobs by these keywords
//         mockJobs = mockJobs.filter(job => {
//           let jobTitle = job.title.toLowerCase();
//           if (
//             jobTitle.includes('senior') || jobTitle.includes('manager') || jobTitle.includes('sr.')
//             || jobTitle.includes('architect') || jobTitle.includes('lead') || jobTitle.includes('director')
//             || jobTitle.includes('coach') || jobTitle.includes('master') || jobTitle.includes('specialist')
//           ) { return false; }
//           else {
//             return true;
//           }
//         });

//         this.setState({
//           mockJobs: this.state.mockJobs,
//         });
//       });
//   }

//   handleClick = () => {
//     this.setState({
//       isRemote: !this.state.isRemote,
//     });

//     if (!this.state.isRemote) {
//       mockJobs = mockJobs.filter(job => {
//         const jobLocation = job.location.toLowerCase();
//         if (jobLocation.includes('remote')) {
//           return true;
//         }
//         return false;
//       });
//     }
//     else this.handleLoad();
//   }


//   //check to delete letter
//   handleChange = (e) => {

//     const keyword = e.target.value.toLowerCase();
//     searchKeywords.push(keyword);

//     if (searchKeywords.length > 1) {

//       if (searchKeywords[searchKeywords.length - 2].length > keyword.length) {

//         filteredmockJobs = mockJobs.filter(job => {
//           const title = job.title.toLowerCase();

//           if (title.includes(keyword)) {
//             lastFilteredJobs = filteredmockJobs;
//             return true;
//           }
//           else {
//             return null;
//           }
//         });
//       }
//       else {

//         filteredmockJobs = mockJobs.filter(job => {
//           const title = job.title.toLowerCase();

//           if (title.includes(keyword)) {
//             lastFilteredJobs = filteredmockJobs;
//             return true;
//           }
//           else {
//             return false;
//           }
//         });
//       }
//     }

//     this.setState({
//       mockJobs: mockJobs,
//       lastFilteredJobs: lastFilteredJobs,
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         {/* <Jobs jobs={mockJobs} lastFilteredJobs={lastFilteredJobs} handleClick={this.handleClick} handleChange={this.handleChange} /> */}
//         <Jobs jobs={jobList}/>
//       </div>
//     )
//   }
// }