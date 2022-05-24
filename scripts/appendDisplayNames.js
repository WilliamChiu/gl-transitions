const fs = require('fs')
const { exit } = require('process');

const displayNames = {
    "Bounce": "Bounce",
    "BowTieHorizontal": "Bow Tie",
    "BowTieVertical": "Bow Tie Vertical",
    "BowTieWithParameter": "Bow Tie With Parameter",
    "ButterflyWaveScrawler": "Butterfly Wave",
    "CircleCrop": "Circle Crop",
    "ColourDistance": "Colour Distance",
    "CrazyParametricFun": "Parametric",
    "CrossZoom": "Cross Zoom",
    "Directional": "Directional",
    "DoomScreenTransition": "Doom Screen",
    "Dreamy": "Dreamy",
    "DreamyZoom": "Dreamy Zoom",
    "FilmBurn": "Film Burn",
    "GlitchDisplace": "Glitch Displace",
    "GlitchMemories": "Glitch Memories",
    "GridFlip": "Grid Flip",
    "InvertedPageCurl": "Page Curl",
    "LeftRight": "Left Right",
    "LinearBlur": "Linear Blur",
    "Mosaic": "Mosaic",
    "PolkaDotsCurtain": "Polka Dot Wave",
    "Radial": "Radial",
    "SimpleZoom": "Simple Zoom",
    "StereoViewer": "Stereo Viewer",
    "Swirl": "Swirl",
    "TVStatic": "TV Static",
    "TopBottom": "Top Bottom",
    "WaterDrop": "Water Drop",
    "ZoomInCircles": "Zoom In Circles",
    "angular": "Angular",
    "burn": "Burn",
    "cannabisleaf": "Leaf",
    "circle": "Circle",
    "circleopen": "Circle Open",
    "colorphase": "Color Phase",
    "crosshatch": "Cross Hatch",
    "crosswarp": "Cross Warp",
    "cube": "Cube",
    "directional-easing": "Easing",
    "directionalwarp": "Diagonal Warp",
    "directionalwipe": "Diagonal Wipe",
    "displacement": "Displacement",
    "doorway": "Doorway",
    "fade": "Fade",
    "fadecolor": "Fade Color",
    "fadegrayscale": "Fade Grayscale",
    "flyeye": "Flyeye",
    "heart": "Heart",
    "hexagonalize": "Hexagonalize",
    "kaleidoscope": "Kaleidoscope",
    "luma": "Luma",
    "luminance_melt": "Luminance Melt",
    "morph": "Morph",
    "multiply_blend": "Multiply Blend",
    "perlin": "Perlin",
    "pinwheel": "Pinwheel",
    "pixelize": "Pixelize",
    "polar_function": "Polar Function",
    "randomNoisex": "Noise",
    "randomsquares": "Squares",
    "ripple": "Ripple",
    "rotateTransition": "Rotate",
    "rotate_scale_fade": "Rotate Zoom",
    "squareswire": "Squares Wire",
    "squeeze": "Squeeze",
    "swap": "Swap",
    "tangentMotionBlur": "Motion Blur",
    "undulatingBurnOut": "Page Burn Out",
    "wind": "Wind",
    "windowblinds": "Window Blinds",
    "windowslice": "Window Slice",
    "wipeDown": "Wipe Down",
    "wipeLeft": "Wipe Left",
    "wipeRight": "Wipe Right",
    "wipeUp": "Wipe Up",
    "Overexposure" : "Overexposure",
    "ZoomLeftWipe" : "Zoom Left Wipe",
    "ZoomRigthWipe" : "Zoom Right Wipe",
    "coord-from-in" : "Coord From In",
    "powerKaleido" : "Power Kaleido",
    "scale-in" : "Scale In",
    "star": "Star",
}

const RED = "\x1b[31m";
const RESET = "\x1b[0m";

const count = names =>
  names.reduce((result, value) => ({ ...result,
    [value]: (result[value] || 0) + 1
  }), {});

const duplicates = dict =>
  Object.keys(dict).filter((a) => dict[a] > 1);

let success = true
const names = Object.values(displayNames)
const duplicateNames = duplicates(count(names))
if (duplicateNames.length) {
    console.error(RED, `Duplicate transition names present: ${duplicateNames}`, RESET)
    success = false
}
if (!success) exit(1)

const transitions = JSON.parse(fs.readFileSync(process.argv[2], "utf8"))
fs.writeFileSync(process.argv[2], JSON.stringify(transitions.map(transition => {
    if (!displayNames[transition.name]) {
        console.error(RED, `${transition.name} not in displayNames. Please add a displayName to the dictionary.`, RESET)
        success = false
    }
    return ({displayName: displayNames[transition.name], ...transition})
})))
if (!success) exit(1)