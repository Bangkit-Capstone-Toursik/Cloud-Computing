# Cloud Computing Documentation
This is a documentation for TourSik's Backend/Cloud Computing.

# How to make a database in Cloud Firestore
1. Go to https://console.cloud.google.com/firestore and enable native mode.

2. Add the dataset to the database. You can use Open Editor in Cloud Shell.

3. After add the database, check the database to know that all data are correct.

# How to make an backend API
1. Write an Express server app using Javascript and install all dependencies
Or you can use this folder:
...

Don't forget to login to Firebase and connect Firebase project with Google Console Platform project. Use your own Service Account Key from your Firebase project and API_KEY for Google Maps API and Places API from API Services in Google Console Platform.

2. Cloud Functions
Because we will use Cloud Functions, check if you enable Cloud Functions in Google Console Platform.

3. URL API
We make 6 endpoints in total. 5 endpoints get data from database (Firestore) and 1 endpoint from ML model.

Base URL API: http://127.0.0.1:5001/projectcapstone-5c13a/us-central1/app

1. Get all data
URL
/api/getAll

Method
GET

Response
Province as string,
Regency as string,
Category as string,
Name as string,
Price as ,
Rating as ,

1. Get Specific Data (name)

2. Get Specific Data (category)

3. Get Specific Data (populer)

4. Get Spesific Data (recommended)

5. Get Recommendations (ML model)
