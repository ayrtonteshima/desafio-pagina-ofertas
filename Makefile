PROJECT = "Desafio Hotel Urbano"


all: install start

install: ;@echo "Instalando o ${PROJECT}....."; \
	npm install

start: ;@echo "Iniciando o ${PROJECT}....."; \
	./node_modules/gulp/bin/gulp.js

test: ;@echo "Testando ${PROJECT}....."; \
	./node_modules/karma/bin/karma start karma.conf.js 

run: ;@echo "Iniciando ${PROJECT}....."; \
	./node_modules/gulp/bin/gulp.js

.PHONY: test install start