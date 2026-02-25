import { useState, useEffect } from "react";
import ClickMe from "./components/ClickMe";
import Counter from "./components/Counter";
import Boost from "./components/Boost";
import "./App.css";

const TICKRATE = 1000 / 24;

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
];

function App() {
    const [drinks, setDrinks] = useState(0);
    const [upgradesList, setUpgradesList] = useState(upgrades);
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
        setDrinks((prev) => prev - upgrade.cost);
        setUpgradesList((prev) =>
            prev.map((u, index) =>
                index === i
                    ? {
                          ...u,
                          count: u.count + 1,
                          cost: Math.floor(u.cost ** 1.05),
                      }
                    : u,
            ),
        );
    };

    return (
        <div
            className="min-h-screen"
            style={{
                background: "#f5ece0",
                fontFamily: "'IM Fell English', Georgia, serif",
            }}
        >
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=IM+Fell+English+SC&display=swap');

                .tea-bg {
                    background-color: #f5ece0;
                    background-image:
                        repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 40px,
                            rgba(139,90,60,0.03) 40px,
                            rgba(139,90,60,0.03) 80px
                        );
                }

                .parchment-panel {
                    background: #fdf6ec;
                    border: 2px solid #8b5a3c;
                    box-shadow: inset 0 0 30px rgba(139,90,60,0.08), 3px 3px 0 #8b5a3c;
                }

                .ornate-border {
                    border: 2px solid #8b5a3c;
                    position: relative;
                }
                .ornate-border::before {
                    content: '✦';
                    position: absolute;
                    top: -10px; left: -10px;
                    color: #8b5a3c;
                    background: #fdf6ec;
                    padding: 0 2px;
                    font-size: 14px;
                }
                .ornate-border::after {
                    content: '✦';
                    position: absolute;
                    top: -10px; right: -10px;
                    color: #8b5a3c;
                    background: #fdf6ec;
                    padding: 0 2px;
                    font-size: 14px;
                }

                .shop-title {
                    font-family: 'IM Fell English SC', Georgia, serif;
                    color: #3d1c02;
                    text-shadow: 1px 1px 0 rgba(139,90,60,0.3);
                    letter-spacing: 0.05em;
                }

                .divider {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #8b5a3c;
                    margin: 8px 0;
                }
                .divider::before, .divider::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: #8b5a3c;
                    opacity: 0.5;
                }

                .upgrade-row {
                    border-bottom: 1px dashed #c9a87c;
                    transition: background 0.15s;
                }
                .upgrade-row:hover {
                    background: rgba(139,90,60,0.06);
                }

                .buy-btn {
                    font-family: 'IM Fell English SC', Georgia, serif;
                    background: #7a3b1e;
                    color: #fdf6ec;
                    border: 1px solid #5a2a10;
                    box-shadow: 2px 2px 0 #5a2a10;
                    cursor: pointer;
                    transition: all 0.1s;
                    padding: 6px 16px;
                    font-size: 16px;
                    letter-spacing: 0.05em;
                }
                .buy-btn:hover { background: #9a4b2e; }
                .buy-btn:active { transform: translate(2px, 2px); box-shadow: none; }
                .buy-btn:disabled { background: #b89880; border-color: #a08060; box-shadow: none; cursor: not-allowed; opacity: 0.6; }

                .counter-text {
                    font-family: 'IM Fell English SC', Georgia, serif;
                    color: #3d1c02;
                }

                .scroll-panel::-webkit-scrollbar { width: 8px; }
                .scroll-panel::-webkit-scrollbar-track { background: #e8d5be; }
                .scroll-panel::-webkit-scrollbar-thumb { background: #8b5a3c; border-radius: 0; }

                .stamp {
                    border: 3px double #7a3b1e;
                    color: #7a3b1e;
                    font-family: 'IM Fell English SC', serif;
                    font-size: 11px;
                    letter-spacing: 0.1em;
                    padding: 2px 8px;
                    display: inline-block;
                }
            `}</style>

            {/* Header */}
            <header
                className="text-center py-6 px-4"
                style={{
                    borderBottom: "2px solid #8b5a3c",
                    background: "#fdf6ec",
                }}
            >
                <p
                    className="text-sm tracking-widest mb-1"
                    style={{
                        color: "#8b5a3c",
                        fontFamily: "'IM Fell English SC', serif",
                    }}
                >
                    ✦ Est. 1887 ✦
                </p>
                <h1 className="shop-title text-4xl md:text-6xl mb-1">
                    The Tea Stand
                </h1>
                <p className="text-base italic" style={{ color: "#8b5a3c" }}>
                    "Purveyors of Fine Bubble Teas &amp; Sundry Refreshments"
                </p>
                <div className="divider mt-3">
                    <span style={{ fontSize: "20px" }}>☙</span>
                    <span
                        className="text-sm tracking-widest"
                        style={{
                            color: "#8b5a3c",
                            fontFamily: "'IM Fell English SC', serif",
                        }}
                    >
                        ESTABLISHED IN THE GRAND TRADITION
                    </span>
                    <span style={{ fontSize: "20px" }}>❧</span>
                </div>
            </header>

            {/* Main layout */}
            <div className="flex flex-col md:flex-row max-w-6xl mx-auto">
                {/* Left — clicker */}
                <div className="flex flex-col items-center justify-start p-6 md:w-2/5">
                    <div className="parchment-panel p-6 w-full text-center mb-4">
                        <p
                            className="text-sm tracking-widest mb-3"
                            style={{
                                color: "#8b5a3c",
                                fontFamily: "'IM Fell English SC', serif",
                            }}
                        >
                            TODAY'S SALES LEDGER
                        </p>
                        <Counter drinks={drinks} />
                        <div className="divider">
                            <span>❦</span>
                        </div>
                        <p
                            className="text-base italic"
                            style={{ color: "#6b4226" }}
                        >
                            {cps} cups per second
                        </p>
                    </div>

                    <div className="parchment-panel p-4 w-full text-center">
                        <p
                            className="text-sm tracking-widest mb-2"
                            style={{
                                color: "#8b5a3c",
                                fontFamily: "'IM Fell English SC', serif",
                            }}
                        >
                            SERVE A CUP
                        </p>
                        <ClickMe addDrinks={addDrinks} />
                        <p
                            className="text-sm italic mt-2"
                            style={{ color: "#a07850" }}
                        >
                            Click to sell a bubble tea
                        </p>
                    </div>
                </div>

                {/* Right — upgrades */}
                <div
                    className="flex flex-col md:w-3/5 md:border-l-2"
                    style={{ borderColor: "#8b5a3c" }}
                >
                    <div
                        className="p-4 sticky top-0 z-10"
                        style={{
                            background: "#fdf6ec",
                            borderBottom: "2px solid #8b5a3c",
                        }}
                    >
                        <h2 className="shop-title text-3xl text-center">
                            Staff &amp; Promotions
                        </h2>
                        <p
                            className="text-center text-sm italic mt-1"
                            style={{ color: "#8b5a3c" }}
                        >
                            Invest wisely to grow your establishment
                        </p>
                    </div>

                    <div
                        className="scroll-panel overflow-y-auto"
                        style={{ maxHeight: "calc(100vh - 180px)" }}
                    >
                        {upgradesList.map((upgrade, i) => (
                            <Boost
                                key={upgrade.name}
                                upgrade={upgrade}
                                drinks={drinks}
                                onClick={() => handlePurchase(upgrade, i)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer
                className="text-center py-3 mt-4"
                style={{ borderTop: "1px solid #c9a87c" }}
            >
                <p className="text-sm italic" style={{ color: "#a07850" }}>
                    ✦ All teas sourced from the finest estates ✦
                </p>
            </footer>
        </div>
    );
}

export default App;
