import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Description = ({ upgrade, pos }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            const w = 0;
            ref.current.style.left = pos.x - w - 12 + "px";
            ref.current.style.top = pos.y + 12 + "px";
        }
    }, [pos]); // re-runs every time pos changes

    return createPortal(
        <div
            ref={ref}
            className="fixed z-50 border-2 bg-amber-200 p-1 pointer-events-none text-sm"
        >
            <p>{upgrade.description}</p>
            <p>
                One {upgrade.name} produces {upgrade.cps} dps.
            </p>
        </div>,
        document.body,
    );
};

const Boost = ({ upgrade, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 }); // state not ref so it triggers re-render

    const handleMouseMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const handleMouseEnter = () => setIsOpen(true);
    const handleMouseLeave = () => setIsOpen(false);

    return (
        <div className="flex flex-row *:p-2">
            <button
                className="border-2 hover:bg-purple-200 text-4xl"
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                {upgrade.name}
            </button>
            <p>Cost: {upgrade.cost}</p>
            <p>Count: {upgrade.count}</p>
            <p>Producing: {upgrade.count * upgrade.cps}</p>
            {isOpen && pos.x !== 0 && pos.y !== 0 && (
                <Description upgrade={upgrade} pos={pos} />
            )}
        </div>
    );
};

export default Boost;
