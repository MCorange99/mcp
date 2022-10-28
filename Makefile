
all: build

build:
	@npx eslint
	@npx tsc

run: build
	@node .

clean:
	rm -rf ./target/