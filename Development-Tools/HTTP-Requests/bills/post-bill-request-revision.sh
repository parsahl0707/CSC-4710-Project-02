data='{"billRequestId": '$1', "price": 99, "note": "This is a note"}'

curl -v \
-X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "${data}" \
localhost:5050/billRequestRevision \
-b ~/Downloads/cookies
