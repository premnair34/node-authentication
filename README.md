## About:
Simple authentication application, uses crypto encryption and decryption with a customized key from env configuration

## Executution:
1. npm i
2. npm start

## Test Curl:

curl --location --request POST 'localhost:5003/api/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "test@gmail.com",
    "password": "password"
}'

curl --location --request GET 'localhost:5003/api/welcome' \
--header 'token: e079fa40beb737df9ba9d310b7af5547:eb215a787e0695206b90f7295f255954' \
--data-raw ''

## Automated Test:
1. npx cypress open
2. click api -> tests.js