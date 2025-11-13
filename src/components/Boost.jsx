import { useState, useRef } from "react";
import { createPortal } from "react-dom";
const Description = ({ upgrade, posRef }) => {
    return createPortal(
        <div className="absolute z-10 border-2 bg-amber-200 flex" ref={posRef}>
            <p>{upgrade.description}</p>
            <p>
                &nbsp;One {upgrade.name} produces {upgrade.cps} dps.
            </p>
        </div>,
        document.body
    );
};

const Boost = ({ upgrade, onClick }) => {
    // props and hooks
    const [renderDescription, setRenderDescription] = useState(false);
    const posRef = useRef(null);

    // handle mouse movement with a ref
    const handleMouseMove = (e) => {
        if (posRef.current) {
            posRef.current.style.left = e.clientX + 12 + "px";
            posRef.current.style.top = e.clientY + 12 + "px";
            console.log(`x: ${e.clientX} y: ${e.clientY}`);
        }
    };

    // component
    return (
        <div className="flex flex-row *:p-2">
            <button
                className={`border-2 hover:bg-purple-200 text-4xl`}
                onClick={onClick}
                onMouseEnter={() => setRenderDescription(true)}
                onMouseLeave={() =>
                    setTimeout(() => setRenderDescription(false), 10)
                }
                onMouseMove={handleMouseMove}
            >
                {upgrade.name}
            </button>
            <p>Cost: {upgrade.cost}</p>
            <p>Count: {upgrade.count}</p>
            <p>Producing: {upgrade.count * upgrade.cps}</p>
            {renderDescription && (
                <Description upgrade={upgrade} posRef={posRef} />
            )}
        </div>
    );
};
export default Boost;
