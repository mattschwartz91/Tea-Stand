import { useState } from "react";

const Description = ({ bu }) => {
    return (
        <div className="w-full p-2 border bg-amber-100 text-sm text-gray-600">
            <p>{bu.description(bu.count)}</p>
            <p>Increases part-timer productivity by {bu.bip * 100 - 100}%!</p>
        </div>
    );
};

const BoostUpgrade = ({ bu, onClick, drinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const canAfford = drinks >= bu.cost;

    const handleMouseMove = (e) => {};
    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div className="w-full grid grid-cols-2 m-2 gap-2">
            <div
                className="gap-2 flex items-center justify-between border p-2 w-full"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex gap-2 sticky w-full">
                    <p>{bu.name}</p>
                </div>

                <div className="flex gap-2 items-center">
                    <p className="whitespace-nowrap">🍵{bu.cost}</p>
                    <button
                        className="p-2 border"
                        onClick={onClick}
                        disabled={!canAfford}
                    >
                        Hire
                    </button>
                </div>
            </div>
            <div className="w-full">{isOpen && <Description bu={bu} />}</div>
        </div>
    );
};

export default BoostUpgrade;
