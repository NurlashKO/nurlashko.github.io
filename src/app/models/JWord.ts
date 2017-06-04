export class JWord {
    romaji: string;
    hiragana: string;
    kanji: string;
    english: string;

    constructor(jsonObj: any) {
        if ('hiragana' in jsonObj) {
            this.hiragana = jsonObj['hiragana']
        }
        if ('romaji' in jsonObj) {
            this.romaji = jsonObj['romaji']
        }
        if ('kanji' in jsonObj) {
            this.kanji = jsonObj['kanji']
        }
        if ('english' in jsonObj) {
            this.english = jsonObj['english']
        }
    }
    

    formatForDisplay(value: string) : string {
        value = value.trim();
        console.log(this)
        var res = this.hiragana;
        if (this.romaji == value) {
            return res.fontcolor('Chartreuse');
        }
        if (this.romaji.startsWith(value))
            return res;
        return res.fontcolor("red");
    }
}