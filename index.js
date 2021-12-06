// require express
const express = require('express');

//port number
const port = 3000;

// importing the database
const db = require('./config/mongoose');

// importing the schema for activities
const activity = require('./models/activity');

//starting express
const app = express();

//for using static files
app.use(express.static("./views"));
app.use(express.urlencoded());

//setting the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// rendering homepage on desktop
app.get('/', function(req, res) {
    activity.find({}, function(err, activity) {
        if (err) {
            console.log('Error in fetching activity from db');
            return;
        }

        return res.render('home', {
            tittle: "Home",
            activity: activity
        });
    })
});


// creating activity
app.post('/create-activity', function(req, res) {
        // console.log("activity created")

        activity.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
        }, function(err, newActivity) {
            if (err) {
                console.log('error in creating activity')
            }

            return res.redirect('back');
        })
    })
    // deleting activity
app.get('/delete-activity', function(req, res) {
        //fetch id
        var id = req.query;

        //if more than one activities selected for delete
        var count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {
            // finding and deleting activities from database  by using id
            activity.findByIdAndDelete(Object.keys(id)[i], function(err) {
                if (err) {
                    console.log('error in deleting activity');
                }
            })
        }
        return res.redirect('back');
    })
    // firing up server
app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running in server`, err);
        return;
    }
    console.log(`Server is up and running on a port: ${port}`);
})