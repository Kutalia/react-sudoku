import * as React from "react";
import * as ReactDOM from "react-dom";
import Sudoku from './components/Sudoku';
import './styles/styles.css';

const App: React.FC = () => {
    return (
        <div className="main">
            <Sudoku />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('app'));
