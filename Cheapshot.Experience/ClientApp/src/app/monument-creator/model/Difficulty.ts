export interface Difficulty {
    hp: number;
    hpph: number;
    respawn: number;
    defenders: Defender[];
    upgrades: Upgrade[];
}

interface Defender {
    level: 30 | 35 | 40 | 55 | 75 | 100 | 125 | 150 | 175 | 200;
    count: number;
}

interface Upgrade {
    type: "🔋" | "🧞‍♂️" | "⛑" | "✴️" | "🥋" | "⚛️" | "*️⃣" | "🐝" | "🎁" | "📦" | "⛄️" | "🔮";
    count: number;
}