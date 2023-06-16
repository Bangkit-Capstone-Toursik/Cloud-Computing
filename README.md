# Cloud Computing Documentation
This is a documentation for TourSik's Backend/Cloud Computing.

## How to make a database in Cloud Firestore

### 1. Go to https://console.cloud.google.com/firestore and enable native mode.
### 2. Add the dataset to the database. You can use Open Editor in Cloud Shell.
### 3. After add the database, check the database to know that all data are correct.

## How to make an backend API
1. Write an Express server app using Javascript and install all dependencies
Or you can use this folder:
...
Don't forget to login to Firebase and connect Firebase project with Google Console Platform project. Use your own Service Account Key from your Firebase project and API_KEY for Google Maps API and Places API from API Services in Google Console Platform.

2. Cloud Functions
Because we will use Cloud Functions, check if you enable Cloud Functions in Google Console Platform.

3. URL API
We make 5 endpoints in total. 4 endpoints get data from database (Firestore) and 1 endpoint from ML model.

Base URL API: http://127.0.0.1:5001/projectcapstone-5c13a/us-central1/app

1. Get Specific Data (name)
URL
/api/getByName/:Name

Method
GET

Response
{
    "status": "Berhasil",
    "data": {
        "placeData": {
            "Regency": "Konawe Utara",
            "Category": "Alam",
            "Price": "15000.0",
            "Rating": "4.2",
            "Province": "Sulawesi Tengara",
            "Name": "Air Panas Wawolesea"
        },
        "types": [
            "tourist_attraction",
            "point_of_interest",
            "establishment"
        ],
        "reviews": [
            {
                "author_name": "ftrxh",
                "author_url": "https://www.google.com/maps/contrib/100414735052677229447/reviews",
                "language": "id",
                "original_language": "id",
                "profile_photo_url": "https://lh3.googleusercontent.com/a-/AD_cMMQAvLT1ut21PrfQLC3R1Sf3g30GOu8hxjXCokb-M0E=s128-c0x00000000-cc-rp-mo-ba5",
                "rating": 4,
                "relative_time_description": "setahun yang lalu",
                "text": "Tempatnya bagus, luas, banyak pemandangan juga, tapi kalau kesini disarankan jangan siang hari, soalnya jadi puanasss bangettt, yaa gimana gak panas yaa, udah ada panas dari matahari + panasnya air 😅.\nKesini waktu weekday, jadinya sepi bebas foto2 👍",
                "time": 1654156538,
                "translated": false
            },
            ...
        ],
        "photos": [
            {
                "height": 433,
                "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/107031584561939802673\">MIA 2 FAMILY</a>"
                ],
                "photo_reference": "AZose0n-9hTG_WrcWvyGT_uEn8b9t44DYrpLJGfvpzk7_uDvghYkjM8UcRRhXO07YcQCzZ-HceUFqHIA--7fbChLj1ZrwUD4Q6CRGJ2qJqQ7rQjOyS31mQj2SZJJoPrJs5HxD78Jp0e6OzBouMoXqAO6ejBCHJBpUh8c_43j72otjNvw4gas",
                "width": 700
            },
            ...
        ]
    }
}

2. Get Specific Data (category)
URL
/api/getByCategory/:Category

Method
GET

Response
{
    "status": "Berhasil",
    "data": [
        {
            "Name": "Aek Sipaulak Hosa Loja",
            "Province": "North Sumatra",
            "Rating": "4.6",
            "Price": "0.0"
        },
        {
            "Name": "Alun-alun Utara Keraton Yogyakarta",
            "Province": "Daerah Istimewa Yogyakarta",
            "Rating": "0.0",
            "Price": "0.0"
        }, 
        ...
    }
}

3. Get Specific Data (populer)
URL
/api/getByHighRating

Method
GET

Response
{
    "status": "Berhasil",
    "data": [
        {
            "Name": "wisata pulau mandeh",
            "Province": "West Sumatra",
            "Rating": "5.0",
            "Price": "0.0"
        },
        {
            "Name": "Wisata Sungai Bahbolon",
            "Province": "North Sumatra",
            "Rating": "5.0",
            "Price": "0.0"
        },
        ...
    }
}

4. Get Spesific Data (recommended, gratis)
URL
/api/getByPrice/0.0

Method
GET

Response
{
    "status": "Berhasil",
    "data": [
        {
            "Name": "101 Nusa Lima Beach & Resto",
            "Province": "North Sumatra",
            "Rating": "4.1",
            "Price": "0.0"
        },
        {
            "Name": "AIR TERJUN NYARAI",
            "Province": "West Sumatra",
            "Rating": "5.0",
            "Price": "0.0"
        },
        ...
     }
}

5. Get Recommendations (ML model)
URL
/recommendations/:Price(total)/:Regency

Method
GET

Response
{
    "status": "Berhasil",
    "data": [
        {
            "price": 25000,
            "name": "Waterfall Wanagiri Village",
            "province": "Bali",
            "rating": 0
        },
        {
            "price": 30000,
            "name": "Objek Wisata Alas Kedaton Monkey Forest",
            "province": "Bali",
            "rating": 0
        },
        {
            "price": 30000,
            "name": "Tiket The Blooms Garden",
            "province": "Bali",
            "rating": 0
        }
    ]
}

4. Postman
Before deploy the API, test the API using Postman.

5. Deploy a Backend API
Use "firebase deploy" in CMD to deploy the Backend API.

6. Integrate the API in Android Studio by Mobile Development path.
