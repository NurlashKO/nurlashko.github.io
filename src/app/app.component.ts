import { Component, ViewChild } from '@angular/core';
import { JWord } from './models/JWord';
import { WordsService } from './services/words.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  words: JWord[] = [];
  data: JSON[];
  currentWord: JWord;
  displayWord: string;
  pattern = /^[a-z]+$/;
  showInfo: boolean = false;

  @ViewChild("hiddenInput") userInput : any;

  constructor(private wordsService: WordsService) {
    wordsService.getWords().then(data => {
      this.data = data
      this.getWords();
    });
  }

  private getWords() {
    for (var i = 0; i < 10; i++) {
      var pos = Math.floor(Math.random()*this.data.length)
      var word = new JWord(this.data[pos]);
      if (this.pattern.test(word.romaji)) {
        this.words.push(word);
      }
    }
    this.nextWord();
  }

  charAdded(value) {
    value = value.toLowerCase().trim();
    if (value == this.currentWord.romaji) {
      this.showInfo = true;
    }
    this.displayWord = this.currentWord.formatForDisplay(value);
  } 

  _keyPress(event: any) {
    let inputChar = String.fromCharCode(event.charCode).toLowerCase();
    
    switch (inputChar.charCodeAt(0)) {
      case 13: {
        this.nextWord();
        if (this.userInput.nativeElement.value != "") {
          this.userInput.nativeElement.value = "";
          this.userInput.nativeElement.update();
        }
        this.showInfo = false;
        break;
      }
      case 32: {
        this.showInfo = true;
        break;
      }
    }

    if (!this.pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
    }
  }

  nextWord() {
    this.currentWord = this.words.pop();
    this.displayWord = this.currentWord.hiragana;
    if (this.words.length < 3)
      this.getWords();
  }

}
