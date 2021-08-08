const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials('views/partials');


// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', (req, res) => {
    // const gotBeers = punkAPI.getBeers().then(() => {
    // console.log(gotBeers)
    // res.render('beers', {gotBeers});

    const gotBeers = punkAPI.getBeers()
    .then(beersFromApi =>  {
      console.log('Beers from the database: ', beersFromApi)
      res.render('beers', { beersFromApi })

    })
    .catch(error => console.log(error));
    
  });

app.get('/random-beer', (req, res) => {
    const gotRandom = punkAPI.getRandom()
    // .then( beer => res.render('random-beer', {beer2: beer[0]} ))
    .then( beer => res.render('random-beer', {beer} ))
    .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
