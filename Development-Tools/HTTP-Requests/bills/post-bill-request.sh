curl -v -X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "$1" \
localhost:5050/billRequest \
-b ~/Downloads/cookies
