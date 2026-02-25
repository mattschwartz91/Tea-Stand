import { useState } from "react";

const images = [
    "tile000.png",
    "tile001.png",
    "tile002.png",
    "tile003.png",
    "tile004.png",
    "tile005.png",
    "tile006.png",
    "tile007.png",
    "tile008.png",
    "tile009.png",
    "tile010.png",
    "tile011.png",
    "tile012.png",
    "tile013.png",
    "tile014.png",
    "tile015.png",
    "tile016.png",
    "tile017.png",
    "tile018.png",
    "tile019.png",
];

function randomOddInRange(min, max) {
    // Make sure min is odd
    if (min % 2 === 0) min++;
    // Make sure max is odd
    if (max % 2 === 0) max--;

    // Pick a random odd number between min and max
    const oddCount = Math.floor((max - min) / 2) + 1;
    return min + Math.floor(Math.random() * oddCount) * 2;
}

const ClickMe = ({ addDrinks }) => {
    // props
    const [image, setImage] = useState(() => images[randomOddInRange(1, 19)]);
    const audio = new Audio("./click.mp3");

    // helper function
    const updateDrink = () => {
        const i = images.indexOf(image);
        if (i > 0) {
            const nextImage = i - 1;
            setImage(images[nextImage]);
        } else {
            setImage(images[18]);
        }
    };
    // component
    return (
        <button
            type="button"
            onClick={() => {
                audio.play();
                addDrinks();
                updateDrink();
            }}
            className="shrink active:scale-95 transition-transform duration-100 p-2 m-2"
        >
            <img
                draggable="false"
                className=" p-2 m-2 w-[256px] h-[256px] [image-rendering:pixelated]"
                src={image}
            />
        </button>
    );
};

export default ClickMe;
