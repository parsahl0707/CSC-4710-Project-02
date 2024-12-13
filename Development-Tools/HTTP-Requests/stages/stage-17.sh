# Bill Responses

auth/login.sh bobby bobby
bills/post-bill-response.sh '{
"billRequestId": 17,
"disputed": false,
"cardNumber": "0987654321654321",
"note": "That seems right."
}'

auth/login.sh evan evan
bills/post-bill-response.sh '{
"billRequestId": 18,
"disputed": false,
"cardNumber": "9410224524594102",
"note": "That seems right."
}'

auth/login.sh frank frank
bills/post-bill-response.sh '{
"billRequestId": 19,
"disputed": false,
"cardNumber": "2341492341423414",
"note": "That seems right."
}'