#export EMCC_DEBUG=1

main.js: src/main.cpp
	em++ --bind --std=c++11 src/*.cpp src/models/*.cpp -O3 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -o ../public/main.js

clean:
	rm *.js *.wasm
