#!/bin/zsh
cd $(dirname $0)/..
rm -rf webp
mkdir webp

BATCH=4

creategif() {
    name=${${1%.*}##*/} # ${${1%.*}##*/} = transitions/<name>.glsl -> <name>
    gl-transition-render \
        -t $1 \
        -i scripts/images/fromImage.jpg \
        -i scripts/images/toImage.jpg \
        -g scripts/images/spiral-2.png \
        -f 30 \
        -d 8  \
        -w 424 \
        -h 352 \
        -o $name/ 2> /dev/null; \
    ffmpeg \
        -framerate 30 \
        -i $name/%d.png \
        -vcodec libwebp \
        -lossless 0 \
        -compression_level 5 \
        -loop 0 \
        -s 424:352 \
        webp/$name.webp \
        2> /dev/null;
    rm -rf $name
    echo Generated webp/$name.webp
}

(
for f in transitions/*.glsl; do
   ((i=i%BATCH)); ((i++==0)) && wait
   creategif $f & 
done
)
