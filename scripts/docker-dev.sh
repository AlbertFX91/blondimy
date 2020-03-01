cd ../

# Launch docker-compose test
docker-compose -f docker-compose.dev.yml up --build

# Down
docker-compose -f docker-compose.dev.yml down