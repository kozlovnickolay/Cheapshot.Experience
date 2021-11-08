import birdies from "../contents/birdies";
import defenders from "../contents/defenders";
import { Difficulty } from "./Difficulty";
import dificulty1 from "./Difficulty1";
import dificulty2 from "./Difficulty2";
import dificulty3 from "./Difficulty3";
import dificulty4 from "./Difficulty4";
import dificulty5 from "./Difficulty5";
import { Monument, Upgrade, Dmg, HpMax, Sno, Giftbox, Zombiebox, Genie, Crystalball, Battery, Birdie, Defender } from "./Monument";
import { MonumentRequest } from "./MonumentRequest";

const req: MonumentRequest = {
    city: "Geelong",
    location: "0,0",
    difficulty: 1,
    name: "geeong mon",
    pic: "🚘"
}

generateMonument(req);

export function generateMonument(request: MonumentRequest) {
    /** Difficulty */
    let d: Difficulty;
    switch (request.difficulty) {
        case 1: {
            d = dificulty1;
            break;
        }
        case 2: {
            d = dificulty2;
            break;
        }
        case 3: {
            d = dificulty3;
            break;
        }
        case 4: {
            d = dificulty4;
            break;
        }
        case 5: {
            d = dificulty5;
            break;
        }
    }
    const monument: Monument = {
        building: {
            hp: d.hp,
            hpph: d.hpph,
            name: request.name,
            pic: request.pic
        },
        location: request.location,
        respawn: d.respawn,
        upgrades: getUpgradesFromDiff(d)
    }

    return monument;
}

function getUpgradesFromDiff(d: Difficulty): Upgrade[] {
    let upgrades: Upgrade[] = [];
    d.upgrades.forEach(u => {
        switch (u.type) {
            case "✴️":
            case "*️⃣":
            case "⚛️": {
                const mod: Dmg = {
                    type: "bypic",
                    pic: u.type,
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "🥋":
            case "⛑": {
                const mod: HpMax = {
                    type: "bypic",
                    pic: u.type,
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "⛄️": {
                const mod: Sno = {
                    type: "sno",
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "🎁": {
                const mod: Giftbox = {
                    type: "giftbox",
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "📦": {
                const mod: Zombiebox = {
                    type: "zombiebox",
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "🧞‍♂️": {
                const mod: Genie = {
                    type: "genie",
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "🔮": {
                const mod: Crystalball = {
                    type: "crystalball",
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "🔋": {
                const mod: Battery = {
                    type: "battery",
                    count: u.count
                }
                upgrades.push(mod);
                break;
            }
            case "🐝": {
                let { name, pic } = getRandomBirdie();
                const bee: Birdie = {
                    type: "birdie",
                    count: u.count,
                    level: 100,
                    name,
                    pic
                }
                upgrades.push(bee);
                break;
            }
        }
    });
    d.defenders.forEach(def => {
        let { name, pic } = getRandomDefender(def.level >= 75 ? "high" : "low");
        const defender: Defender = {
            type: "defender",
            count: def.count,
            level: def.level,
            name,
            pic
        }
        upgrades.push(defender)
    })
    return upgrades;

}
function getRandomBirdie() {
    const random = randomInteger(0, birdies.length - 1);
    return birdies[random];
}

function getRandomDefender(type: "low" | "high") {
    const random = randomInteger(0, defenders[type].length - 1);
    return defenders[type][random];
}

function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
