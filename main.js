const hardCodedBoard = {
    "width": 9,
    "height": 9,
    "board": "53xx7xxxx6xx195xxxx98xxxx6x8xxx6xxx34xx8x3xx17xxx2xxx6x6xxxx28xxxx419xx5xxxx8xx79",
    "id": "1" 
}

const hardCodedAnswer = {
    "solution": "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
    "id": "1"
}

$(document).ready( function() {
    $(document).on('input', '.sudokuInput', function(e) {
        let inputValue = $(this).val();
        let numericValue = inputValue.replace(/[^1-9]/g, '').slice(0, 1);
        $(this).val(numericValue);
        
        const subtableIndex = $(this).parent().data('subtable');
        const rowIndex = $(this).parent().data('row');
        const collumnIndex = $(this).parent().data('collumn');

        //remove warning styles from table for new validation
        //removeBoardNotations();
        validateInput(subtableIndex, rowIndex, collumnIndex);
    });
});

const removeBoardNotations = () => {
    $(".sudokuBoard *").removeClass("cellWarning");
    $(".sudokuBoard *").removeClass("cellMistake");
    $(".sudokuBoard *").removeClass("cellMissingValue");
}

const displayMessageBox = () => {
    $('#messageBox').show();
    $('.overlay').show();
}

const disableMessageBox = () => {
    $('#messageBox').hide();
    $('.overlay').hide();
    $('#messageBoxContent').empty();
}

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

const boardToIndex = (_subTableIndex, _rowIndex, _cellIndex) => {
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
                if(_subTableIndex ===  subTableIndex && _rowIndex === rowIndex && _cellIndex === cellIndex){
                    return j + i * 9;
                }
                cellIndex++;
            }
            subTableIndex -= 3;
            rowIndex++;
        }
};

const createBoard = () => {
    $(document).ready(function() {
        var table = $('.sudokuBoard');
        
        for (let i = 0;i < 9; i++)
        {
            var subTable = $('<table>');
            $(subTable).attr('id', 'sudokuSubTable');
            for (let j = 0; j < 3; j++)
            {
                var row = $('<tr>');
                for (let k = 0; k < 3; k++)
                {
                    var cell = $('<td>');
                    $(cell).attr('data-subtable', i);
                    $(cell).attr('data-row', j);
                    $(cell).attr('data-collumn', k);

                    row.append(cell);
                }
                subTable.append(row);
            }
            table.append(subTable);
        } 
    });
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

const validateSubtable = (subtableValue) => {
    const subtable = [];
    const mistakes = [];
    const subTableValues = new Set();
    const incorrectValues = new Set();
    
    // parse elements into an array (element, value)
    $(`[data-subtable="${subtableValue}"]`).each(function() {
        subtable.push({element: $(this), value: $(this).find('input').val()});
    });

    // find duplicates and load them into incorrectValues
    for(const element of subtable){
        const value = element.value;
        
        if(value === ''){
            continue;
        }

        if(!subTableValues.has(value)){
            subTableValues.add(value);
        } else {
            incorrectValues.add(value);
        }
    }

    // populate mistakes array with elements with errors
    for(const temp of subtable){
        if(incorrectValues.has(temp.value)){
            mistakes.push(temp.element);
        }
    }

    // create array for all the elements that were in the row
    const onlySubtableElements = subtable.map(subtable => subtable.element);

    return {mistakes: mistakes, subtable: onlySubtableElements};
};

const validateCollumn = (collumnValue, subtableValue) => {
    const collumn = [];
    const mistakes = [];
    const collumnValues = new Set();
    const incorrectValues = new Set();
    let acceptableSubtableValues;

    if([0,1,2].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue, subtableValue+3, subtableValue+6];
    } else if([3,4,5].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue-3, subtableValue, subtableValue+3];
    } else if([6,7,8].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue, subtableValue-3, subtableValue-6];
    }

    
    for (const subtableIndex of acceptableSubtableValues){
        // parse elements into an array (element, value)
        $(`[data-collumn="${collumnValue}"][data-subtable="${subtableIndex}"]`).each(function() {
            collumn.push({element: $(this), value: $(this).find('input').val()});
        });
    }

    // find duplicates and load them into incorrectValues
    for(const element of collumn){
        const value = element.value;
        
        if(value === ''){
            continue;
        }

        if(!collumnValues.has(value)){
            collumnValues.add(value);
        } else {
            
            incorrectValues.add(value);
        }
    }

    // populate mistakes array with elements with errors
    for(const temp of collumn){
        if(incorrectValues.has(temp.value)){
            mistakes.push(temp.element);
        }
    }

    // create array for all the elements that were in the row
    const onlyCollumnElements = collumn.map(collumn => collumn.element);

    return {mistakes: mistakes, collumn: onlyCollumnElements};
};

