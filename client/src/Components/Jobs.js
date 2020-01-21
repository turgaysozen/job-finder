import React from 'react';
import { Typography } from "@material-ui/core";
import Job from "./Job";
import JobModel from "./JobModel";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        flexGrow: 1,
    },
});

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

    // job Model
    const [selectedJob, selectJob] = React.useState({});

    // material ui pagination
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

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
    jobs.sort((a, b) => a.diffDays - b.diffDays);

    // filter jobs which are older than 60 days
    jobs = jobs.filter(job => {
        if (job.diffDays < 61) {
            return true;
        }
        else return false;
    });

    // pagination structure
    let jobsPerPage = 10;
    let jobOnPage = jobs.slice(activeStep * jobsPerPage, (activeStep + 1) * jobsPerPage);

    console.log(jobs)

    return (
        <div className="jobs">

            {/* show job detail to user as popup */}
            <JobModel open={open} job={selectedJob} handleClose={handleClose} />
            <Typography className="JobsTitle" variant='h3'>
                <a className="JobsTitle" href='/'>Jobs</a>
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
                jobOnPage.map((job, counter, diffDays) => <Job handleClick={() => { handleClickOpen(); selectJob(job) }} key={counter + (activeStep) * jobsPerPage} job={job} counter={counter + (activeStep) * jobsPerPage} diffDays={diffDays} />)
            }

            {/* pagination */}
            <div>
                Page {activeStep + 1} of {Math.ceil(jobs.length / jobsPerPage)}
            </div>
            <MobileStepper
                variant="progress"
                steps={Math.ceil(jobs.length / jobsPerPage)}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === Math.ceil(jobs.length / jobsPerPage) - 1}>
                        Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
        </Button>
                }
            />
        </div>
    )
}
