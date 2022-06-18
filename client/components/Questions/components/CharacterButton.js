import React from 'react';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BrushIcon from '@mui/icons-material/Brush';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ComputerIcon from '@mui/icons-material/Computer';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const CharacterButton = () => {
    const icons = [
        {id: 1, name: 'fitness', icon: <FitnessCenterIcon />},
        {id: 2, name: 'artist', icon: <BrushIcon /> },
        {id: 2, name: 'traveler', icon: <AirplanemodeActiveIcon />},
        {id: 2, name: 'techie', icon: <ComputerIcon />},
        {id: 2, name: 'foodie', icon: <RestaurantIcon />},
        {id: 2, name: 'influencer', icon: <CameraAltIcon />},
        {id: 2, name: 'spiritualist', icon: <SelfImprovementIcon />},
        {id: 2, name: 'none', icon: <ErrorOutlineIcon />},
    ]
    return (
        <div>
            {icons.map(icon => (
                <div key={icon.id}>
                   hi
                </div>
            ))}
        </div>
    )
}

export default CharacterButton;