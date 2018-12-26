#!/bin/bash

fails=""

inspect() {
    if [ $1 -ne 0 ]; then
        fails="${fails} $2"
    fi
}

# run unit and integratino tests
# $? returns 0 or 1
docker-compose -f docker-compose-dev.yml up -d --build
docker-compose -f docker-compose-dev.yml run users python manage.py test
inspect $? users
docker-compose -f docker-compose-dev.yml run users flake8 project
inspect $? users-lint
docker-compose -f docker-compose-dev.yml run client npm test -- --coverage
inspect $? client
docker-compose -f docker-compose-dev.yml down


# run e2e test
docker-compose -f docker-compose-dev.yml up -d --build
docker-compose -f docker-compose-dev.yml run users python manage.py recreate-db
./node_modules/.bin/cypress run --config baseUrl=http://localhost
inspect $? e2e
docker-compose -f docker-compose-dev.yml down

#return proper code
if [ -n "${fails}" ]; then
    echo "Tests failed: ${fails}"
    exit 1
else
    echo "Tests passed!"
    exit 0
fi
