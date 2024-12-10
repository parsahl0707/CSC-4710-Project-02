auth/register.sh '{ "username": "client", "password": "client", "firstname": "Clint", "lastname": "Usury" }'

# Quotes
auth/login.sh client client
quotes/post-quote-request.sh # negotiating
quotes/post-quote-request.sh # rejected
quotes/post-quote-request.sh # accepted
quotes/post-quote-request.sh # accepted
quotes/post-quote-request.sh # rejected
quotes/post-quote-request.sh # rejected
quotes/post-quote-request.sh # rejected
quotes/post-quote-request.sh # rejected
quotes/post-quote-request.sh # accepted
quotes/post-quote-request.sh # accepted
quotes/post-quote-request.sh # accepted

auth/login.sh admin admin
quotes/post-quote-response.sh 1 false
quotes/post-quote-response.sh 2 false
quotes/post-quote-response.sh 3 false
quotes/post-quote-response.sh 4 false
quotes/post-quote-response.sh 5 true
quotes/post-quote-response.sh 6 true
quotes/post-quote-response.sh 7 true
quotes/post-quote-response.sh 8 true
quotes/post-quote-response.sh 9 false
quotes/post-quote-response.sh 10 false
quotes/post-quote-response.sh 11 false

auth/login.sh client client
quotes/post-quote-request-revision.sh 1 false
quotes/post-quote-request-revision.sh 2 false
quotes/post-quote-request-revision.sh 3 true
quotes/post-quote-request-revision.sh 4 true
quotes/post-quote-request-revision.sh 9 true
quotes/post-quote-request-revision.sh 10 true
quotes/post-quote-request-revision.sh 11 true

auth/login.sh admin admin
quotes/post-quote-response-revision.sh 1 false
quotes/post-quote-response-revision.sh 2 true

# Bills
auth/login.sh admin admin
bills/post-bill-request.sh 2 # paid
bills/post-bill-request.sh 3 # paid
bills/post-bill-request.sh 4 # disputed
bills/post-bill-request.sh 5 # paid

auth/login.sh client client
bills/post-bill-response.sh 1 false
bills/post-bill-response.sh 2 false
bills/post-bill-response.sh 3 true
bills/post-bill-response.sh 4 true

auth/login.sh admin admin
bills/post-bill-request-revision.sh 3
bills/post-bill-request-revision.sh 4

auth/login.sh client client
bills/post-bill-response-revision.sh 3 true
bills/post-bill-response-revision.sh 4 false
