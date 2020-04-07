var express = require('express');
const connectDB = require('./config/db1')
const bodyParser = require('body-parser')
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
//Connect database 
connectDB();

app.get('/', (req, res) => res.send('Server'))
// Define Routes
app.use('/api/users', require('./routes/api/user.route'));
app.use('/api/auth', require('./routes/api/auth.route'));
app.use('/api/products', require('./routes/api/product.route'))
app.use('/api/plans', require('./routes/api/plan.route'))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))