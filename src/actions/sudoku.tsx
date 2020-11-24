import { DifficultyLevels } from '../utils/common';
import { Action } from '../reducers/sudoku';

export const generatePuzzle = (difficulty: DifficultyLevels): Action => ({
    type: 'NEW_GAME',
    difficulty
});

export const editCell = (value: string, index: number): Action => ({
    type: 'EDIT_CELL',
    value,
    index
});

export const openModal = (): Action => ({
    type: 'OPEN_MODAL'
});

export const closeModal = (): Action => ({
    type: 'CLOSE_MODAL'
});
