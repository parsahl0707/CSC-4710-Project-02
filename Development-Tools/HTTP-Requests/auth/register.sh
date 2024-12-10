data='{ "username": "'${1}'", "password": "'${2}'", "firstname": "'${1}'", "lastname": "'${2}'" }'

curl -v -X POST \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d "${data}" \
localhost:5050/register