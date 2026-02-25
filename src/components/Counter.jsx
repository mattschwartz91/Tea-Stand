const Counter = ({ drinks }) => {
    return (
        <div>
            <p
                style={{
                    fontFamily: "'IM Fell English SC', Georgia, serif",
                    color: "#3d1c02",
                    fontSize: "clamp(28px, 5vw, 42px)",
                    lineHeight: 1.1,
                }}
            >
                {drinks.toLocaleString()}
            </p>
            <p
                style={{
                    fontFamily: "'IM Fell English', Georgia, serif",
                    color: "#8b5a3c",
                    fontSize: "14px",
                    fontStyle: "italic",
                    marginTop: "4px",
                }}
            >
                cups of bubble tea sold
            </p>
        </div>
    );
};

export default Counter;
