import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setCharacter } from '/client/store';
import ReturnAndContinue from './QuestionsComponents/ReturnAndContinue'
import CharacterButton from './QuestionsComponents/CharacterButton'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BrushIcon from '@mui/icons-material/Brush';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import ComputerIcon from '@mui/icons-material/Computer';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Character = ({ character, setCharacter }) => {
    const initialCharacter = character;
    const [selectedChar, setSelectedChar] = useState(initialCharacter)
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
    // const icons = [
    //     <FitnessCenterIcon />,
    //     <BrushIcon />,
    //     <AirplanemodeActiveIcon />,
    //     <ComputerIcon />,
    //     <RestaurantIcon />,
    //     <CameraAltIcon />,
    //     <SelfImprovementIcon />,
    //     <ErrorOutlineIcon />,
    // ]
    return (
        <div>
            <h1 className='questionsH1'>What type of character is this person?</h1>
            <div className='character-div'>
                {character.map((char) => {
                  return (
                    <button
                        className= 'character-btn'
                        key={char.id}
                        value={char.name}
                        onClick={() => {
                            setSelectedChar(char.name)
                        }}
                    >{char.name}</button>
                  )
                })}
            </div>
            <ReturnAndContinue
                returnPath={'/questions/person'}
                continuePath={'/questions/category'}
                onContinueClick = {() => setCharacter(selectedChar)}
            />
        </div>
    )
}

const mapState = (state) => {
    return {
        character: state.questions.character
    }
}

const mapDispatch = (dispatch) => {
    return {
        setCharacter: selectedChar => dispatch((setCharacter(selectedChar)))
    }
}

export default connect(mapState, mapDispatch)(Character)