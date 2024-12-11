# Bill Responses

auth/login.sh alice alice
bills/post-bill-response.sh '{
"billRequestId": 1,
"disputed": false,
"cardNumber": "1234567890123456",
"note": "That seems right."
}'

bills/post-bill-response.sh '{
"billRequestId": 2,
"disputed": false,
"cardNumber": "1234567890123456",
"note": "That seems right."
}'

bills/post-bill-response.sh '{
"billRequestId": 3,
"disputed": false,
"cardNumber": "1234567890123456",
"note": "That seems right."
}'

auth/login.sh bobby bobby
bills/post-bill-response.sh '{
"billRequestId": 6,
"disputed": false,
"cardNumber": "0987654321654321",
"note": "That seems right."
}'

bills/post-bill-response.sh '{
"billRequestId": 7,
"disputed": false,
"cardNumber": "0987654321654321",
"note": "That seems right."
}'

bills/post-bill-response.sh '{
"billRequestId": 8,
"disputed": false,
"cardNumber": "0987654321654321",
"note": "That seems right."
}'

bills/post-bill-response.sh '{
"billRequestId": 9,
"disputed": false,
"cardNumber": "0987654321654321",
"note": "That seems right."
}'

auth/login.sh george george
bills/post-bill-response.sh '{
"billRequestId": 10,
"disputed": false,
"cardNumber": "6666555544443333",
"note": "That seems right."
}'

bills/post-bill-response.sh '{
"billRequestId": 11,
"disputed": true,
"note": "That does not seem right."
}'

auth/login.sh harold harold
bills/post-bill-response.sh '{
"billRequestId": 12,
"disputed": false,
"cardNumber": "9679501234567890",
"note": "That seems right."
}'

bills/post-bill-response.sh '{
"billRequestId": 13,
"disputed": true,
"note": "That does not seem right."
}'

auth/login.sh isabella isabella
bills/post-bill-response.sh '{
"billRequestId": 14,
"disputed": true,
"note": "That does not seem right."
}'

bills/post-bill-response.sh '{
"billRequestId": 16,
"disputed": true,
"note": "That does not seem right."
}'

auth/login.sh jacob jacob
bills/post-bill-response.sh '{
"billRequestId": 15,
"disputed": true,
"note": "That does not seem right."
}'

# Bill Requests Table, Bill Responses Tables
# Bad Clients Table, Good Clients Table