import { useState, useEffect, useRef } from "react";
import ClickMe from "./components/ClickMe";
import Counter from "./components/Counter";
import Boost from "./components/Boost";
import "./App.css";
import { playSound } from "react-sounds";

const TICKRATE = 1000 / 24;
const CLICK = "./click.mp3";
function App() {
    // hooks and props
    const [drinks, setDrinks] = useState(0);
    const [tick, setTick] = useState(0);
    const upgrades = [
        {
            name: "Part Timer",
            cost: 10,
            description:
                "This teen is on the honor roll, and will use this in their common app essay! Hire them! ",
            count: 0,
            cps: 1,
            onClick: (upgrade) => handlePurchase(upgrade),
        },
        {
            name: "Cashier",
            cost: 25,
            description: "This person is an adult that can work full time!!. ",
            count: 0,
            cps: 4,
            onClick: (upgrade) => handlePurchase(upgrade),
        },
        {
            name: "Newspaper Ads",
            cost: 100,
            description: "This will definitely drum up some business. ",
            count: 0,
            cps: 16,
            onClick: (upgrade) => handlePurchase(upgrade),
        },
        {
            name: "Teaman",
            cost: 250,
            description:
                "There sign-spinning draws all eyes, and inspires thirstiness in consumers. ",
            count: 0,
            cps: 48,
            onClick: (upgrade) => handlePurchase(upgrade),
        },
    ];
    const [upgradesList, setUpgradesList] = useState(upgrades);
    const cps = upgradesList.reduce((acc, cv) => acc + cv.cps * cv.count, 0);

    // game loop
    const updateGame = (currentTick) => {
        if (currentTick % 24 === 0) {
            // boost count
            for (let i = 0; i < upgradesList.length; i++) {
                // check count
                if (upgradesList[i].count > 0) {
                    // update drinks properly
                    setDrinks(
                        (prev) =>
                            prev + upgradesList[i].count * upgradesList[i].cps
                    );
                }
            }
        }
    };

    useEffect(() => {
        // --- Create a game tick loop ---
        const interval = setInterval(() => {
            setTick((prevTick) => {
                const newTick = prevTick + 1;
                updateGame(newTick);
                return newTick;
            }); // Update tick count
        }, TICKRATE); // 60 ticks per second

        // --- Cleanup when component unmounts ---
        return () => clearInterval(interval);
    }, [drinks]);

    // functions
    const addDrinks = () => {
        console.log("Drink Sold!");
        playSound(CLICK, { volume: 0.5, rate: 1.0, loop: false });
        setDrinks((prev) => {
            return prev + 1;
        });
    };

    const handlePurchase = (upgrade, i, drinks) => {
        // check to see if purchasable
        if (drinks < upgrade.cost) {
            console.log(`cannot purchase ${upgrade.name}`);
        } else {
            console.log(`purchasing`);
            // update drinks
            setDrinks((prev) => prev - upgrade.cost);
            // update list
            setUpgradesList((prev) => {
                console.log("Changing list");
                return prev.map((u, index) =>
                    index === i
                        ? {
                              ...u,
                              count: u.count + 1,
                              cost: Math.floor(u.cost ** 1.05),
                          }
                        : u
                );
            });
        }
    };

    // components
    return (
        <div className="flex flex-row">
            <div className="flex flex-col justify-center items-center">
                <Counter drinks={drinks} />
                <ClickMe addDrinks={addDrinks} />
                <p className="font-bold text-2xl">Sales per Second: {cps}</p>
            </div>
            <div className="flex flex-col items-left [&>*]:p-2">
                {upgradesList.map((upgrade, i) => (
                    <Boost
                        key={upgrade.name}
                        upgrade={upgrade}
                        onClick={() =>
                            handlePurchase(upgrade, i, drinks, upgrade.count)
                        }
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