const validateRow = (rowValue, subtableValue) => {
    const row = [];
    const mistakes = [];
    const rowValues = new Set();
    const incorrectValues = new Set();
    let acceptableSubtableValues;

    if([0,3,6].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue, subtableValue+1, subtableValue+2];
    } else if([1,4,7].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue-1, subtableValue, subtableValue+1];
    } else if([2,5,8].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue-2, subtableValue-1, subtableValue];
    }

    
    for (const subtableIndex of acceptableSubtableValues){
        // parse elements into an array (element, value)
        $(`[data-row="${rowValue}"][data-subtable="${subtableIndex}"]`).each(function() {
            row.push({element: $(this), value: $(this).find('input').val()});
        });
    }

    // find duplicates and load them into incorrectValues
    for(const element of row){
        const value = element.value;
        
        if(value === ''){
            continue;
        }

        if(!rowValues.has(value)){
            rowValues.add(value);
        } else {
            incorrectValues.add(value);
        }
    }

    // populate mistakes array with elements with errors
    for(const temp of row){
        if(incorrectValues.has(temp.value)){
            mistakes.push(temp.element);
        }
    }

    // create array for all the elements that were in the row
    const onlyRowElements = row.map(row => row.element);

    return {mistakes: mistakes, row: onlyRowElements};
};

const applyBulletHole = (element) => {
    const duration = (Math.random()+1) * 2;
    const position = $(element).offset();
    const offsetX = Math.random() * $(element).width() + position.left;
    const offsetY = Math.random() * $(element).height() + position.top;

    let styling = `
        position: absolute;
        left: ${offsetX}px;
        top: ${offsetY}px;
        width: 20px;
        height: 20px;
        animation: fadeOut ${duration}s linear 1;
    `;
    let bulletHole = `<img src = "./bulletImpact.png" style="${styling}" class="bulletHole">`
    let bulletHoleInstance = $(bulletHole).appendTo('body');
    setTimeout(() => {
        $(bulletHoleInstance).remove();
    }, duration * 950);
}

const applyExplosion = (element) => {
    const delay = Math.random() * 500;


    setTimeout(() => {
        const position = $(element).offset();
        const offsetX = (Math.random() - 0.5) * $(element).width()  + position.left;
        const offsetY = (Math.random() - 0.5) * $(element).height() + position.top;

        let styling = `
            position: absolute;
            left: ${offsetX}px;
            top: ${offsetY}px;
            width: 100px;
            height: 100px;
        `;
        let bulletHole = `<img src = "./explosion.gif" style="${styling}">`
        let bulletHoleInstance = $(bulletHole).appendTo('body');
        setTimeout(() => {
            $(bulletHoleInstance).remove();
        }, 350);
    }, delay);
}

var was = false;
const doHelicopterPass = () => {
    
    if(was === true){
        return;
    }
    was = true;
    let styling = `
            position: fixed;
            left: 100%;
            top: 20%;
            animation: helicopterPass 1.5s linear 1;
            height: 60%;
            width: 60%;
        `;

    const helicopter = `<img src="./helicopter.gif" style="${styling}">`;
    const helicopterInstance = $(helicopter).appendTo('body');
    setTimeout(() => {
        helicopterInstance.remove();   
    }, 1500);
}

