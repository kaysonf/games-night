import React from 'react';
import './App.css';
import {WebSocketProvider} from "./WebSocket";
import {Crossword} from "./components/crossword/Crossword";
import {Direction} from "./components/crossword/WordHints";


function App() {
    const test = {
        words: [
            {
                id: 1,
                startCol: 0,
                startRow: 0,
                word: 'chicken',
                direction: Direction.Across,
                found: false
            },
            {
                id: 2,
                startCol: 0,
                startRow: 0,
                word: 'caaa',
                direction: Direction.Down,
                found: false,
            },
            {
                id: 3,
                startCol: 5,
                startRow: 0,
                word: 'england',
                direction: Direction.Down,
                found: false
            }
        ]
    }

    return (
        <WebSocketProvider>
            <div className="App">
                <Crossword words={test.words}/>
            </div>
        </WebSocketProvider>
    );
}

export default App;
