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

serve: swag
	npm start

deps:
	npm install
