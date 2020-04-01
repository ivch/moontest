# Moon Active test app

### Notes
This is my first NodeJS app, so I intentionally skipped some important parts like tests or correct delivery scripts

## Build
`docker-compose build` 

## Run
`docker-compose up`

## Test 
`curl POST 'http://localhost:8080/echoAtTime' --header 'Content-Type: application/json' --data-raw '{"message":"hello", "time":1585756667}'`
! don't forget to add correct timestamp for message