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
    if (min % 2 === 0) min++;
    if (max % 2 === 0) max--;
    const oddCount = Math.floor((max - min) / 2) + 1;
    return min + Math.floor(Math.random() * oddCount) * 2;
}
const audio = new Audio("./click.mp3");

const ClickMe = ({ addDrinks }) => {
    const [image, setImage] = useState(() => images[randomOddInRange(1, 19)]);

    const updateDrink = () => {
        const i = images.indexOf(image);
        if (i > 0) {
            setImage(images[i - 1]);
        } else {
            setImage(images[18]);
        }
    };

    return (
        <button
            className="mx-auto"
            type="button"
            onClick={() => {
                audio.currentTime = 0;
                audio.play();
                addDrinks();
                updateDrink();
            }}
        >
            <img
                draggable="false"
                className="ml-12  p-2 h-64 w-64 [image-rendering:pixelated] active:scale-98"
                src={image}
            />
        </button>
    );
};

export default ClickMe;
