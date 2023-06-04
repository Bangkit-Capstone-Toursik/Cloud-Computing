const functions = require("firebase-functions");

const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const express = require("express");
const cors = require("cors");

// main app
const app = express();
app.use(cors({origin: true}));

// main database preference
const db = admin.firestore();

// routes
app.get("/", (req, res) => {
  return res.status(200).send("routes successed");
});

// get recommendations

// fetch data untuk menampilkan semua data
app.get("/api/getAll", (req, res) => {
  (async () => {
    try {
      const query = db.collection("toursikfixname");
      const response = [];

      await query.get().then((data) => {
        const docs = data.docs;

        docs.map((doc) => {
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
        return response;
      });

      return res.status(200).send({status: "Successed", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// fetch data untuk menampilkan data spesifik berdasarkan nama
app.get("/api/get/:name", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("toursikfixname").doc(req.params.name);
      const toursikfixname = await reqDoc.get();
      const response = toursikfixname.data();

      return res.status(200).send({status: "Successed", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// fetch data untuk menampilkan data spesifik berdasarkan kategori
app.get("/api/get/:category", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("toursikfixname").doc(req.params.category);
      const toursikfixname = await reqDoc.get();
      const response = toursikfixname.data();

      return res.status(200).send({status: "Successed", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// fetch data untuk menampilkan data spesifik berdasarkan provinsi
app.get("/api/get/:province", (req, res) => {
  (async () => {
    try {
      const reqDoc = db.collection("toursikfixname").doc(req.params.province);
      const toursikfixname = await reqDoc.get();
      const response = toursikfixname.data();

      return res.status(200).send({status: "Successed", data: response});
    } catch (error) {
      console.log(error);
      return res.status(500).send({status: "Failed", msg: error});
    }
  })();
});

// exports the api to firebase cloud function
exports.app = functions.https.onRequest(app);
