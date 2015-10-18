# sevilla-developers
Sevilla developers website

## Deploy

1. Create the docker-password.yml. 

```
cp docker-password.sample.yml  docker-password.yml 
```

2. Build de dockers.
```
docker-compose build
```

3. Start 

3.1. Production
```
docker-compose up -d
```

3.2. Dev environment

if it's the first time you run the dev environment you need to install your nodejs dependencies:
```
docker run --rm -it -v $(pwd)/backend/src/sevilla-developers:/app sevilladevelopers_backend_1 npm install --no-bin-links

```

After that

```
docker-compose -f docker-compose.dev.yml up -d 

# To attach to webserver console
docker-compose -f docker-compose.dev.yml up webserver

# To exec some commands
docker exec -it sevilladevelopers_backend_1 bash

```

4. Refresh server
```
git pull origin master
docker-compose build
docker-compose up -d
``

