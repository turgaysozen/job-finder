import React from 'react';
import './App.css';
import Jobs from "../src/Components/Jobs";

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
  const [jobList, updateJobs] = React.useState([]);

  React.useEffect(() => {
    JobFetch(updateJobs);
  }, []);

  return (
    <div className='App'>
      <Jobs jobs={jobList} />
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