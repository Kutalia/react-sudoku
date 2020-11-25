import { DifficultyLevels } from '../utils/common';
import { NEW_GAME, EDIT_CELL, OPEN_MODAL, CLOSE_MODAL, ActionTypes } from './types';

export const generatePuzzle = (difficulty: DifficultyLevels): ActionTypes => ({
    type: NEW_GAME,
    difficulty
});

export const editCell = (value: string, index: number): ActionTypes => ({
    type: EDIT_CELL,
    value,
    index
});

export const openModal = (): ActionTypes => ({
    type: OPEN_MODAL
});

export const closeModal = (): ActionTypes => ({
    type: CLOSE_MODAL
});
