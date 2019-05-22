.PHONY: clean build package.json docs release example sass css

build: clean javascript typescript css package.json documentation

javascript: $(subst src,dist,$(shell find src -name '*.js' ! -name '*-test.js'))

typescript: $(subst src,dist,$(shell find src -name '*.ts*'))

dist/%.js: src/%.js
	@mkdir -p $(@D)
	@yarn babel -o dist/$*.js $<
	@echo "[+] dist/$*.js"

dist/%.ts: src/%.ts
	@mkdir -p $(@D)
	@yarn babel -o dist/$*.js $<
	@echo "[+] dist/$*.js"

dist/%.tsx: src/%.tsx
	@mkdir -p $(@D)
	@yarn babel -o dist/$*.js $<
	@echo "[+] dist/$*.js"

css: sass
	node_modules/.bin/node-sass ./dist/style/ars-arsenal.scss --stdout > dist/style.css

sass:
	@mkdir -p dist
	cp -r src/style dist/style

package.json:
	@node -p 'p=require("./package");p.private=undefined;p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

documentation: README.md LICENSE.md
	@mkdir -p dist
	cp -r $^ dist

release: clean build
	yarn test
	npm publish dist

prerelease: clean build
	yarn test
	npm publish dist --tag beta

clean:
	rm -rf dist
