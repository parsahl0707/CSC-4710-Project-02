# Quote Request Revisions

auth/login.sh alice alice
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 1,
"accepted": true,
"note": "Ok"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 2,
"accepted": true,
"note": "Good"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 3,
"accepted": true,
"note": "Cool"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 4,
"accepted": true,
"note": "Cool"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 5,
"accepted": true,
"note": "Cool"
}'

auth/login.sh bobby bobby
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 6,
"accepted": true,
"note": "Ok"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 7,
"accepted": true,
"note": "Ok"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 8,
"accepted": true,
"note": "Ok"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 9,
"accepted": true,
"note": "Ok"
}'

auth/login.sh george george
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 16,
"accepted": true,
"note": "Ok"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 17,
"accepted": true,
"note": "Ok"
}'

auth/login.sh harold harold
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 18,
"accepted": true,
"note": "Ok"
}'

quotes/post-quote-request-revision.sh '{
"quoteRequestId": 19,
"accepted": true,
"note": "Ok"
}'

# Quote Request Revisions Table, Agreed Quotes Table
# Work Orders Table, Work Orders with Largest Driveway
# Difficult Clients Table