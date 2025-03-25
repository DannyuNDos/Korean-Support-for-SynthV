function getClientInfo() {
    return {
        "name": "Korean Phones",
        "category": "Unofficial language support",
        "author": "Dannyu NDos",
        "versionNumber": 0,
        "minEditorVersion": 67840
    };
};

function main() {
    const notes = SV.getMainEditor().getSelection().getSelectedNotes();
    for (var i = 0; i < notes.length; ++i) {
        setToKorean(notes[i]);
    }
    SV.finish();
};

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

function setToKorean(note) {
    const lyrics = note.getLyrics();
    var phonemes = [];
    var leading_glottal = 0;
    if ('\'' == lyrics[0]) {
        phonemes.push("cl");
        leading_glottal = 1;
    }
    for (var i = leading_glottal; i < lyrics.length; ++i) {
        var syllable_phonemes = [];
        if ('가' <= lyrics[i] && lyrics[i] <= '힣') {
            const onsetN = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
            const vowelN = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
            const codaN = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ";
            const syllable_index = lyrics.charCodeAt(i) - "가".charCodeAt(0);
            const coda = syllable_index % codaN.length;
            const vowel = (syllable_index - coda) / codaN.length % vowelN.length;
            const onset = ((syllable_index - coda) / codaN.length - vowel) / vowelN.length % onsetN.length;
            switch (vowelN[vowel]) {
                case 'ㅏ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["a"];
                    break;
                case 'ㅐ':
                    note.setLanguageOverride("english");
                    syllable_phonemes = ["ae"];
                    break;
                case 'ㅑ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["j", "a"] : ["#j", "a"];
                    break;
                case 'ㅒ':
                    note.setLanguageOverride("english");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["y", "ae"] : ["#y", "ae"];
                    break;
                case 'ㅓ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["@"];
                    break;
                case 'ㅔ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["e"];
                    break;
                case 'ㅕ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["j", "@"] : ["#j", "@"];
                    break;
                case 'ㅖ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["j", "e"] : ["#j", "e"];
                    break;
                case 'ㅗ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["U"];
                    break;
                case 'ㅘ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["w", "a"] : ["#w", "a"];
                    break;
                case 'ㅙ':
                    note.setLanguageOverride("english");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["w", "ae"] : ["#w", "ae"];
                    break;
                case 'ㅚ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["ue"];
                    break;
                case 'ㅛ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["j", "U"] : ["#j", "U"];
                    break;
                case 'ㅜ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["u"];
                    break;
                case 'ㅝ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["w", "@"] : ["#w", "@"];
                    break;
                case 'ㅞ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["w", "e"] : ["#w", "e"];
                    break;
                case 'ㅟ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["y", ":\\i"];
                    break;
                case 'ㅠ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 'ㅇ' == onsetN[onset] ? ["j", "u"] : ["#j", "u"];
                    break;
                case 'ㅡ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["i\\"];
                    break;
                case 'ㅢ':
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["i\\", ":\\i"];
                    break;
                default:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["i"];
                    break;
            }
            if ("mandarin" == note.getLanguageOverride()) {
                switch (onsetN[onset]) {
                    case 'ㄱ':
                        syllable_phonemes = ["k"].concat(syllable_phonemes);
                        break;
                    case 'ㄲ':
                        syllable_phonemes = ["#cl", "#k"].concat(syllable_phonemes);
                        break;
                    case 'ㄴ':
                        syllable_phonemes = ["#n"].concat(syllable_phonemes);
                        break;
                    case 'ㄷ':
                        syllable_phonemes = ["t"].concat(syllable_phonemes);
                        break;
                    case 'ㄸ':
                        syllable_phonemes = ["#cl", "#t"].concat(syllable_phonemes);
                        break;
                    case 'ㄹ':
                        syllable_phonemes = ["$t"].concat(syllable_phonemes);
                        break;
                    case 'ㅁ':
                        syllable_phonemes = ["#m"].concat(syllable_phonemes);
                        break;
                    case 'ㅂ':
                        syllable_phonemes = ["p"].concat(syllable_phonemes);
                        break;
                    case 'ㅃ':
                        syllable_phonemes = ["#cl", "#p"].concat(syllable_phonemes);
                        break;
                    case 'ㅅ':
                        if (syllable_phonemes[0] == "#j") {
                            syllable_phonemes = ["#s\\", "$x"].concat(syllable_phonemes.slice(1));
                        }
                        else if (["i", "y"].indexOf(syllable_phonemes[0]) >= 0) {
                            syllable_phonemes = ["#s\\", "$x"].concat(syllable_phonemes);
                        }
                        else {
                            syllable_phonemes = ["#s", "$x"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅆ':
                        if (syllable_phonemes[0] == "#j") {
                            syllable_phonemes = ["s\\"].concat(syllable_phonemes.slice(1));
                        }
                        else if (["i", "y"].indexOf(syllable_phonemes[0]) >= 0) {
                            syllable_phonemes = ["s\\"].concat(syllable_phonemes);
                        }
                        else {
                            syllable_phonemes = ["s"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅇ':
                        break;
                    case 'ㅈ':
                        if (syllable_phonemes[0] == "#j") {
                            syllable_phonemes = ["ts\\"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["ts\\"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅉ':
                        if (syllable_phonemes[0] == "#j") {
                            syllable_phonemes = ["#cl", "#ts\\"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["#cl", "#ts\\"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅊ':
                        if (syllable_phonemes[0] == "#j") {
                            syllable_phonemes = ["ts\\h"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["ts\\h"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅋ':
                        syllable_phonemes = ["kh"].concat(syllable_phonemes);
                        break;
                    case 'ㅌ':
                        syllable_phonemes = ["th"].concat(syllable_phonemes);
                        break;
                    case 'ㅍ':
                        syllable_phonemes = ["ph"].concat(syllable_phonemes);
                        break;
                    default:
                        syllable_phonemes = ["x"].concat(syllable_phonemes);
                        break;
                }
                switch (codaN[coda]) {
                    case ' ':
                        break;
                    case 'ㄴ': case 'ㄵ': case 'ㄶ':
                        syllable_phonemes.push(":n");
                        break;
                    case 'ㄹ': case 'ㄼ': case 'ㄽ': case 'ㄾ': case 'ㅀ':
                        syllable_phonemes.push("l");
                        break;
                    case 'ㄻ': case 'ㅁ':
                        syllable_phonemes.push("m");
                        break;
                    case 'ㅇ':
                        syllable_phonemes.push("N");
                        break;
                    case 'ㄷ': case 'ㅅ': case 'ㅆ': case 'ㅈ': case 'ㅊ': case 'ㅌ': case 'ㅎ':
                        syllable_phonemes.push("t");
                        break;
                    case 'ㄿ': case 'ㅂ': case 'ㅄ': case 'ㅍ':
                        syllable_phonemes.push("p");
                        break;
                    default:
                        syllable_phonemes.push("k");
                        break;
                }
                if (note.getMusicalType() == "rap") {
                    note.setRapAccent(4);
                }
            }
            else if ("english" == note.getLanguageOverride()) {
                switch (onsetN[onset]) {
                    case 'ㄱ':
                        syllable_phonemes = ["g"].concat(syllable_phonemes);
                        break;
                    case 'ㄲ':
                        syllable_phonemes = ["#cl", "#g"].concat(syllable_phonemes);
                        break;
                    case 'ㄴ':
                        syllable_phonemes = ["#n"].concat(syllable_phonemes);
                        break;
                    case 'ㄷ':
                        syllable_phonemes = ["d"].concat(syllable_phonemes);
                        break;
                    case 'ㄸ':
                        syllable_phonemes = ["#cl", "#d"].concat(syllable_phonemes);
                        break;
                    case 'ㄹ':
                        syllable_phonemes = ["dx"].concat(syllable_phonemes);
                        break;
                    case 'ㅁ':
                        syllable_phonemes = ["#m"].concat(syllable_phonemes);
                        break;
                    case 'ㅂ':
                        syllable_phonemes = ["b"].concat(syllable_phonemes);
                        break;
                    case 'ㅃ':
                        syllable_phonemes = ["#cl", "#b"].concat(syllable_phonemes);
                        break;
                    case 'ㅅ':
                        if (syllable_phonemes[0] == "#y") {
                            syllable_phonemes = ["#sh", "$hh"].concat(syllable_phonemes.slice(1));
                        }
                        else if (["iy"].indexOf(syllable_phonemes[0]) >= 0) {
                            syllable_phonemes = ["#sh", "$hh"].concat(syllable_phonemes);
                        }
                        else {
                            syllable_phonemes = ["#s", "$hh"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅆ':
                        if (syllable_phonemes[0] == "#y") {
                            syllable_phonemes = ["sh"].concat(syllable_phonemes.slice(1));
                        }
                        else if (["iy"].indexOf(syllable_phonemes[0]) >= 0) {
                            syllable_phonemes = ["sh"].concat(syllable_phonemes);
                        }
                        else {
                            syllable_phonemes = ["s"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅇ':
                        break;
                    case 'ㅈ':
                        if (syllable_phonemes[0] == "#y") {
                            syllable_phonemes = ["jh"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["jh"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅉ':
                        if (syllable_phonemes[0] == "#y") {
                            syllable_phonemes = ["#cl", "#jh"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["#cl", "#jh"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅊ':
                        if (syllable_phonemes[0] == "#y") {
                            syllable_phonemes = ["ch"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["ch"].concat(syllable_phonemes);
                        }
                        break;
                    case 'ㅋ':
                        syllable_phonemes = ["k"].concat(syllable_phonemes);
                        break;
                    case 'ㅌ':
                        syllable_phonemes = ["t"].concat(syllable_phonemes);
                        break;
                    case 'ㅍ':
                        syllable_phonemes = ["p"].concat(syllable_phonemes);
                        break;
                    default:
                        syllable_phonemes = ["hh"].concat(syllable_phonemes);
                        break;
                }
                switch (codaN[coda]) {
                    case ' ':
                        break;
                    case 'ㄴ': case 'ㄵ': case 'ㄶ':
                        syllable_phonemes.push("n");
                        break;
                    case 'ㄹ': case 'ㄼ': case 'ㄽ': case 'ㄾ': case 'ㅀ':
                        syllable_phonemes.push("l");
                        break;
                    case 'ㄻ': case 'ㅁ':
                        syllable_phonemes.push("m");
                        break;
                    case 'ㅇ':
                        syllable_phonemes.push("ng");
                        break;
                    case 'ㄷ': case 'ㅅ': case 'ㅆ': case 'ㅈ': case 'ㅊ': case 'ㅌ': case 'ㅎ':
                        syllable_phonemes.push("d");
                        break;
                    case 'ㄿ': case 'ㅂ': case 'ㅄ': case 'ㅍ':
                        syllable_phonemes.push("b");
                        break;
                    default:
                        syllable_phonemes.push("g");
                        break;
                }
            }
        }
        else {
            return;
        }
        phonemes = phonemes.concat(syllable_phonemes);
    }
    const phonemeStr = phonemes.join(" ").replaceAll(/#/, "").replaceAll(/\$/, "");
    note.setPhonemes(phonemeStr);
    var note_durs = [];
    var note_strs = [];
    for (var i = 0; i < phonemes.length; ++i) {
        switch (phonemes[i][0]) {
            case '#':
                note_durs.push(0.5);
                note_strs.push(1.8);
                break;
            case '$':
                note_durs.push(0.2);
                note_strs.push(1.8);
                break;
            default:
                note_durs.push(1);
                note_strs.push(1);
                break;
        }
    }
    note.setAttributes({
        "dur": note_durs,
        "strength": note_strs
    });
}
