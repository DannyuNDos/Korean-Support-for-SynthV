# Korean Support for SynthV
A script for alloting phonemes for Korean lyrics in SynthV.

## How to use

### Installation
Copy the `KoreanPhones.js` file to the `scripts` folder, as shown in https://manual.synthv.info/advanced/scripting/#adding-new-scripts.

### Execution
In the SynthV Studio, select the notes that has Korean lyrics written in Hangul, then execute `Scripts > Unofficial language support > Korean Phones` in the menu. If this doesn't appear in the menu, execute `Scripts > Rescan`, and try again.

## Caveats
You need SynthV Studio Pro to use this script.

This script doesn't actually add Korean as a new language, but merely emulates Korean by using Mandarin and English phonemes.

You must input Hangul for the Korean phonemes, not for the raw Korean text. For example, if you intend to input `갑니다`, input `감니다` instead.

This script is guaranteed to work only under the standalone version of SynthV. Under the plugin version of SynthV, this script may suffer compatibility issues.
