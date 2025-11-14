import React, {useState, useEffect} from 'react';
import PetCard from './PetCard';
import './styles/AdoptionPage.css';

const AdoptionPage = () => {
    const [pets, setPets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPets = async () => {
            const url = 'http://localhost:5000/petsForAdoption';

            const res = await fetch(url, {
                method: 'GET',
                headers: {'content-Type': 'application/json'}
            });

            const data = await res.json();
            if (res.ok) {
                setPets(data);
                setError(null);
            }
            else {
                setError(data.message || 'server error');
                setPets([]);
            }
        }

        fetchPets();
    }, []);

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }
    console.log(pets);

    return (
        <>
        <p className='heading'><i class="fa-solid fa-paw"></i> ADOPT A PET</p>
        <div className='adoption-section'>
            <div className='pet-list'>
                {pets.map((pet, idx) => (
                    <PetCard key={idx} {...pet}/>
                ))}
            </div>
        </div>
        </>
    );
}

export default AdoptionPage;