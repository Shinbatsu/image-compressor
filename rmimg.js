#!/usr/bin/env node

require('colors');

let fs = require('fs');
let path = require('path');
let sharp = require('sharp');

async function exifRemoveImage(from, to){

    try {

        let inputBuffer = fs.readFileSync(from);
        let input = await sharp(inputBuffer);
        let inputMetadata = await input.metadata();

        let output = await sharp({
            create: {
                width : inputMetadata.width,
                height : inputMetadata.height,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        }).composite([{input: inputBuffer, top: 0, left: 0}]);

        await output.toFile(to);

        console.log('Exif removed:'.green, from.blue, to.cyan);

    }catch (e){
        console.log('Error:'.red, from.blue);
    }

    return false;

}