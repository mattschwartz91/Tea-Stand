import { useState, useEffect } from "react";
import ClickMe from "./components/ClickMe";
import Counter from "./components/Counter";
import Boost from "./components/Boost";
import BoostUpgrade from "./components/BoostUpgrade";
const TICKRATE = 1000 / 24;
const audio = new Audio("./click.mp3");
const upgrades = [
    {
        name: "Part Timer",
        cost: 10,
        description:
            "This teen is on the honour roll, and will use this in their common app essay! Hire them!",
        count: 0,
        cps: 1,
    },
    {
        name: "Cashier",
        cost: 25,
        description: "This person is an adult that can work full time!!.",
        count: 0,
        cps: 4,
    },
    {
        name: "Newspaper Ads",
        cost: 100,
        description: "This will definitely drum up some business.",
        count: 0,
        cps: 16,
    },
    {
        name: "Teaman",
        cost: 250,
        description:
            "Their sign-spinning draws all eyes, and inspires thirstiness in consumers.",
        count: 0,
        cps: 48,
    },
    {
        name: "Pay Micro-Influencers",
        cost: 500,
        description:
            "@InAlliesTummie has HUNDREDS in her following, and will surely drive some foot traffic!",
        count: 0,
        cps: 96,
    },
    {
        name: "Radio Ads",
        cost: 2500,
        description:
            "Old people love tea! Some air time will lead to tea time.",
        count: 0,
        cps: 96 * 5,
    },
    {
        name: "Microwave Ads",
        cost: 10000,
        description:
            "They'll regret that smart microwave once they see this ad. But, now they know where to get a real hot cup of tea!",
        count: 0,
        cps: 96 * 5 * 4,
    },
    {
        name: "Testing!",
        cost: 0,
        description: "T ttttttt test",
        count: 0,
        cps: 10000,
    },
];

const boost_upgrades = [
    {
        name: "Redefine 'part-time' hours.",
        cost: 100,
        count: 0,
        description: (count) =>
            `Those part-timers now HAVE to work 29${"." + "9".repeat(count)} hours, they're way more productive!`,
        bip: 1.25,
    },
];

function App() {
    const [drinks, setDrinks] = useState(0);
    const [upgradesList, setUpgradesList] = useState(upgrades);
    const [boostUpList, setBoostUpList] = useState(boost_upgrades);
    const cps = upgradesList.reduce((acc, cv) => acc + cv.cps * cv.count, 0);

    const updateGame = (currentTick) => {
        if (currentTick % 24 === 0) {
            for (let i = 0; i < upgradesList.length; i++) {
                if (upgradesList[i].count > 0) {
                    setDrinks(
                        (prev) =>
                            prev + upgradesList[i].count * upgradesList[i].cps,
                    );
                }
            }
        }
    };

    useEffect(() => {
        let tick = 0;
        const interval = setInterval(() => {
            tick += 1;
            updateGame(tick);
        }, TICKRATE);
        return () => clearInterval(interval);
    }, [upgradesList]);

    const addDrinks = () => setDrinks((prev) => prev + 1);

    const handlePurchase = (upgrade, i) => {
        if (drinks < upgrade.cost) return;
        audio.currentTime = 0;
        audio.play();
        setDrinks((prev) => prev - upgrade.cost);
        setUpgradesList((prev) =>
            prev.map((u, index) =>
                index === i
                    ? {
                          ...u,
                          count: u.count + 1,
                          cost: Math.max(
                              Math.floor(u.cost ** 1.02),
                              u.cost + 1,
                          ),
                      }
                    : u,
            ),
        );
    };

    const handleBoostUpgrade = (bu, i) => {
        // if not affordable, don't purchase
        if (drinks < bu.cost) return;

        // play sound
        audio.currentTime = 0;
        audio.play();

        // update drinks
        setDrinks((prev) => prev - bu.cost);

        // update upgrade, index probably shouldn't handle this lol
        setUpgradesList((prev) =>
            prev.map((u, index) =>
                index === i
                    ? {
                          ...u,
                          cps: u.cps * bu.bip,
                      }
                    : u,
            ),
        );

        // update bu upgrade, index probably shouldn't handle this lol
        console.log("Increasing bu");
        setBoostUpList((prev) =>
            prev.map((bu, index) =>
                index === i
                    ? { ...bu, cost: bu.cost * 2, count: bu.count + 1 }
                    : bu,
            ),
        );
    };

    return (
        <div className="flex flex-col">
            <header className="text-center">
                <p>✦ Est. 2026 ✦</p>
                <h1>The Tea Stand</h1>
            </header>
            <div className="grid grid-cols-2 justify-evenly h-screen">
                <div>
                    <div className="flex flex-col items-center border h-full">
                        <div className="grid grid-cols-2 items-center w-full">
                            <div className="flex flex-col items-center w-full">
                                <div className="flex flex-col items-center w-full">
                                    <p className="text-center">Tea Sold</p>
                                    <Counter drinks={Math.round(drinks)} />
                                    <p>{Math.round(cps, 2)} cups per second</p>
                                </div>

                                <div className="flex flex-col items-center w-full">
                                    <p className="text-center">SERVE A CUP</p>
                                    <ClickMe addDrinks={addDrinks} />
                                    <p className="text-center">
                                        Click to sell a tea
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center w-full">
                                <div className="flex flex-col items-center">
                                    <h2>Staff &amp; Promotions</h2>
                                    <p>
                                        Invest wisely to grow thine
                                        establishment
                                    </p>
                                </div>

                                <div className="flex flex-col items-center w-full">
                                    {upgradesList.map((upgrade, i) => {
                                        return (
                                            <div
                                                key={upgrade.name}
                                                className="flex w-full"
                                            >
                                                <Boost
                                                    upgrade={upgrade}
                                                    drinks={drinks}
                                                    onClick={() =>
                                                        handlePurchase(
                                                            upgrade,
                                                            i,
                                                        )
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center border">
                    <p>Boost Upgrades</p>
                    <p>Make those tea generators more effective</p>
                    {boostUpList.map((bu, i) => {
                        return (
                            <div key={bu.name} className="flex w-full">
                                <BoostUpgrade
                                    bu={bu}
                                    drinks={drinks}
                                    onClick={() => handleBoostUpgrade(bu, i)}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <footer className="w-full text-center mb-2">
                <p>✦ All teas sourced from the Bunny on itch.io ✦</p>
            </footer>
        </div>
    );
}

export default App;
