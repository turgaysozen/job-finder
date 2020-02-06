const mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
    filteredJobs: {
        type: [],
        required: true
    },
    allJobs: {
        type: [],
        required: true
    }
    // title: {
    //     type:String
    // }
});

module.exports = mongoose.model('Job', jobSchema);