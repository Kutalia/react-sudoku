import { generateSudoku, defaultState, checkCell } from '../utils/common';
import { NEW_GAME, EDIT_CELL, OPEN_MODAL, CLOSE_MODAL, ActionTypes } from './types';

export default (state = defaultState, action: ActionTypes) => {
    switch (action.type) {
        case NEW_GAME:
            return {
                ...generateSudoku(action.difficulty),
                failedCells: [],
                modal: false
            };
        case EDIT_CELL:
            const { value, index } = action;
            const sudoku = [...state.sudoku];
            const failedCells = [...state.failedCells];
            const { prefilledCells } = state;

            sudoku[index] = value === '' ? null : Number.parseInt(value);

            for (let i = 0; i < sudoku.length; i++) {
                if (prefilledCells.indexOf(i) !== -1) { // avoid checking fixed prefilled cells
                    continue;
                }
                if (checkCell(sudoku[i] || NaN, i, sudoku)) { // NaN as it doesn't equal itself so it doesn't count as repeat
                    if (failedCells.indexOf(i) !== -1) {
                        failedCells.splice(failedCells.indexOf(i), 1);
                    }
                } else {
                    if (failedCells.indexOf(i) === -1) {
                        failedCells.push(i);
                    }
                }
            }

            return {
                ...state,
                sudoku,
                failedCells
            };
        case OPEN_MODAL:
            return {
                ...state,
                modal: true
            };
        case CLOSE_MODAL:
            return {
                ...state,
                modal: false
            }
        default:
            return state;
    }
};
