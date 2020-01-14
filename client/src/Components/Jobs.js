import React from 'react';
import { Typography } from "@material-ui/core";
import Job from "./Job";

export default function Jobs({ jobs, lastFilteredJobs, handleClick, handleChange }) {

    let returnedJobs = lastFilteredJobs.length !== 0 ? lastFilteredJobs : jobs;

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
                <label><input onClick={handleClick} style={{ fontSize: '13px', marginTop: '15px' }} type="checkbox" /> Remote</label>
                <input onChange={handleChange} placeholder="search job" />
            </div>
            <hr />

            <div className="jobCount">
                {returnedJobs.length !== 0 ? 'Total ' + returnedJobs.length + ' Jobs Listed' : null}
            </div>
            {
                returnedJobs.map((job, counter) => <Job key={job.id} job={job} counter={counter} />)
            }
        </div>
    )
}
