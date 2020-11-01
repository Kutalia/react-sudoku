import { useState } from 'react';
import { difficultyLevels } from '../utils/common';
import { closeModal, generatePuzzle } from '../actions/sudoku';

const Difficulty = ({ selected, label, setDifficultyIndex }) => {
    return (<div className="choose-difficulty__options__option">
        <div className="choose-difficulty__options__option__bullet">
            <div className="choose-difficulty__options__option__bullet__ripple" onClick={setDifficultyIndex}>
                <div className="choose-difficulty__options__option__bullet__outer-circle">
                    {selected && <div className="choose-difficulty__options__option__bullet__inner-circle" />}
                </div>
            </div>
        </div>
        <span className="choose-difficulty__options__option__label">
            {label}
        </span>
    </div>);
};

const labeledDifficultyLevels = {
    [difficultyLevels.EASY]: 'Easy, 3-5 prefilled numbers',
    [difficultyLevels.MEDIUM]: 'Medium, 3-4 prefilled numbers',
    [difficultyLevels.HARD]: 'Hard, 1-3 prefilled numbers',
};

const SelectDifficulty = ({ dispatch }) => {
    const [difficulty, setDifficulty] = useState(difficultyLevels.MEDIUM);

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleSubmit = () => {
        dispatch(generatePuzzle(difficulty));
    };

    return (
        <div className="choose-difficulty">
            <div className="choose-difficulty__game-title">Sudoku</div>
            <div className="choose-difficulty__body">
                <div className="choose-difficulty__header">
                    <div className="choose-difficulty__header__close-btn" onClick={handleClose} />
                    <p className="choose-difficulty__header__title">Choose Difficulty</p>
                </div>

                <div className="choose-difficulty__options">
                    {Object.values(difficultyLevels).map((difficultyLevel, index) => (
                        <Difficulty difficultyLevel={difficultyLevel} key={index} label={labeledDifficultyLevels[difficultyLevel]}
                            selected={difficultyLevel === difficulty} setDifficultyIndex={() => { setDifficulty(difficultyLevel); }} />
                    ))}
                </div>
                <div className="choose-difficulty__submit-btn-wrapper">
                    <button className="generate-submit-btn" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default SelectDifficulty;
