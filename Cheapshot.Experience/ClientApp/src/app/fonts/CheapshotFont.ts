import { Injectable } from "@angular/core";
import emojis from "./emojis";

@Injectable({
  providedIn: 'root',
})
export class CheapshotFont {

  csemoji(str, size) {
    if (str in emojis) {
      const className = `cs-emoji cs-emoji-${size} ${emojis[str]}`;
      //return "'cs-emoji cs-emoji-" + size + ' ' + this.emojis[str] + "'>" + str + "</span>";
      return className;
    }
    return str;
  }

}
