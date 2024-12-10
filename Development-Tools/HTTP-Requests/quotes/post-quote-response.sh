data='{"quoteRequestId": '$1', "rejected": '$2', "proposedPrice": 58, "startDate": "2024-12-01 12:00:00", "endDate": "2024-12-08 12:00:00", "note": "This is also a note"}'

curl -v \
-X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "${data}" \
localhost:5050/quoteResponse \
-b ~/Downloads/cookies
