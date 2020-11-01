export const generatePuzzle = (difficulty) => ({
    type: 'NEW_GAME',
    difficulty
});

export const editCell = (value, index) => ({
    type: 'EDIT_CELL',
    value,
    index
});

export const openModal = () => ({
    type: 'OPEN_MODAL'
});

export const closeModal = () => ({
    type: 'CLOSE_MODAL'
});
