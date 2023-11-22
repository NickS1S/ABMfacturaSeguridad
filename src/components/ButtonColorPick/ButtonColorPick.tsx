import { useState } from "react";
import Button from "react-bootstrap/Button";
import ModalColorPick from "../ModalColorPick/ModalColorPick";

const ButtonColorPick = () => {

    const [buttonColor, setButtonColor] = useState("#3d7c40");


    const [showModal, setShowModal] = useState(false);


    const handleColorChange = (color: string) => {
        setButtonColor(color);
    };


    const handleShowModal = () => {
        setShowModal(true);
    }

    return (
        <div className="m-3">
            <h2>Ejemplo 3</h2>

            {/* Componente Padre */}
            <Button variant="primary" style={{ backgroundColor: buttonColor }} onClick={handleShowModal} >
                Cambiar Color
            </Button>

            {/* Componente Hijo */}
            {showModal && <ModalColorPick
                show={showModal}
                onHide={() => setShowModal(false)}
                handleColorChange={handleColorChange}
            />}
        </div>
    );
};

export default ButtonColorPick;
