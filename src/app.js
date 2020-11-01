import ReactDOM from "react-dom";
import Sudoku from './components/Sudoku';
import './styles/styles.css';

const App = () => {
    return (
        <div className="main">
            <Sudoku />
        </div>
    )
};

ReactDOM.render(<App />, document.getElementById('app'));
