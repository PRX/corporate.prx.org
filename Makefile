.PHONY: dev-init dev-start deploy

dev-init:
	asdf install
	npm install -g npm@latest
	npm install
	echo 8074 > ~/.puma-dev/corporate.prx

dev-start:
	npm start

deploy:
	git push origin
	git push squarespace
