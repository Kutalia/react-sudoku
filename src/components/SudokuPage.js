import { getSquareIndices } from '../utils/common';
import { openModal, editCell } from '../actions/sudoku';

const SudokuSquare = ({ state, dispatch, indices, square }) => {
    const { prefilledCells, failedCells, sudoku } = state;

    const cells = indices.map((index) => {
        const isPrefilled = prefilledCells.indexOf(index) !== -1 ? true : false;
        const isFailed = failedCells.indexOf(index) !== -1 ? true : false;
        const changeHandler = (value, i) => {
            if (value !== '') {
                if (!/^[1-9]$/.test(value)) {
                    return;
                }
            }
            dispatch(editCell(value, i));
        };

        return (
            <div key={index} className={`sudoku-cell sudoku-cell--${index}${isPrefilled ? ' sudoku-cell--prefilled' : ''}${isFailed ? ' sudoku-cell--failed' : ''}`}>
                <input className={`sudoku-cell__input`}
                    readOnly={isPrefilled} value={sudoku[index] || ''} onChange={(e) => changeHandler(e.target.value, index)} />
            </div>
        );
    });
    const cellRows = new Array(3).fill(null);

    return (
        <div className={`sudoku-square sudoku-square--${square}`}>
            {cellRows.map((value, i) => (
                <div className={`sudoku-square__sudoku-cell-row sudoku-cell-row--${i}`} key={i}>
                    {cells.map((cell, j) => (
                        j >= i * 3 && j < (i * 3 + 3) && cell
                    ))}
                </div>
            ))}
        </div>
    );
};

const SudokuGame = ({ state, dispatch }) => {
    const indicesBySquareIndex = (new Array(9)).fill(null).map((value, index) => getSquareIndices(index));
    const sudokuSquares = indicesBySquareIndex.map((indices, square) => (
        <SudokuSquare key={square} state={state} dispatch={dispatch} indices={indices} square={square} />
    ));
    const squareRows = new Array(3).fill(null);

    const submitHandler = () => {
        dispatch(openModal());
    }

    return (
        <div className="sudoku-table">
            <div className="sudoku-page__sudoku-table">
                {squareRows.map((value, i) => (
                    <div className={`sudoku-square-row sudoku-square-row--${i}`} key={i}>
                        {sudokuSquares.map((sudokuSquare, j) => (
                            j >= i * 3 && j < (i * 3 + 3) && sudokuSquare
                        ))}
                    </div>
                ))}
            </div>

            <div className="sudoku-page__submit-btn-wrapper">
                <button className="generate-submit-btn" onClick={submitHandler}>
                    Create New Puzzle
                </button>
            </div>
        </div>
    );
};


const SudokuPage = ({ state, dispatch }) => {
    return (
        <div className={`sudoku-page${state.modal ? ' sudoku-page--blur' : ''}`}>
            <div className="sudoku-page__veneer">
                <div className="sudoku-page__veneer-lanars-logo" />
                <div className="sudoku-page__veneer-text">
                    Sudoku
            </div>
            </div>
            <div className="sudoku-page__sudoku-game-wrapper">
                <SudokuGame state={state} dispatch={dispatch} />
            </div>
        </div>
    );
};

export default SudokuPage;
