import React, { useState, useRef, useEffect } from "react";
import ColorThief from 'colorthief';
import './styles/PetCard.css';

const PetCard = ({_id, name, age, contact, image, description}) => {
    const imagePath = `/images/petsForAdoption/${image}.jpg`;
    console.log(imagePath);

    const imgRef = useRef(null);
    const [bgGradient, setBgGradient] = useState("linear-gradient(135deg, #000, #333)");

    useEffect(() => {
        const imgElement = imgRef.current;
        const colorThief = new ColorThief();

        const handleLoad = () => {
            try {
                const palette = colorThief.getPalette(imgElement, 2); // Get top 2 colors
                if (palette && palette.length >= 2) {
                const gradient = `linear-gradient(135deg, rgb(${palette[0].join(",")}), rgb(${palette[1].join(",")}))`;
                setBgGradient(gradient);
                }
            } catch (err) {
                console.error("Color extraction failed:", err);
            }
        };

        if (imgElement && imgElement.complete) {
            handleLoad();
        } else {
            imgElement.addEventListener("load", handleLoad);
        }

        return () => {
            imgElement?.removeEventListener("load", handleLoad);
        };
    }, [imagePath]);

    return (
        <div className="pet-card" style={{ background: bgGradient }}>
            <img ref={imgRef} src={imagePath} alt={name} className="pet-image" crossOrigin="anonymous"/>
            <div className="pet-overlay">
                <div className="pet-info">
                    <p className="pet-name">{name}</p>
                    <p className="pet-age">{age} old</p>
                </div>
                <p className="pet-contact">Contact: {contact?.name} {contact?.phone} {contact?.address}</p>
            </div>
        </div>
    );
};

export default PetCard;