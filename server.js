// need express server for http request
var express =  require('express');
var app = new express();
//use cross origin resource sharing to allow any other port like 4200 to get the data from 3000 port where the server is running
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = require('q').Promise;
// to apply the middleware
app.use(cors({
  origin: 'http://localhost:4200'
})); //this line will open up all the port all the domains. you should not be doing this. so provide origin.

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/addproducts', function (err, client) {
    if (err) {
        console.log("Not connected to db" + err);
    }
    else {
        console.log("Successfully connected");
        app.listen(3000, function () {
            console.log("Running on port");
        });
    }
});

var productSchema = new Schema({
    productId: Number,
    productName: String,
    productCode: String,
    price: Number,
    starRating: Number,
    releaseDate: String,
    description: String,
    imageUrl: String
})

var product = mongoose.model('product', productSchema);



app.post('/authenticate',function (req,res) {
    var token = jwt.sign({'uname' : req.body.username},'master-key', {expiresIn : '1h'});
  console.log(req.body);
  if(req.body.username && req.body.password){
    res.send({isLoggedIn : true, token : token})
   }else{
    res.send({ isLoggedIn : false})
}
});

app.post('/addProducts' , function(req,res){
    console.log(req.body);

   
    var product1 = new product({
      productId: req.body.id,
      productName : req.body.name,
      productCode : req.body.code,
      description: req.body.description,
      price : req.body.price ,
      starRating : req.body.rating,
      imageUrl : req.body.image,
      releaseDate : req.body.releaseDate
    })
  
    product1.save((err,result)=>{
      console.log(result);
      res.send(result);
    })
  
  })

app.use(function(req,res,next){
var token = req.query.authtoken || req.body.authtoken || req.headers['authtoken'];
console.log(token);
jwt.verify(token, 'master-key', function(err, decoded){
if(err){
res.send({
    err:true,
    msg: 'invalid request'
})
}else{
req.decoded = decoded;
next();
}
});
})

app.get('/getproducts',function (req,res) {
    // console.log(decoded);
//     res.send([
        // {
        //     "productId": 1,
        //     "productName": "Leaf Rake",
        //     "productCode": "GDN-0011",
        //     "releaseDate": "March 19, 2016",
        //     "description": "Leaf rake with 48-inch wooden handle.",
        //     "price": 19.95,
        //     "starRating": 3.2,
        //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        // },
        // {
        //     "productId": 2,
        //     "productName": "Garden Cart",
        //     "productCode": "GDN-0023",
        //     "releaseDate": "March 18, 2016",
        //     "description": "15 gallon capacity rolling garden cart",
        //     "price": 32.99,
        //     "starRating": 4.2,
        //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        // },
        // {
        //     "productId": 5,
        //     "productName": "Hammer",
        //     "productCode": "TBX-0048",
        //     "releaseDate": "May 21, 2016",
        //     "description": "Curved claw steel hammer",
        //     "price": 8.9,
        //     "starRating": 4.8,
        //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
        // },
        // {
        //     "productId": 8,
        //     "productName": "Saw",
        //     "productCode": "TBX-0022",
        //     "releaseDate": "May 15, 2016",
        //     "description": "15-inch steel blade hand saw",
        //     "price": 11.55,
        //     "starRating": 3.7,
        //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
        // },
        // {
        //     "productId": 10,
        //     "productName": "Video Game Controller",
        //     "productCode": "GMG-0042",
        //     "releaseDate": "October 15, 2015",
        //     "description": "Standard two-button video game controller",
        //     "price": 35.95,
        //     "starRating": 4.6,
        //     "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
        // }
//     ]
//   );
var query = product.find();

query.exec((err,result)=>{
    console.log(result);
  res.send(result);
})
});

// app.listen(3000, function () {
//   console.log('its running at 3000')
// });

