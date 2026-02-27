import { useState, useRef, useEffect } from "react";

const Description = ({ upgrade }) => {
    return (
        <div className="justify-center m-2 p-1 absolute left-full top-0 w-full border bg-amber-100 text-sm text-gray-600 z-50">
            <p>{upgrade.description}</p>
            <p>
                🍵 Produces <strong>{upgrade.cps.toFixed(1)}</strong> cups/sec
            </p>
        </div>
    );
};

const Boost = ({ upgrade, onClick, drinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const canAfford = drinks >= upgrade.cost;

    const handleMouseMove = (e) => {};
    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="gap-2 relative flex m-2 items-center justify-between border p-2 w-full"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex gap-2">
                <p>{upgrade.name}</p>
                <p>
                    {upgrade.count > 0
                        ? `${upgrade.count} · ${(upgrade.count * upgrade.cps).toFixed(1)} cups/sec`
                        : "None"}
                </p>
            </div>

            <div className="flex gap-2 items-center">
                <p className="whitespace-nowrap">
                    🍵{Math.round(upgrade.cost)}
                </p>
                <button
                    className="p-2 border"
                    onClick={onClick}
                    disabled={!canAfford}
                >
                    Hire
                </button>
            </div>

            {isOpen && <Description upgrade={upgrade} />}
        </div>
    );
};

export default Boost;
