URL := https://www.thelonelyghost.com/

ifndef HUGO
	HUGO := hugo
endif

ifndef LINKCHECKER
	LINKCHECKER := linkchecker
endif

.PHONY: serve
serve:
	$(HUGO) serve --buildDrafts

.PHONY: build
build:
	$(HUGO)

.PHONY: build-prod
build-prod:
	$(HUGO) --minify --baseURL $(URL)

.PHONY: test
test:
	find ./public -name '*.html' | $(LINKCHECKER) --stdin --check-extern --ignore-url '^file:///admin/.*' --ignore-url '^file:///svg/loading\.min\.svg$$'
