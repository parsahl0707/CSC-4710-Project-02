data='{"street": "Adam Street", "city": "New York City", "state": "NY", "zipCode": "12345", "country": "US", "drivewaySize": 54, "proposedPrice": 99, "imageUrl1": "http://a", "imageUrl2": "http://b", "imageUrl3": "http://c", "imageUrl4": "http://d", "imageUrl5": "http://e", "note": "This is a note"}'

curl -v \
-X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "${data}" \
localhost:5050/quoteRequest \
-b ~/Downloads/cookies
