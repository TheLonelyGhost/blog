ifndef HUGO
	HUGO := hugo
endif

.PHONY: serve
serve:
	$(HUGO) serve --disableFastRender

.PHONY: build
build:
	$(HUGO) --disableFastRender
