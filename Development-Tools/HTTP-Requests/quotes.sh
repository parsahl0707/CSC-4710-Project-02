#./quotes.sh client client admin admin

# Quotes
auth/login.sh $1 $2
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh
quotes/post-quote-request.sh

auth/login.sh $3 $4
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

auth/login.sh $1 $2
quotes/post-quote-request-revision.sh 1 false
quotes/post-quote-request-revision.sh 2 false
quotes/post-quote-request-revision.sh 3 true
quotes/post-quote-request-revision.sh 4 true
quotes/post-quote-request-revision.sh 9 true
quotes/post-quote-request-revision.sh 10 true
quotes/post-quote-request-revision.sh 11 true

auth/login.sh $3 $4
quotes/post-quote-response-revision.sh 1 false
quotes/post-quote-response-revision.sh 2 true