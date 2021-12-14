import { Injectable } from "@angular/core";
import emojis from "./emojis";

@Injectable({
    providedIn: 'root',
})
export class CheapshotFont {

    csemoji(str, size) {
        if (str in emojis) {
            return `cs-emoji cs-emoji-${size} ${emojis[str]}`;
        } else {
            return `cs-emoji cs-emoji-${size} ${emojis['❓']}`;
        }
    }


    getEmojiUrl(emoji) {
        if (emoji in emojis) {
            var element = document.createElement('span');
            element.className = `cs-emoji ${emojis[emoji]}`;
            const style = getComputedStyle(element);
            return style.backgroundImage;
        } else {
            console.error(`Not found pic for ${emoji}!`)
        }
    }

    checkEmoji(str) {
        if (str in emojis)
            return str;
        else {
            console.error(`Not found pic for ${str}!`);
            return '❓';
        }
    }
}
