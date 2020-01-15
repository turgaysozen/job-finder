import React from 'react';
import { Paper, Typography } from "@material-ui/core";

export default function Job({ job, counter, diffDays }) {

    // const date = job.created_at;
    // let month, day, year;

    // // find job posted month / day / year
    // month = date.split(' ')[1];
    // day = date.split(' ')[2];
    // year = date.split(' ')[5];

    // // find posted month
    // const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    //     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    // month = monthShortNames.findIndex(m => m === month);

    // // find difference between today and posted day
    // const d = new Date();
    // const Date1 = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    // const Date2 = new Date(year, month, day);
    // const diffDays = Math.floor((Date1.getTime() - Date2.getTime()) / (1000 * 60 * 60 * 24));

        return (
            <div>
                <Typography className="counter" variant="h6">{counter + 1}</Typography>
               { 
               job.url.includes('github') === true ? 
               
               <Typography style={{ fontSize: '11px', marginTop: '10px' }}>Source: <a target='_blank' rel="noopener noreferrer" href={job.url}> Github</a></Typography> : ''}

                <Paper style={{ backgroundColor: '#f1f1f1' }} className="job">
                    <div>
                        <Typography variant="h5">{job.title}</Typography>
                        <Typography variant="h6">{job.company}</Typography>
                        <Typography>{job.location}</Typography>

                    </div>
                    <div>
                        <img alt='' style={{ height: '60x', width: '60px' }} src={job.company_logo}></img>

                        <Typography style={{ fontSize: '12px' }} className="postedDay">
                            {job.diffDays === 0 ? 'Today Posted' : job.diffDays === 1 ? 'Yesterday Posted' : job.diffDays + ' Day Ago Posted'}
                        </Typography>
                    </div>
                </Paper >
            </div>
        )
  
}
