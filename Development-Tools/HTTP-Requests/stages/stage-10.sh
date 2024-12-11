# Bill Response Revisions

auth/login.sh george george
bills/post-bill-response-revision.sh '{
"billResponseId": 9,
"disputed": false,
"cardNumber": "6666555544443333",
"note": "That is alright"
}'

auth/login.sh harold harold
bills/post-bill-response-revision.sh '{
"billResponseId": 11,
"disputed": false,
"cardNumber": "9679501234567890",
"note": "That is fine"
}'

auth/login.sh isabella isabella
bills/post-bill-response-revision.sh '{
"billResponseId": 12,
"disputed": false,
"cardNumber": "0889018890188901",
"note": "Fine by me"
}'

bills/post-bill-response-revision.sh '{
"billResponseId": 13,
"disputed": false,
"cardNumber": "0889018890188901",
"note": "Fine by me"
}'

auth/login.sh jacob jacob
bills/post-bill-response-revision.sh '{
"billResponseId": 14,
"disputed": true,
"note": "No good"
}'