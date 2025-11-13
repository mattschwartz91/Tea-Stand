import { useState, useRef } from "react";

const Description = ({ upgrade, posRef }) => {
    return (
        <div className="absolute z-10 border-2 bg-amber-200 flex" ref={posRef}>
            <p>{upgrade.description}</p>
            <p>
                One {upgrade.name} produces {upgrade.cps} dps.
            </p>
        </div>
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
        }
    };

    // component
    return (
        <div className="flex flex-row [&>*]:p-2">
            <button
                className={`border-2 hover:bg-purple-200 text-4xl`}
                onClick={onClick}
                onMouseEnter={() => setRenderDescription(true)}
                onMouseLeave={() => setRenderDescription(false)}
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
