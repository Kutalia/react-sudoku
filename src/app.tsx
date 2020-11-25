import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Sudoku from './components/Sudoku';
import './styles/styles.css';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="main">
                <Sudoku />
            </div>
        </Provider>
    )
};

ReactDOM.render(<App />, document.getElementById('app'));
