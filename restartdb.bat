cls
docker rm -v db -f
docker volume prune -f
docker compose up -d


@REM npm run test