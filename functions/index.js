/* eslint-disable require-jsdoc */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const axios = require("axios");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const cors = require("cors");

// main app
const app = express();
app.use(cors({origin: true}));
const API_KEY = "OURS";

// main database preference
const db = admin.firestore();

// routes
app.get("/", (req, res) => {
  return res.status(200).send("routes berhasil");
});

// fetch data untuk menampilkan semua data
app.get("/api/getAll", (req, res) => {
  (async () => {
    try {
      const query = db.collection("datafix");
      const response = [];

      const snapshot = await query.get();
      snapshot.forEach((doc) => {
        const selectedItem = {
          Province: doc.data().Province,
          Regency: doc.data().Regency,
          Category: doc.data().Category,
          Name: doc.data().Name,
          Price: doc.data().Price,
          Rating: doc.data().Rating,
        };
        response.push(selectedItem);
      });

      return res.status(200).send({status: "Berhasil", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Gagal", msg: error});
    }
  })();
});

// fetch data untuk menampilkan data spesifik berdasarkan kategori
app.get("/api/getByCategory/:category", (req, res) => {
  (async () => {
    try {
      const category = req.params.category;
      // eslint-disable-next-line max-len
      const query = db.collection("datafix").where("Category", "==", category);
      const snapshot = await query.get();
      if (snapshot.empty) {
        // eslint-disable-next-line max-len
        return res.status(404).send({status: "Gagal", msg: "Data tidak ditemukan"});
      }
      const response = [];
      snapshot.forEach((doc) => {
        const selectedItem = {
          Name: doc.data().Name,
          Province: doc.data().Province,
          Rating: doc.data().Rating,
          Price: doc.data().Price,
        };
        response.push(selectedItem);
      });
      return res.status(200).send({status: "Berhasil", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Gagal", msg: error});
    }
  })();
});

// fetch data untuk menampilkan data spesifik untuk tab populer
app.get("/api/getByHighRating", (req, res) => {
  (async () => {
    try {
      const query = db.collection("datafix");
      const snapshot = await query.orderBy("Rating", "desc").get();
      if (snapshot.empty) {
        return res.status(404).send({status: "Gagal", msg: "Data tidak ditemukan"});
      }
      const response = [];
      snapshot.forEach((doc) => {
        const selectedItem = {
          Name: doc.data().Name,
          Province: doc.data().Province,
          Rating: doc.data().Rating,
          Price: doc.data().Price,
        };
        response.push(selectedItem);
      });
      return res.status(200).send({status: "Berhasil", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Gagal", msg: error});
    }
  })();
});

// fetch data untuk menampilkan data spesifik untuk tab recommended
app.get("/api/getByPrice/:price", (req, res) => {
  (async () => {
    try {
      const price = req.params.price;
      // eslint-disable-next-line max-len
      const query = db.collection("datafix").where("Price", "==", price);
      const snapshot = await query.get();
      if (snapshot.empty) {
        // eslint-disable-next-line max-len
        return res.status(404).send({status: "Gagal", msg: "Data tidak ditemukan"});
      }
      const response = [];
      snapshot.forEach((doc) => {
        const selectedItem = {
          Name: doc.data().Name,
          Province: doc.data().Province,
          Rating: doc.data().Rating,
          Price: doc.data().Price,
        };
        response.push(selectedItem);
      });
      return res.status(200).send({status: "Berhasil", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Gagal", msg: error});
    }
  })();
});

// fetch data untuk menampilkan data spesifik berdasarkan nama
app.get("/api/getByName/:name", (req, res) => {
  (async () => {
    try {
      const name = req.params.name;
      const query = db.collection("datafix").where("Name", "==", name);
      const snapshot = await query.get();
      if (snapshot.empty) {
      // eslint-disable-next-line max-len
        return res.status(404).send({status: "Gagal", msg: "Data tidak ditemukan"});
      }
      // Mendapatkan place ID menggunakan Google Maps API
      const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=${API_KEY}`,
      );
      // Mendapatkan place ID dari respons
      const candidates = response.data.candidates;
      const placeId = candidates.length > 0 ? candidates[0].place_id : null;
      // Jika tidak ada place ID yang ditemukan, kirim respons bahwa tempat tidak ditemukan
      if (!placeId) {
        res.status(404).json({error: "Tempat tidak ditemukan"});
        return;
      }
      // Mengambil tipe dari Google Maps API
      const typesResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=types&language=id&key=${API_KEY}`,
      );
      // Mengambil review dari Google Maps API
      const reviewResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=id&key=${API_KEY}`,
      );
      // Mengambil foto dari Google Maps API
      const photoResponse = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&language=id&key=${API_KEY}`,
      );
      const reviews = reviewResponse.data.result.reviews;
      const photos = photoResponse.data.result.photos;
      const types = typesResponse.data.result.types;
      // Mengambil data tempat yang berada di database
      const placeData = snapshot.docs[0].data();
      // Menggabungkan data dari database dengan data yang didapat dari GMAPS API
      const combinedData = {
        placeData,
        types,
        reviews,
        photos,
      };
      return res.status(200).send({status: "Berhasil", data: combinedData});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Gagal", msg: error});
    }
  })();
});

// Get recommendations dari model
// Import the required modules
const datafix = require("./datafix.json"); // Import your data and label mapping
const label_mapping = require("./label_mapping.json"); // Import your data and label mapping
app.use(express.json());

app.get("/recommendations/:price/:regency", (req, res) => {
  const input_price = parseInt(req.params.price); // Input price
  const input_regency = parseInt(req.params.regency); // Input regency
  // Content-based filtering code to generate recommendations
  // De-encode the output labels
  const inverse_mapping = {};
  for (const item of label_mapping) {
    inverse_mapping[item.Label] = item.Name;
  }

  // Filter the data based on input regency
  const filtered_data = datafix.filter((item) => item.Regency === input_regency);

  // Create a list of items where each item is represented as (price, name)
  const items = filtered_data.map((item) => [
    parseInt(item.Price),
    item.Name,
    item.Province,
    item.Rating,
  ]);

  // KNAPSACK PROBLEM
  // Helper function to shuffle an array in place
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  const n = items.length;
  shuffleArray(items); // Shuffle a list of items to get different combinations
  const dp = Array.from({length: n + 1}, () => Array.from({length: input_price + 1}, () => 0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= input_price; j++) {
      if (items[i - 1][0] <= j) {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - items[i - 1][0]] + 1);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  // Find the items included in the optimal solution
  const included_items = [];
  let i = n;
  let j = input_price;
  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      included_items.push(items[i - 1]);
      j -= items[i - 1][0];
    }
    i -= 1;
  }

  // De-encode the included items
  const deencoded_included_items = included_items.map(([price, name, province, rating]) => ({
    price,
    name: inverse_mapping[name],
    province,
    rating,
  }));

  // Prepare the recommendations as an array of objects
  const recommendationList = deencoded_included_items;

  // Send the recommendations as the API response
  res.status(200).send({status: "Berhasil", data: recommendationList});
});

exports.app = functions.https.onRequest(app);
