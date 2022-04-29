const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');
const auth = require('./middleware/auth');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(cookieParser())

// DB Config
const db = process.env.mongoURI;

// Connect to MongoDB
mongoose
.connect(
  db,
  { useNewUrlParser: true }
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.warn(err));

app.set('view engine', 'ejs');
routes(app)

app.get('/deleteCookie', (req, res) => {
    res.clearCookie('x-access-token');
    res.redirect("/")
})

app.get('/', auth(), function(req, res) {
  res.render('pages/index.ejs', {title: 'mentionsound', userEmail: req.body.currentUser});
});

app.get('/register', function(req, res) {
  res.render('pages/register.ejs');
});

app.get('/login', function(req, res) {
  res.render('pages/login.ejs');
});

app.get('/products', auth(), function(req, res) {
  res.render('pages/products.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/faq', auth(), function(req, res) {
  res.render('pages/faq.ejs', {title: 'FAQ | mentionsound', userEmail: req.body.currentUser});
});

app.get('/sfxhd', auth(), function(req, res) {
  res.render('pages/sfxhd.ejs', {title: 'SFXHD | mentionsound', userEmail: req.body.currentUser});
});

app.get('/walla', auth(), function(req, res) {
  console.log(req.body.currentUser);
  res.render('pages/walla.ejs', {title: 'Walla sound effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/whoosh', auth(), function(req, res) {
  res.render('pages/whoosh.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/wind', auth(), function(req, res) {
  res.render('pages/wind.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/footsteps', auth(), function(req, res) {
  res.render('pages/footsteps.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/cartoon', auth(), function(req, res) {
  res.render('pages/cartoon.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/drones', auth(), function(req, res) {
  res.render('pages/drones.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/menus-and-interfaces', auth(), function(req, res) {
  res.render('pages/menus-and-interfaces.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/ambience', auth(), function(req, res) {
  res.render('pages/ambience.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/contact', function(req, res) {
  res.render('pages/contact.ejs');
});
app.get('/exteriors', auth(), function(req, res) {
  res.render('pages/exteriors.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/animals', auth(), function(req, res) {
  res.render('pages/animals.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/comic-film-fx', auth(), function(req, res) {
  res.render('pages/comic-film-fx.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});
app.get('/interiors', auth(), function(req, res) {
  res.render('pages/interiors.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/tos', auth(), function(req, res) {
  res.render('pages/tos.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/privacy', auth(), function(req, res) {
  res.render('pages/privacy.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/reset', auth(), function(req, res) {
  res.render('pages/reset.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/browse', auth(), function(req, res) {
  res.render('pages/browse.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/job', auth(), function(req, res) {
  res.render('pages/job.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/education', auth(), function(req, res) {
  res.render('pages/education.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/affiliate', auth(), function(req, res) {
  res.render('pages/affiliate.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});

app.get('/license', auth(), function(req, res) {
  res.render('pages/license.ejs', {title: 'Buy Sound Effects | mentionsound', userEmail: req.body.currentUser});
});


app.get('/home', auth(), function(req, res) {
  if(req.body.currentUser !== undefined) {
    res.render('pages/home.ejs', { title: 'Account | mentionsound', userEmail: req.body.currentUser});
  } else {
    res.redirect("/");
  }
});

app.get('/billingoverview', auth(), function(req, res) {
  if(req.body.currentUser !== undefined) {
    res.render('pages/billingoverview.ejs', { title: 'Overview | mentionsound', userEmail: req.body.currentUser});
  } else {
    res.redirect("/");
  }
});


app.get('/paymentmethod', auth(), function(req, res) {
  if(req.body.currentUser !== undefined) {
    res.render('pages/paymentmethod.ejs', { title: 'PaymentMethod | mentionsound', userEmail: req.body.currentUser});
  } else {
    res.redirect("/");
  }
});


app.get('/editbill', auth(), function(req, res) {
  if(req.body.currentUser !== undefined) {
    res.render('pages/editbill.ejs', { title: 'Billing | mentionsound', userEmail: req.body.currentUser});
  } else {
    res.redirect("/");
  }
});


app.get('/invoice', auth(), function(req, res) {
  if(req.body.currentUser !== undefined) {
    res.render('pages/invoice.ejs', { title: 'Invoice | mentionsound', userEmail: req.body.currentUser});
  } else {
    res.redirect("/");
  }
});

app.get('/downloadlist', auth(), function(req, res) {
  if(req.body.currentUser !== undefined) {
    res.render('pages/downloadlist.ejs', { title: 'DownloadList | mentionsound', userEmail: req.body.currentUser});
  } else {
    res.redirect("/");
  }
});

app.get('/favoritelist', auth(), function(req, res) {
  if(req.body.currentUser !== undefined) {
    res.render('pages/favoritelist.ejs', { title: 'FavoriteList | mentionsound', userEmail: req.body.currentUser});
  } else {
    res.redirect("/");
  }
});



app.use(express.static(path.resolve(__dirname, 'public')));

const port = process.env.SERVERPORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));