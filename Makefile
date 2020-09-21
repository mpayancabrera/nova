.PHONY: init up down stop

init:
	cd api; npm ci;
	cd web; npm ci;

up:
	docker-compose -f docker-compose.yml up -d --build $(c)

down:
	docker-compose -f docker-compose.yml down $(c)

stop:
	docker-compose -f docker-compose.yml stop $(c)
