const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

const cors = require('cors');

var corsOptions = {
	origin: '*',
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

const mongoose = require('mongoose');
const { Transaction } = require('./models/transaction');
const { Category } = require('./models/category');

mongoose
	.connect('mongodb://localhost:27017/MoneyManagerBd', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Conexión exitosa a la base de datos');
	})
	.catch((error) => {
		console.error('Error al conectar a la base de datos', error);
	});

app.get('/', function (req, res) {
	res.send('Hello World!');
});

app.post('/api/transaction', async function (req, res) {
	const { amount, type } = req.body;

	const transaction = new Transaction({
		amount: amount,
		type: type,
	});

	try {
		const result = await transaction.save();
		res.send({
			status: true,
			message: 'Creado satisfactoriamente',
			data: result,
		});
	} catch (error) {
		res.send({
			status: false,
			message: error.message,
			data: error,
		});
		// res.send(error.message);
	}
});

app.get('/api/categories', async function (req, res) {
	// read types from types collection

	try {
		const categories = await Category.find();
		res.send({
			status: true,
			message: 'Categorías obtenidas satisfactoriamente',
			data: categories,
		});
	} catch (error) {
		res.send({
			status: false,
			message: error.message,
			data: error,
		});
	}
});

app.listen(port, () => {
	console.log('Server started on port ' + port);
});
