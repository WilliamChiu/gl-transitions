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
        -f 20 \
        -d 5  \
        -w 240 \
        -h 200 \
        -o $name/ 2> /dev/null; \
    ffmpeg \
        -framerate 20 \
        -i $name/%d.png \
        -vcodec libwebp \
        -lossless 0 \
        -quality 10 \
        -compression_level 3 \
        -loop 0 \
        -s 240:200 \
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

gsutil -m cp webp/** "gs://kapwing/static/transitions/"
gsutil -m acl set public-read "gs://kapwing/static/transitions/**.webp"
rm -rf webp