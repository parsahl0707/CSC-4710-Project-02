# Quote Request Revisions

auth/login.sh bobby bobby
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 23,
"accepted": true,
"note": "Ok"
}'

auth/login.sh evan evan
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 24,
"accepted": true,
"note": "Ok"
}'

auth/login.sh frank frank
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 25,
"accepted": true,
"note": "Ok"
}'