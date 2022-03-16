cd $(dirname $0)/..
set -e

remoteVersion=`npm show @achillyblue/gl-transitions version`

rm -rf release/
cp -R scripts/release-skeleton release
cd release
npm version $remoteVersion --no-git-tag-version
npm version minor --no-git-tag-version
cd -

gl-transition-transform -d transitions -o release/gl-transitions.json
node scripts/appendDisplayNames.js release/gl-transitions.json
cd release
echo "window.GLTransitions=" | cat - gl-transitions.json > gl-transitions.js
echo "module.exports=" | cat - gl-transitions.json > index.js
echo "module.exports=" | cat - gl-transitions.json > index.js
mv index.d.ts.skeleton index.d.ts
node -p '"export type GLTransitionNames = " + require("./gl-transitions.json").map(t => `"${t.name}"`).join(" | ") + ";"' >> index.d.ts
node -p '"export type UniformValue = " + [...new Set(require("./gl-transitions.json").flatMap(t => Object.values(t.paramsTypes)))].map(x => `"${x}"`).join(" | ") + ";"' >> index.d.ts
mkdir transitions && cp ../transitions/*.glsl transitions/.
