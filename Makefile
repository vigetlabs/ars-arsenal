BABEL = node_modules/.bin/babel
SASS = node_modules/.bin/node-sass

.PHONY: clean build package.json javascript docs release example sass css

build: clean javascript css package.json documentation

javascript: $(shell find src -name '*.js*' ! -name '*-test.js*')
	@mkdir -p dist
	@$(BABEL) -d dist $^

css: sass
	$(SASS) ./dist/style/ars-arsenal.scss --stdout > dist/style.css

sass:
	@mkdir -p dist
	cp -r src/style dist/style

package.json:
	@node -p 'p=require("./package");p.private=undefined;p.scripts=p.devDependencies=undefined;JSON.stringify(p,null,2)' > dist/package.json

documentation: README.md LICENSE.md
	@mkdir -p dist
	cp -r $^ dist

release: clean build
	npm publish dist

prerelease: clean build
	npm publish dist --tag beta

clean:
	rm -rf dist
