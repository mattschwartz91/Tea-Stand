import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const Description = ({ upgrade, pos }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.style.left = pos.x + 16 + "px";
            ref.current.style.top = pos.y + 12 + "px";
        }
    }, [pos]);

    return createPortal(
        <div
            ref={ref}
            className="pointer-events-none"
            style={{
                position: "fixed",
                zIndex: 9999,
                background: "#fdf6ec",
                border: "2px solid #8b5a3c",
                boxShadow: "3px 3px 0 #8b5a3c",
                padding: "10px 14px",
                maxWidth: "220px",
                fontFamily: "'IM Fell English', Georgia, serif",
            }}
        >
            <p
                style={{
                    color: "#3d1c02",
                    fontSize: "15px",
                    fontStyle: "italic",
                    marginBottom: "6px",
                }}
            >
                {upgrade.description}
            </p>
            <div
                style={{
                    height: "1px",
                    background: "#c9a87c",
                    margin: "6px 0",
                }}
            />
            <p style={{ color: "#7a3b1e", fontSize: "14px" }}>
                ☕ Produces <strong>{upgrade.cps}</strong> cups/sec
            </p>
        </div>,
        document.body,
    );
};

const Boost = ({ upgrade, onClick, drinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const timerRef = useRef(null);
    const canAfford = drinks >= upgrade.cost;

    const handleMouseMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => setIsOpen(true), 600);
    };
    const handleMouseLeave = () => {
        clearTimeout(timerRef.current);
        setIsOpen(false);
    };

    return (
        <div
            className="upgrade-row flex flex-row items-center gap-2 px-4 py-3"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Name + cost */}
            <div className="flex-1 min-w-0">
                <p
                    className="font-bold truncate"
                    style={{
                        fontFamily: "'IM Fell English SC', Georgia, serif",
                        color: "#3d1c02",
                        fontSize: "18px",
                    }}
                >
                    {upgrade.name}
                </p>
                <p
                    style={{
                        color: "#8b5a3c",
                        fontSize: "14px",
                        fontStyle: "italic",
                    }}
                >
                    {upgrade.count > 0
                        ? `${upgrade.count} employed · ${upgrade.count * upgrade.cps} cups/sec`
                        : "None hired"}
                </p>
            </div>

            {/* Cost + buy */}
            <div className="flex flex-col items-end gap-1 shrink-0">
                <p
                    style={{
                        fontFamily: "'IM Fell English SC', serif",
                        color: "#5a2a10",
                        fontSize: "16px",
                    }}
                >
                    £{upgrade.cost}
                </p>
                <button
                    className="buy-btn"
                    onClick={onClick}
                    disabled={!canAfford}
                    style={{ fontSize: "16px", padding: "6px 16px" }}
                >
                    Hire
                </button>
            </div>

            {/* Count badge */}
            {upgrade.count > 0 && (
                <div
                    style={{
                        minWidth: "32px",
                        height: "32px",
                        background: "#7a3b1e",
                        color: "#fdf6ec",
                        fontFamily: "'IM Fell English SC', serif",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #5a2a10",
                    }}
                >
                    {upgrade.count}
                </div>
            )}

            {isOpen && pos.x !== 0 && pos.y !== 0 && (
                <Description upgrade={upgrade} pos={pos} />
            )}
        </div>
    );
};

export default Boost;
