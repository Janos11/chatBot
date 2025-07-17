Docker-to-Docker on same network
If both containers are in a Docker network:

Create a network (if you haven't):
```bash
docker network create chatnet
```


Run containers with `--network chatnet`:

```bash
docker run --name ollama --network chatnet ...
docker run --name apache --network chatnet ...
```


Use container names in proxy config:

```bash
ProxyPass "/api/generate" "http://ollama:11434/api/generate"
ProxyPassReverse "/api/generate" "http://ollama:11434/api/generate"
```

Inspect ports:
```bash
docker inspect chatBot | grep -i port
docker inspect ollama | grep -i port
```

Inspect Docker network:

```bash
docker network inspect chatnet
```
