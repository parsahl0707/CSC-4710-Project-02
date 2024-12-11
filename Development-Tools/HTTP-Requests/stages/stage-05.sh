# Quote Request Revisions

auth/login.sh isabella isabella
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 20,
"accepted": true,
"note": "Ok"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 21,
"accepted": true,
"note": "Ok"
}'

auth/login.sh jacob jacob
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 22,
"accepted": true,
"note": "Ok"
}'