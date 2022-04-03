cls
docker rm -v db_diplomarbeit -f
docker volume prune -f
docker compose up


@REM npm run test