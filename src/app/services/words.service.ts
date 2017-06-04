import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class WordsService {

    private translateURL = 
        "https://glosbe.com/gapi/translate?from=ja&dest=eng&format=json&phrase=";
    private sentenceExampleURL = 
        "https://glosbe.com/gapi/tm?from=ja&dest=eng&format=json&phrase=";
    
    constructor(private http: Http) {}

    getWords(): Promise<JSON[]> {
        return new Promise(resolve => {
            this.http.get('assets/JLPT5.json').subscribe(data => {
                resolve(data.json());
            })
        })
    }

    getWordTranslation(word: string): Promise<string[]> {
        return new Promise(resolve => {
            this.http.get(this.translateURL+word).subscribe(data => {
                var result = [];
                data = data.json()["tuc"].slice(0, 3).forEach(val => {
                    result.push((val["phrase"]||val["meanings"][0])["text"]);
                });
                resolve(result);
            })
        })
    }
    
    getSentancesWithWord(word: string): Promise<string[]> {
        return new Promise(resolve => {
            this.http.get(this.sentenceExampleURL+word).subscribe(data => {
                var result = [];
                data.json()["examples"].slice(0, 3).forEach(val => {
                    result.push({"ja": val["first"], "en": val["second"]})    
                })
                resolve(result);
            })
        })
    }

}