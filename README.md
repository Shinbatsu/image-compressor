# IMG Compressor and Metadata Cleaner

Useful recursive image compressor and metadata remover.

### Install

```sh
git clone https://github.com/Shinbatsu/image-compressor.git
npm install 
node run <rmimg> | <cmimg>
```


## Compress Image 

### Compress One Image

```sh
cmimg /directory/image1.png
cmimg /directory/image2.jpeg
cmimg /directory/sub/image3.gif
```

### Compress All Images in Directory (Recursive)

```sh
cmimg /directory
cmimg .
```