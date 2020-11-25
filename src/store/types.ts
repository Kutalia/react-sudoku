import { DifficultyLevels } from '../utils/common';

export const NEW_GAME = 'NEW_GAME';
export const EDIT_CELL = 'EDIT_CELL';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

interface NewGameAction {
    type: typeof NEW_GAME;
    difficulty: DifficultyLevels;
}

interface EditCellAction {
    type: typeof EDIT_CELL;
    value: string;
    index: number;
}

interface OpenModalAction {
    type: typeof OPEN_MODAL;
}

interface CloseModalAction {
    type: typeof CLOSE_MODAL;
}

export type ActionTypes = NewGameAction | EditCellAction | OpenModalAction | CloseModalAction;
