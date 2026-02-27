const Counter = ({ drinks }) => {
    return (
        <div className="text-center border m-2 p-4 ">
            <p className="text-6xl">{drinks.toLocaleString()}</p>
            <p className="text-3xl">🍵 sold</p>
        </div>
    );
};

export default Counter;
