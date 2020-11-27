import React, { useState } from 'react';
import { DifficultyLevels } from '../utils/common';
import { closeModal, generatePuzzle } from '../store/actions';
import { ActionTypes } from '../store/types';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

const Difficulty = ({ selected, label, setDifficulty }: { selected: boolean; label: string, setDifficulty: () => void; }) => {
    return (<div className="choose-difficulty__options__option">
        <div className="choose-difficulty__options__option__bullet">
            <div className="choose-difficulty__options__option__bullet__ripple" onClick={setDifficulty}>
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

const DifficultyLevelsLabels = {
    [DifficultyLevels.EASY]: 'Easy, 3-5 prefilled numbers',
    [DifficultyLevels.MEDIUM]: 'Medium, 3-4 prefilled numbers',
    [DifficultyLevels.HARD]: 'Hard, 1-3 prefilled numbers',
};

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>) =>
    bindActionCreators(
        {
            closeModal,
            generatePuzzle
        },
        dispatch
    );

type Props = ReturnType<typeof mapDispatchToProps>;

const SelectDifficulty = ({ closeModal, generatePuzzle }: Props) => {
    const [difficulty, setDifficulty] = useState(DifficultyLevels.MEDIUM);

    const handleClose = () => {
        closeModal();
    };

    const handleSubmit = () => {
        generatePuzzle(difficulty);
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
                    {Object.values(DifficultyLevelsLabels).map((label, index) => (
                        <Difficulty key={index} label={label}
                            selected={index === difficulty as number} setDifficulty={() => { setDifficulty(index); }} />
                    ))}
                </div>
                <div className="choose-difficulty__submit-btn-wrapper">
                    <button className="generate-submit-btn" onClick={handleSubmit}>Create</button>
                </div>
            </div>
        </div>
    );
};

export default connect(null, mapDispatchToProps)(SelectDifficulty);
