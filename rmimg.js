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


async function exifRemoveDirectoryImages(from, to){

    fs.readdirSync(from).forEach(file => {

        let target_from = path.resolve(from, file),
            target_to = path.resolve(to, file);

        if(fs.lstatSync(target_from).isDirectory()){

            if(!fs.existsSync(target_to)){
                fs.mkdirSync(target_to);
            }

            return exifRemoveDirectoryImages(target_from, target_to);

        }else{

            let ext = path.extname(target_from);

            switch(ext){

                case '.jpeg':
                case '.jpg':
                case '.png':
                case '.gif':
                    return exifRemoveImage(target_from, target_to);

            }

        }

    });

}
