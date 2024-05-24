const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const dbname = 'caldet';
const MongoClient = require('mongodb').MongoClient;

// Middleware untuk mengizinkan penggunaan req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Middleware untuk parsing JSON

// Tampilan halaman admin
app.get('/admin', (req, res) => {
    res.render('admin');
});

// Koneksi ke database MongoDB
mongoose.connect('mongodb://localhost:27017/CalDet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

//FOOD
const Food = require('./models/Food'); // Model untuk makanan

// Route untuk menambah makanan
app.post('/addfood', async (req, res) => {
    try {
        const { name, size, calorie } = req.body;
        const food = new Food({ name, size, calorie });
        await food.save();
        res.redirect('/admin'); // Redirect kembali ke halaman admin setelah menambahkan data
    } catch (err) {
        console.error("Error adding food", err);
        res.status(500).send('Internal server error');
    }
});

// Route untuk mengambil data makanan
app.get('/foods', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        console.error("Error fetching foods", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Review
const Review = require('./models/Review'); // Pastikan path model Review sesuai dengan struktur direktori Anda

// Endpoint untuk menambahkan review baru ke dalam database
app.post('/submit-review', async (req, res) => {
    try {
        const { rating, insight } = req.body;

        // Membuat instance model Review baru
        const newReview = new Review({
            rating: rating,
            insight: insight // Simpan insight ke dalam database
        });

        // Menyimpan review ke dalam database
        await newReview.save();

        res.status(201).send('Review added successfully');
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).send('Failed to add review');
    }
});


//HomePage
app.get('/', (req, res) => {
    res.render('Home', {title:'Home'});
});
app.get('/Home', (req, res) => {
    res.render('Home', {title:'Home'});
});

//ELSE
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.listen(port, () => {
    console.log(`CaldetWeb listening at http://localhost:${port}`);
});