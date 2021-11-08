export interface Monument {
    location: string;
    respawn: number;
    building: Building;
    upgrades: Upgrade[];
}

export interface Building {
    hp: number;
    hpph: number;
    pic: string;
    name: string;
}

export interface Upgrade {
    count: number;
}

export interface Giftbox extends Upgrade {
    type: "giftbox";
}

export interface Zombiebox extends Upgrade {
    type: "zombiebox";
}
export interface Genie extends Upgrade {
    type: "genie";
}
export interface Battery extends Upgrade {
    type: "battery";
}
export interface Crystalball extends Upgrade {
    type: "crystalball";
}

export interface Sno extends Upgrade {
    type: "sno" | "snö";
}

export interface Bypic extends Upgrade {
    type: "bypic";
}

export interface Potion extends Bypic {
    pic: "🍏" | "🥝" | "🍐" | "🍈" | "🥑" | "🍋" | "🌽" | "🍌" | "🧀" | "🍞" | "🥕" | "🍊" | "🥓" | "🍤" | "🍗" | "🍖" | "🍕" | "🌭" | "🍔" | "🍟" | "🌮" | "🍣" | "🍰" | "🥚" | "🥒" | "🥛" | "🍧" | "🍦" | "🍪" | "🥃";
}

export interface Inventory extends Bypic {
    pic: "👛" | "👝" | "👜" | "💼";
}

export interface HpRegen extends Bypic {
    pic: "🍼" | "🍶" | "💊";
}

export interface HpMax extends Bypic {
    pic: "🎽" | "👘" | "🥋" | "⛑" | "🛡";
}

export interface Accuracy extends Bypic {
    pic: "⏺" | "☮️" | "☢️" | "✅";
}

export interface Dmg extends Bypic {
    pic: "*️⃣" | "⚛️" | "✴️" | "❇️" | "✳️";
}

export interface Range extends Bypic {
    pic: "▶️" | "⏩" | "♐️" | "📳";
}
export interface MegaPower extends Bypic {
    pic: "🔯" | "✡️" | "🈵" | "☯️" | "🔰";
}

/**
 * Bee
 */
export interface Birdie extends Upgrade {
    type: "birdie";
    name: string;
    level: number;
    pic: string;
}

/**
 * Defender
 */
export interface Defender extends Upgrade {
    type: "defender";
    name: string;
    level: number;
    pic: string;
}

export interface Decoration {
    type: "defender";
    pic: "🔅" | "🔆" | "♠️" | "♣️" | "♥️" | "♦️" | "🗯" | "🃏" | "🎴" | "🀄️" | "☑️" | "❌" | "⭕️" | "📛" | "🚫" | "🔺" | "🔻" | "🔸" | "🔹" | "🔶" | "🔷" | "🔘" | "🏳️‍🌈" | "🏆" | "🏵" | "🎗" | "🐽" | "🌼" | "🌸" | "🌙" | "💫" | "🌱" | "🌿" | "☘️" | "🍀" | "☀️" | "🌤" | "⛅️" | "🌥" | "🌦" | "🌈" | "☁️" | "🌧" | "⛈" | "🌩" | "🌨" | "🍁" | "👐" | "🙌" | "👏" | "🙏" | "🤝" | "👍" | "👎" | "✊" | "🤛" | "🤜" | "🤞" | "✌️" | "🤘" | "👌" | "👈" | "👉" | "👆" | "👇" | "☝️" | "✋" | "🤚" | "🖐" | "🖖" | "👋" | "🤙" | "💪" | "🖕" | "👂" | "👃" | "👅" | "👁" | "👀" | "👄" | "☂️" | "⚓️" | "👒" | "💋";
}

/**
 * Dragon 🐉
 */
export interface Dragon extends Upgrade {
    type: "dragon";
}

export interface Zombie extends Upgrade {
    type: "zombie";
    pic: string;
}

export interface Extinguisher extends Upgrade {
    type: "extinguisher";
}