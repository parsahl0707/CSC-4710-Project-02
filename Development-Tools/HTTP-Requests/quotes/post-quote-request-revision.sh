data='{"quoteRequestId": '$1', "accepted":'$2', "note": "This is a note"}'

curl -v \
-X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "${data}" \
localhost:5050/quoteRequestRevision \
-b ~/Downloads/cookies
