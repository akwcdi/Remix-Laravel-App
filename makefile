.PHONY: build
build:
	docker-compose up -d --build
	docker-compose exec -T backend composer install
	docker-compose exec -T backend php artisan migrate:fresh --seed
	docker-compose exec -T backend chmod -R 777 storage bootstrap/cache
	docker-compose exec -T backend php artisan key:generate
	docker-compose exec -T backend php artisan storage:link
up:
	docker-compose up -d
down:
	docker-compose down
ps:
	docker-compose ps