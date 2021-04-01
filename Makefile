rebuild:
	@docker-compose build
.PHONY: rebuild

destroy:
	@docker-compose down -v --rmi local
.PHONY: destroy

task:
	@docker-compose up --build -d task
.PHONY: task

migrate:
	@docker-compose up --build -d migrate
.PHONY: migrate

kafka:
	@docker-compose up --build -d kafka
.PHONY: kafka

zookeeper:
	@docker-compose up --build -d zookeeper
.PHONY: zookeeper

debezium-connect:
	@docker-compose up --build -d  debezium-connect
.PHONY:  debezium-connect

elasticsearch:
	@docker-compose up --build -d elasticsearch
.PHONY: elasticsearch

elasticsearch-connect:
	@docker-compose up --build -d elasticsearch-connect
.PHONY: elasticsearch-connect

start-postgres:
	@docker-compose up -d postgres
.PHONY: start-postgres

prepare: start-postgres migrate zookeeper kafka debezium-connect elasticsearch elasticsearch-connect task
.PHONY: prepare

stop:
	@docker stop $(docker ps -a -q)
.PHONY: stop

remove:
	@docker rm $(docker ps -a -q)
.PHONY: remove

