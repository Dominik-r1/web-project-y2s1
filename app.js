// load express
const express = require('express');
// load handlebars (new API for express-handlebars v7+)
const { engine } = require('express-handlebars');
// const { use } = require('react');

// instantiate express
const app = express();

// configure express to use handlebars as templating engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    // use this layout by default - if you have different layout
    // for say home page - you can toggle this in your code
    defaultLayout: 'default',
    // set location of layouts
    layoutsDir: 'views/layouts',
    // set location of partials - header, footer, etc
    partialsDir: 'views/partials',
  })
);

// set the view engine to handlesbards
app.set('view engine', 'hbs');
// where to find all of the view
app.set('views',  'views');
// where to find static files - css, images, js
app.use(express.static('public'));



// home page or home route
app.get('/', (req, res) => {

  // set active for navigation
  state={home:true}
  // set specifics for <head>
  head={
    title: "Home",
    description: "This is the home page.",
    keywords: "gym, trainers, Sligo Fitness",
  }
  // pass object to to render in "index"
  res.render('index', {state, head});
  // send this to terminal where node app is running
  console.log('home')

});

// trainers route
app.get('/trainers', (req, res) => {
  state={trainers : true}
  head={
    title:"Trainers",
    description:"this is the trainers page, information about the gym trainers displayed here",
    keywords:"gym trainer, personal training, coaches, strength, conditioning, fitness, Sligo Fitness"
  }
  res.render('trainers', { state, head});
  console.log('trainers')
});
// memberships route
app.get('/memberships', (req, res) => {
  state={memberships : true}
  head={
    title:"Memberships",
    description:"this is the memberships page, contains membership prices and membership form",
    keywords:"gym, gym membership, student, prices"
  }
  res.render('memberships', { state, head});
  console.log('memberships')
});
// contact route
app.get('/contact', (req, res) => {
    state={contact : true}
    head={
      title:"Contact"
    }
    res.render('contact', { state, head});
    console.log('contact')
});

// submission route
app.get('/submission', (req, res) => {
  state={contact : true}
    head={
      title:"Sumbitted"
    }
    // get form details from query string
    formDetails = {
    firstName: req.query.firstName,
    lastName: req.query.lastName, 
    userEmail: req.query.userEmail, 
    userMessage: req.query.userMessage,
   }

    res.render('submission', { formDetails });
    console.log('submission')
});

// Membership submission route
app.get('/membershipSubmission', (req, res) => {
  state={memberships : true}
    head={
      title:"Sumbitted"
    }
    // get form details from query string
    formDetails = {
    firstName: req.query.firstName,
    lastName: req.query.lastName, 
    userEmail: req.query.userEmail, 
    membershipType: req.query.membershipType,
    duration: req.query.duration,
    preferredTrainer: req.query.preferredTrainer
   }

    res.render('membershipSubmission', { formDetails });
    console.log('membershipSubmission')
});

// products route
app.get('/products', (req, res) => {
  state={products : true}
  head={
    title:"Products"
  }
  res.render('products', { state, head});
  console.log('products')
});



// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});