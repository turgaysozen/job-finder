import React from 'react';
import './App.css';
import Jobs from "../src/Components/Jobs";

const JOB_API_URL = 'https://evening-river-70046.herokuapp.com/jobs';

// fetch jobs by our api
async function JobFetch(updateCb) {
  const res = await fetch(JOB_API_URL);
  const json = await res.json();
  updateCb(json);
}

function App() {
  const [jobList, updateJobs] = React.useState([]);
  console.log(jobList)

  // submit user email address and check email validation
  // const onSubmit = () => {

  //   if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {

  //     label = "Error";
  //     helperText = "Invalid Email Address";
  //     console.log(helperText)
  //   }
  //   else if (email === '') {

  //     label = "Error";
  //     helperText = "Invalid Email Address";
  //     setOpen(true)
  //   }
  //   else {
  //     setOpen(false)
  //     console.log(email)
  //     label = "";
  //     helperText = "";
  //   }
  // }

  React.useEffect(() => {
    JobFetch(updateJobs);
    //it shows subscribe form to user 1 minute later and clear itself
    // const inter = setInterval(() => {
    //   setOpen(true);
    //   clearInterval(inter);
    // }, 1000 );
  }, []);

  return (
    <div className='App'>
      <Jobs jobs={jobList} />
    </div>
  )
}

export default App;