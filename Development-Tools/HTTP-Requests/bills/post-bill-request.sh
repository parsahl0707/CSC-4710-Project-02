data='{"workOrderId": '$1', "price": 99}'

curl -v \
-X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "${data}" \
localhost:5050/billRequest \
-b ~/Downloads/cookies
