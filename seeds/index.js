const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedsHelper');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDb = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '5fb6f3fbd6a6bb58f05df1e2',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem dolorum quibusdam aliquam natus maiores. Nemo, deserunt! Quod nesciunt pariatur assumenda quia?',
			price,
			images: [
				{
					url: 'https://res.cloudinary.com/jamiu/image/upload/v1606071357/YelpCamp/nxj8kidxaam2bq1ju2co.png',
					filename: 'YelpCamp/nxj8kidxaam2bq1ju2co'
				},
				{
					url: 'https://res.cloudinary.com/jamiu/image/upload/v1606071358/YelpCamp/wba7olhteuyf7hrzpuxr.png',
					filename: 'YelpCamp/wba7olhteuyf7hrzpuxr'
				}
			]
		});
		await camp.save();
	}
};

seedDb().then(() => {
	mongoose.connection.close();
});
