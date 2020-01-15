import React from 'react';
import { Typography } from "@material-ui/core";
import Job from "./Job";

// export default function Jobs({ jobs, lastFilteredJobs, handleClick, handleChange }) {

//     let returnedJobs = lastFilteredJobs.length !== 0 ? lastFilteredJobs : jobs;

//     return (
//         <div className="jobs">
//             <Typography className="JobsTitle" variant='h3'>
//                 Jobs
//             </Typography>
//             <br></br>
//             <Typography variant='h5'>
//                 Options
//             </Typography>
//             <div className="jobfilter">
//                 <label><input onClick={handleClick} style={{ fontSize: '13px', marginTop: '15px' }} type="checkbox" /> Remote</label>
//                 <input onChange={handleChange} placeholder="search job" />
//             </div>
//             <hr />

//             <div className="jobCount">
//                 {returnedJobs.length !== 0 ? 'Total ' + returnedJobs.length + ' Jobs Listed' : null}
//             </div>
//             {
//                 returnedJobs.map((job, counter) => <Job key={job.id} job={job} counter={counter} />)
//             }
//         </div>
//     )
// }

export default function Jobs({ jobs }) {

    jobs.map(job => {

        const date = job.created_at;
        let month, day, year;

        // find job posted month / day / year
        month = date.split(' ')[1];
        day = date.split(' ')[2];
        year = date.split(' ')[5];

        // find posted month
        const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        month = monthShortNames.findIndex(m => m === month);

        // find difference between today and posted day
        const d = new Date();
        const Date1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        const Date2 = new Date(year, month, day);
        const diffDays = Math.floor((Date1.getTime() - Date2.getTime()) / (1000 * 60 * 60 * 24));
        return job.diffDays = diffDays;
    });

    // sort jobs by diffdays
    jobs.sort((a, b) => a.diffDays - b.diffDays );

    // filter jobs which are older than 60 days
    jobs = jobs.filter(job => {
        if (job.diffDays < 61) {
            return true;
        }
        else return false;
    });
    // // filter dublicated jobs
    // var result = jobs.reduce((unique, o) => {
    //     if(!unique.some(obj => obj.id === o.id)) {
    //       unique.push(o);
    //     }
    //     return unique;
    // },[]);
    // console.log(result)

    return (
        <div className="jobs">
            <Typography className="JobsTitle" variant='h3'>
                Jobs
            </Typography>
            <br></br>
            <Typography variant='h5'>
                Options
            </Typography>
            <div className="jobfilter">
                <label><input type="checkbox" /> Remote</label>
                <input placeholder="search job" />
            </div>
            <hr />

            <div className="jobCount">
                {jobs.length !== 0 ? 'Total ' + jobs.length + ' Jobs Listed' : null}
            </div>
            {
                jobs.map((job, counter, diffDays) => <Job key={counter} job={job} counter={counter} diffDays={diffDays} />)
            }
        </div>
    )
}
