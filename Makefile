ifndef HUGO
	HUGO := hugo
endif

.PHONY: build
build:
	$(HUGO) serve --disableFastRender
