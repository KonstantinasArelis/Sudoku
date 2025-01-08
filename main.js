import {visualiseRow, visualiseCollumn, visualiseSubtable,
        removeBoardNotations, displayMessageBox, disableMessageBox,} from './visualization.js';

import {validateSubtable, validateCollumn, validateRow} from './validation.js';

import {hardCodedBoard, hardCodedAnswer, getCurrentBoardString, boardToIndex, createBoard} from './utlity.js';

$(document).ready( function() {
    $(document).on('input', '.sudokuInput', function(e) {
        let inputValue = $(this).val();
        let numericValue = inputValue.replace(/[^1-9]/g, '').slice(0, 1);
        $(this).val(numericValue);
        
        const subtableIndex = $(this).parent().data('subtable');
        const rowIndex = $(this).parent().data('row');
        const collumnIndex = $(this).parent().data('collumn');

        handleInput(subtableIndex, rowIndex, collumnIndex);
    });

    $(document).on('click', '.submitButton', function(e) {
        submitBoard();
    })
});



const fetchCorrectBoard = () => {
    //const url = "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuSolutions/1?fbclid=IwAR1uZmkq26ItDU29_qR9VRA87BMH0vMyFLo5NdDOb-2EsGP8dH8aXC997Mw";
    const url =  "http://localhost:3000/sudokuSolution";
    return fetch(url, 
        {
            method: 'GET'
        }
    ).then(response => {
        if(!response.ok) {
            throw new Error("Couldnt fetch the board from url");
        }
        return response.json();
    }).then(data => {
        const board = data.solution;
        return board;
    }).catch(error => {
        return hardCodedAnswer.solution;
    })
};


const fetchBoard = () => {
    //const url = "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuBoard/1?fbclid=IwAR0Zs1QuyeuDFGTR5S-EaWCMw7mV3ExT6KTWMUvAF-tnt0xoIQqX6m3f9Ig";
    const url =  "http://localhost:3000/sudokuTask";
    return fetch(url, 
        {
            method: 'GET'
        }
    ).then(response => {
        if(!response.ok) {
            throw new Error("Couldnt fetch the board from url");
        }
        return response.json();
    }).then(data => {
        return data.board;
    }).catch(error => {
        $('.warningContainer').show();
        $('.warningBox').text("API not active, using pre-defined sudoku board");
        return hardCodedBoard.board;
    })
};

const populareBoard = (board) => {
    let rowIndex = 0;
    let cellIndex = 0;
    let subTableIndex = 0;

    for (let i = 0;i < 9; i++)
    {
        if ((rowIndex) % 3 === 0 && rowIndex!=0)
        {
            rowIndex = 0;
            subTableIndex += 3;
        }

        for (let j = 0;j < 9; j++)
        {
            if ((cellIndex) % 3 === 0  && cellIndex!=0)
            {
                cellIndex = 0;
                subTableIndex++;
            }
            if(board[j+ i * 9] != 'x')
            {
                var input = $(`<input class="sudokuInput" type="numeric" min="1" max="9" value=${board[j+ i * 9]} disabled>`);
                $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).append(input);
            } else {
                $(document).ready(function(){
                    var input = $(`<input class="sudokuInput" type="numeric" min="1" max="9" value="">`);
                    $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).append(input);
                });
            }

            cellIndex++;
        }
        subTableIndex -= 3;
        rowIndex++;
    }
};

const fillBoard = () => {
    let rowIndex = 0;
    let cellIndex = 0;
    let subTableIndex = 0;

    for (let i = 0;i < 9; i++)
    {
        if ((rowIndex) % 3 === 0 && rowIndex!=0)
        {
            rowIndex = 0;
            subTableIndex += 3;
        }

        for (let j = 0;j < 9; j++)
        {
            if ((cellIndex) % 3 === 0  && cellIndex!=0)
            {
                cellIndex = 0;
                subTableIndex++;
            }
                $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).html('<input class="sudokuInput" type="numeric" min="1" max="9" value="' + boardSolution[j+ i * 9] + '">');
            cellIndex++;
        }
        subTableIndex -= 3;
        rowIndex++;
    }
};

const handleInput = (subtableIndex, rowIndex, collumnIndex) => {
    const rowValidationResult = validateRow(rowIndex, subtableIndex);
    //console.log(rowValidationResult);
    visualiseRow(rowValidationResult.mistakes, rowValidationResult.row);

    const subtableValidationResult = validateSubtable(subtableIndex);
    //console.log(subtableValidationResult);
    visualiseSubtable(subtableValidationResult.mistakes, subtableValidationResult.subtable);

    const collumnValidationResult = validateCollumn(collumnIndex, subtableIndex);
    //console.log(collumnValidationResult);
    visualiseCollumn(collumnValidationResult.mistakes, collumnValidationResult.collumn);

    $('td').removeClass('cellMissingValue');

    if(rowValidationResult.mistakes.length === 0 && subtableValidationResult.mistakes.length === 0  && collumnValidationResult.mistakes.length === 0 ){
        return true;
    } else {
        return false;
    }
}

const boardCompletionCheck = () => {
    let isComplete = true;
    $(document).ready(function() {
        var board = $('.sudokuBoard');
        board.find('.sudokuInput').each(function() {
            if($(this).val() === ''){
                isComplete = false;
                $(this).parent().addClass('cellMissingValue');
            }
        });
    });
    return isComplete;
}

const submitBoard = () => {
    let completedSuccefully = true;

    if(!boardCompletionCheck()){
        completedSuccefully = false;
        displayMessageBox();
        let text = '<p class="simpleText"> You have to fill out all free cells in sudoku';
        
        $('#messageBoxContent').append(text);
    } else if(getCurrentBoardString() !== boardSolution){
        completedSuccefully = false;
        displayMessageBox();
        let text = '<p class="simpleText"> The board is incorrect';
        
        $('#messageBoxContent').append(text);
    }
    if(completedSuccefully === false){
        let oKbutton = '<button onClick="disableMessageBox()" class="simpleButton simpleText"> Ok';
        $('#messageBoxContent').append(oKbutton);
        let restartButton = '<button onClick="disableMessageBox(); restartSudoku()" class="simpleButton simpleText"> Restart';
        $('#messageBoxContent').append(restartButton);
        let revealAnswerButton = '<button onClick="disableMessageBox(); revealAnswer()" class="simpleButton simpleText"> Show Answer';
        $('#messageBoxContent').append(revealAnswerButton);
        displayMessageBox();
    } else {
        if(boardWasFilled === false){
            let text = '<p class="simpleText"> You won! Good job!';
        $('#messageBoxContent').append(text);
        } else {
            let text = '<p class="simpleText"> You auto-filled the board, better luck next time!';
        $('#messageBoxContent').append(text);
        }
        let restartButton = '<button onClick="disableMessageBox(); restartSudoku()" class="simpleButton simpleText"> Restart';
        $('#messageBoxContent').append(restartButton);
        displayMessageBox();
    }
}

const restartSudoku = () => {
    // delete everything inside each of the cells
    $("[data-subtable]").empty();
    // re-populate the board
    populareBoard(defaultBoard);
    boardWasFilled = false;
    removeBoardNotations();
}

const revealAnswer = () => {
    removeBoardNotations();
    fillBoard();
    boardWasFilled = true;
}

let boardSolution;
let defaultBoard;
let boardWasFilled = false;

createBoard();
fetchBoard()
    .then(board => {
        defaultBoard = board;
        populareBoard(board);
    })
    .then(() => {
        fetchCorrectBoard()
        .then(solution => {
            boardSolution = solution;
        })
    })

    // json-server --watch db.json