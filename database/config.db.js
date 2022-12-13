const mongoose = require('mongoose');
require('colors');

const dbConnection = async() => {

	try{
		await mongoose.connect(process.env.MONGODB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//useCreateIndex: true,
			//useFindAndModify: false
		});

		console.log('Database: '.cyan + 'online'.green);

	} catch (error) {
		console.log(error);
		throw new Error('Error starting database'.red);
	}

}


module.exports = {
	dbConnection
}