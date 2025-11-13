import { useState } from "react";

const IMAGE = "./tea.jpg";
const ClickMe = ({ addDrinks }) => {
    // props
    const images = ["tea1.jpg", "tea2.jpg", "tea3.jpg", "tea4.jpg", "tea5.jpg"];
    const [image, setImage] = useState(images[0]);

    // helper function
    const updateDrink = () => {
        // get current index
        let i = images.find((im) => im === image);
        console.log(i);
    };
    // component
    return (
        <button
            onClick={() => {
                addDrinks();
                updateDrink();
            }}
            className="shrink active:scale-95 transition-transform duration-100"
        >
            <img draggable="false" className="h-[800px]" src={image} />
        </button>
    );
};

export default ClickMe;
