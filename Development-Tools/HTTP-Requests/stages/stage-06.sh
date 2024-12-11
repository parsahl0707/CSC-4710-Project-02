# Quote Response Revisions

auth/login.sh admin admin
quotes/post-quote-response-revision.sh '{
"quoteResponseId": 21,
"rejected": false,
"proposedPrice": 3300,
"startDate": "2024-12-19 12:00:00",
"endDate": "2024-12-20 12:00:00",
"note": "Deal."
}'

# Quote Request Revisions
auth/login.sh isabella isabella
quotes/post-quote-request-revision.sh '{
"quoteRequestId": 21,
"accepted": true,
"note": "Ok"
}'

# Quote Request Revisions Table, Quote Response Revisions Table