commit = $(shell git rev-parse HEAD)
version = latest

docker:
	docker build . \
		--pull \
		-t "quay.io/iver-wharf/wharf-web:latest" \
		-t "quay.io/iver-wharf/wharf-web:$(version)" \
		--build-arg BUILD_VERSION="$(version)" \
		--build-arg BUILD_GIT_COMMIT="$(commit)" \
		--build-arg BUILD_DATE="$(shell date --iso-8601=seconds)"
	@echo ""
	@echo "Push the image by running:"
	@echo "docker push quay.io/iver-wharf/wharf-web:latest"
ifneq "$(version)" "latest"
	@echo "docker push quay.io/iver-wharf/wharf-web:$(version)"
endif

docker-run:
	docker run --rm -it quay.io/iver-wharf/wharf-web:$(version)

serve: clients
	npm start

clients:
ifeq ("$(wildcard dist/api-client)","")
	npx ng build api-client
endif
ifeq ("$(wildcard dist/import-gitlab-client)","")
	npx ng build import-gitlab-client
endif
ifeq ("$(wildcard dist/import-github-client)","")
	npx ng build import-github-client
endif
ifeq ("$(wildcard dist/import-azuredevops-client)","")
	npx ng build import-azuredevops-client
endif
	@# This comment silences warning "make: Nothing to be done for 'clients'."

deps:
	npm install
