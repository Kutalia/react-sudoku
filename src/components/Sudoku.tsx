import * as React from "react";
import { useReducer } from 'react';
import { defaultState } from '../utils/common';
import sudokuReducer from '../reducers/sudoku';
import SelectDifficulty from './SelectDifficulty';
import SudokuPage from './SudokuPage';

const Sudoku: React.FC = () => {
    const [state, dispatch] = useReducer(sudokuReducer, defaultState);

    return (
        <>
            { state.modal && <SelectDifficulty dispatch={dispatch} />}
            { state.sudoku.length !== 0 && <SudokuPage state={state} dispatch={dispatch} />}
        </>
    )
};

export default Sudoku;
