.PHONY: deps clean \
	docker docker-run serve \
	clients-force clients \
	lint lint-ng lint-md lint-scss \
	lint-fix lint-ng-fix lint-md-fix lint-scss-fix

commit = $(shell git rev-parse HEAD)
version = latest

deps:
	npm install

clean:
	rm -vrf dist/api-client
	rm -vrf dist/import-gitlab-client
	rm -vrf dist/import-github-client
	rm -vrf dist/import-azuredevops-client

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

clients-force:
	npm run build-clients

clients: dist/api-client dist/import-gitlab-client dist/import-github-client dist/import-azuredevops-client

dist/api-client:
	npx ng build api-client

dist/import-gitlab-client:
	npx ng build import-gitlab-client

dist/import-github-client:
	npx ng build import-github-client

dist/import-azuredevops-client:
	npx ng build import-azuredevops-client

lint: lint-ng lint-md lint-scss

lint-fix: lint-ng-fix lint-md-fix lint-scss-fix

lint-ng:
	npx ng lint

lint-ng-fix:
	npx ng lint --fix

lint-md:
	remark . .github

lint-md-fix:
	remark . .github -o

lint-scss:
	stylelint 'src/**/*.scss'

lint-scss-fix:
	stylelint 'src/**/*.scss' --fix
