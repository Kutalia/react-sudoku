import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from '../store';
import SelectDifficulty from './SelectDifficulty';
import SudokuPage from './SudokuPage';

const Sudoku: React.FC = () => {
    const modal = useSelector((state: RootState) => state.modal);
    const sudokuLength = useSelector((state: RootState) => state.sudoku.length);

    return (
        <>
            { modal && <SelectDifficulty />}
            { sudokuLength !== 0 && <SudokuPage modal={modal} />}
        </>
    )
};

export default Sudoku;
