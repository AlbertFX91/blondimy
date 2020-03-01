cd ../

# Launch docker-compose test
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit

# Down
docker-compose -f docker-compose.test.yml down