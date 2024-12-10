data='{"billRequestId": '$1', "disputed": '$2', "cardNumber": "1234567890123456", "note": "This is a note"}'

curl -v \
-X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "${data}" \
localhost:5050/billResponse \
-b ~/Downloads/cookies