const validateInput = (subtableIndex, rowIndex, collumnIndex) => {
    let tableIsCorrect = true;

    const rowValidationResult = validateRow(rowIndex, subtableIndex);
    //console.log(rowValidationResult);
    visualiseRowMistake(rowValidationResult.mistakes, rowValidationResult.row);

    const subtableValidationResult = validateSubtable(subtableIndex);
    //console.log(subtableValidationResult);
    visualiseSubtableMistake(subtableValidationResult.mistakes, subtableValidationResult.subtable);

    const collumnValidationResult = validateCollumn(collumnIndex, subtableIndex);
    //console.log(collumnValidationResult);
    visualiseCollumnMistake(collumnValidationResult.mistakes, collumnValidationResult.collumn);

    return tableIsCorrect;
}

const visualiseRowMistake = (mistakes, row) => {
    if(mistakes.length !== 0){
        for(const cell of row){
            $(cell).addClass('rowWarning');
        }
        for (const cell of mistakes){
            $(cell).addClass('rowMistake');
        }
        tableIsCorrect = false;
    } else {
        for (const cell of row){
            $(cell).removeClass('rowWarning');
            $(cell).removeClass('rowMistake');
        }
    }
}

const visualiseCollumnMistake = (mistakes, collumn) => {
    if(mistakes.length !== 0){
        for(const cell of collumn){
            $(cell).addClass('collumnWarning');
        }
        for (const cell of mistakes){
            $(cell).addClass('collumnMistake');
        }
        tableIsCorrect = false;
    } else {
        for (const cell of collumn){
            $(cell).removeClass('collumnWarning');
            $(cell).removeClass('collumnMistake');
        }
    }
}

const visualiseSubtableMistake = (mistakes, subtable) => {
    if(mistakes.length !== 0){
        for(const cell of subtable){
            $(cell).addClass('subtableWarning');
        }
        for (const cell of mistakes){
            $(cell).addClass('subtableMistake');
        }
        tableIsCorrect = false;
    } else {
        for (const cell of subtable){
            $(cell).removeClass('subtableWarning');
            $(cell).removeClass('subtableMistake');
        }
    }
}

const boardCompletionCheck = () => {
    let isComplete = true;
    $(document).ready(function() {
        var board = $('.sudokuBoard');
        board.find('.sudokuInput').each(function() {
            if($(this).val() === ''){
                isComplete = false;
                applyMissingValueStyle($(this));
            }
        });
    });
    return isComplete;
}

const applyMissingValueStyle = (element) => {
    element.addClass('cellMissingValue');
}

const applyMistakeCellStyle = (element, type) => {
    element.addClass('cellMistake');
}

const submitBoard = () => {
    let completedSuccefully = true;

    if(!boardCompletionCheck()){
        completedSuccefully = false;
        displayMessageBox();
        let text = '<p class="simpleText"> You have to fill out all free cells in sudoku';
        
        $('#messageBoxContent').append(text);
    } else if(!validateInput()){
        completedSuccefully = false;
        displayMessageBox();
        let text = '<p class="simpleText"> The board is incorrect';
        
        $('#messageBoxContent').append(text);
    } else if(getCurrentBoardString() !== boardSolution){
        completedSuccefully = false;
        displayMessageBox();
        let text = '<p class="simpleText"> The board looks correct, but it does not match the pre-defined answer';
        
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


const getCurrentBoardString = () => {
    let boardString = '';

    let rowIndex = 0;
    let cellIndex = 0;
    let subTableIndex = 0;

    for (let i = 0; i < 9; i++) {
        if ((rowIndex) % 3 === 0 && rowIndex != 0) {
            rowIndex = 0;
            subTableIndex += 3;
        }

        for (let j = 0; j < 9; j++) {
            if ((cellIndex) % 3 === 0 && cellIndex != 0) {
                cellIndex = 0;
                subTableIndex++;
            }
            inputedValue = $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).find('input').val();
            boardString += inputedValue;
            
            cellIndex++;
        }
        subTableIndex -= 3;
        rowIndex++;
    }

    return boardString;
};


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