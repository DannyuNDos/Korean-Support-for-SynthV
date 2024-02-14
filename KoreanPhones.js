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

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function setToKorean(note) {
    var lyrics = note.getLyrics();
    if ("-" == lyrics) {
        note.setPhonemes("");
        return;
    }
    var phonemes = [];
    var leading_glottal = 0;
    if ("'".charCodeAt(0) == lyrics.charCodeAt(0)) {
        phonemes.push("cl");
        leading_glottal = 1;
    }
    for (var i = leading_glottal; i < lyrics.length; ++i) {
        if ("가".charCodeAt(0) <= lyrics.charCodeAt(i) && lyrics.charCodeAt(i) <= "힣".charCodeAt(0)) {
            var syllable_phonemes = [];
            const onsetN = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".length;
            const vowelN = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".length;
            const codaN = " ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ".length;
            const syllable_index = lyrics.charCodeAt(i) - "가".charCodeAt(0);
            const coda = syllable_index % codaN;
            const vowel = (syllable_index - coda) / codaN % vowelN;
            const onset = ((syllable_index - coda) / codaN - vowel) / vowelN % onsetN;
            switch (vowel) {
                case 0:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["a"];
                    break;
                case 1:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["e"];
                    break;
                case 2:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["j", "a"] : ["#j", "a"];
                    break;
                case 3:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["j", "e"] : ["#j", "e"];
                    break;
                case 4:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["7"];
                    break;
                case 5:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["e"];
                    break;
                case 6:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["j", "7"] : ["#j", "7"];
                    break;
                case 7:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["j", "e"] : ["#j", "e"];
                    break;
                case 8:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["o"];
                    break;
                case 9:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["w", "a"] : ["#w", "a"];
                    break;
                case 10:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["w", "e"] : ["#w", "e"];
                    break;
                case 11:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["w", "e"] : ["#w", "e"];
                    break;
                case 12:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["j", "o"] : ["#j", "o"];
                    break;
                case 13:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["u"];
                    break;
                case 14:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["w", "7"] :["#w", "7"];
                    break;
                case 15:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["w", "e"] : ["#w", "e"];
                    break;
                case 16:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["y", ":\\i"];
                    break;
                case 17:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = 11 == onset ? ["j", "u"] : ["#j", "u"];
                    break;
                case 18:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["i\\"];
                    break;
                case 19:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["i\\", ":\\i"];
                    break;
                default:
                    note.setLanguageOverride("mandarin");
                    syllable_phonemes = ["i"];
                    break;
            }
            if ("mandarin" == note.getLanguageOverride()) {
                switch (onset) {
                    case 0:
                        syllable_phonemes = ["k"].concat(syllable_phonemes);
                        break;
                    case 1:
                        syllable_phonemes = ["cl", "#k"].concat(syllable_phonemes);
                        break;
                    case 2:
                        syllable_phonemes = ["#n"].concat(syllable_phonemes);
                        break;
                    case 3:
                        syllable_phonemes = ["t"].concat(syllable_phonemes);
                        break;
                    case 4:
                        syllable_phonemes = ["cl", "#t"].concat(syllable_phonemes);
                        break;
                    case 5:
                        syllable_phonemes = ["#l"].concat(syllable_phonemes);
                        break;
                    case 6:
                        syllable_phonemes = ["#m"].concat(syllable_phonemes);
                        break;
                    case 7:
                        syllable_phonemes = ["p"].concat(syllable_phonemes);
                        break;
                    case 8:
                        syllable_phonemes = ["cl", "#p"].concat(syllable_phonemes);
                        break;
                    case 9:
                        if (syllable_phonemes[0] == "j") {
                            syllable_phonemes = ["$s\\"].concat(syllable_phonemes.slice(1));
                        }
                        else if (["i", "y"].indexOf(syllable_phonemes[0]) >= 0) {
                            syllable_phonemes = ["$s\\"].concat(syllable_phonemes);
                        }
                        else {
                            syllable_phonemes = ["$s"].concat(syllable_phonemes);
                        }
                        break;
                    case 10:
                        if (syllable_phonemes[0] == "j") {
                            syllable_phonemes = ["%s\\"].concat(syllable_phonemes.slice(1));
                        }
                        else if (["i", "y"].indexOf(syllable_phonemes[0]) >= 0) {
                            syllable_phonemes = ["%s\\"].concat(syllable_phonemes);
                        }
                        else {
                            syllable_phonemes = ["%s"].concat(syllable_phonemes);
                        }
                        break;
                    case 11:
                        break;
                    case 12:
                        if (syllable_phonemes[0] == "j") {
                            syllable_phonemes = ["ts\\"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["ts\\"].concat(syllable_phonemes);
                        }
                        break;
                    case 13:
                        if (syllable_phonemes[0] == "j") {
                            syllable_phonemes = ["cl", "#ts\\"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["cl", "#ts\\"].concat(syllable_phonemes);
                        }
                        break;
                    case 14:
                        if (syllable_phonemes[0] == "j") {
                            syllable_phonemes = ["ts\\h"].concat(syllable_phonemes.slice(1));
                        }
                        else {
                            syllable_phonemes = ["ts\\h"].concat(syllable_phonemes);
                        }
                        break;
                    case 15:
                        syllable_phonemes = ["kh"].concat(syllable_phonemes);
                        break;
                    case 16:
                        syllable_phonemes = ["th"].concat(syllable_phonemes);
                        break;
                    case 17:
                        syllable_phonemes = ["ph"].concat(syllable_phonemes);
                        break;
                    default:
                        syllable_phonemes = ["x"].concat(syllable_phonemes);
                        break;
                }
                switch (coda) {
                    case 0:
                        break;
                    case 4: case 5: case 6:
                        syllable_phonemes.push(":n");
                        break;
                    case 8: case 11: case 12: case 13: case 14:
                        syllable_phonemes.push("l");
                        break;
                    case 10: case 16:
                        syllable_phonemes.push("m");
                        break;
                    case 21:
                        syllable_phonemes.push("N");
                        break;
                    default:
                        syllable_phonemes.push("cl");
                        break;
                }
            }
        }
        phonemes = phonemes.concat(syllable_phonemes);
    }
    note.setPhonemes(phonemes.join(" ").replaceAll(/#/, "").replaceAll(/\$/, "").replaceAll(/%/, ""));
    var note_durs = [];
    var note_strs = [];
    for (var i = 0; i < phonemes.length; ++i) {
        switch (phonemes[i][0]) {
            case '#':
                note_durs.push(0.5);
                note_strs.push(1);
                break;
            case '$':
                note_durs.push(0.5);
                note_strs.push(1.8);
                break;
            case '%':
                note_durs.push(1.8);
                note_strs.push(0.2);
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