cls
docker rm -v db_diplomarbeit -f
docker volume prune -f
docker compose up -d


@REM npm run test