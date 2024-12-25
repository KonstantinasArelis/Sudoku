const handleClick = () => {
    validateBoard();
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
})}


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
        console.error('Error:' + error);
    })
}

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
                    $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).text(board[j+ i * 9]);
            } else {
                $(document).ready(function(){
                    var input = $('<input class="sudokuInput" type="numeric" min="1" max="9">');
                    $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).append(input);
                })
            }

            cellIndex++;
        }
        subTableIndex -= 3;
        rowIndex++;
    }
}

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
}

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
    })
}

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
}

const validateSubTable = (subtableValue) => {
    const valuesInSubtable = new Set();

    $(`[data-subtable="${subtableValue}"]`).each(function() {
        const value = $(this).find('input').val();

        if(valuesInSubtable.has(value) === true){
            const incorrectValue = value;
            $(`[data-subtable="${subtableValue}"]`).each(function() {
                if(incorrectValue === $(this).find('input').val()){
                    $(this).find('*').css('background-color', 'rgb(255, 188, 111)');
                } else {
                    $(this).find('*').css('background-color', 'rgb(255, 229, 111)');
                }
            })
            return false;
        } else {
            valuesInSubtable.add(value);
        }
    })
}

const validateRow = (rowValue, subtableValue) => {
    const valuesInRow = new Set();
    let acceptableSubtableValues;

    if([0,3,6].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue, subtableValue+1, subtableValue+2];
    } else if([1,4,7].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue-1, subtableValue, subtableValue+1];
    } else if([2,5,8].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue, subtableValue-1, subtableValue-1];
    }
    
    $(`[data-row="${rowValue}"]`).each(function() {
        if(!(acceptableSubtableValues.includes(Number($(this).attr('data-subtable'))))){
            return;
        }
        const value = $(this).find('input').val();
        if(valuesInRow.has(value) === true){
            const incorrectValue = value;
            $(`[data-row="${rowValue}"]`).each(function() {
                if(acceptableSubtableValues.includes(Number($(this).attr('data-subtable')))){
                    if(incorrectValue === $(this).find('input').val()){
                        $(this).find('*').css('background-color', 'rgb(255, 188, 111)');
                    } else {
                        $(this).find('*').css('background-color', 'rgb(255, 229, 111)');
                    }
                }
            })
            return false;
        } else {
            valuesInRow.add(value);
        }
    })
}

const validateCollumn = (collumnValue, subtableValue) => {
    const valuesInRow = new Set();
    let acceptableSubtableValues;
    console.log("check: " + subtableValue);
    if([0,1,2].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue, subtableValue+3, subtableValue+6];
    } else if([3,4,5].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue-3, subtableValue, subtableValue+3];
    } else if([6,7,8].includes(subtableValue)){
        acceptableSubtableValues = [subtableValue, subtableValue-3, subtableValue-6];
    }

    console.log("testttt " + acceptableSubtableValues);
    $(`[data-collumn="${collumnValue}"]`).each(function() {
        if(!(acceptableSubtableValues.includes(Number($(this).attr('data-subtable'))))){
            return;
        }
        const value = $(this).find('input').val();
        if(valuesInRow.has(value) === true){
            const incorrectValue = value;
            
            $(`[data-collumn="${collumnValue}"]`).each(function() {
                if(acceptableSubtableValues.includes(Number($(this).attr('data-subtable')))){
                    if(incorrectValue === $(this).find('input').val()){
                        $(this).find('*').css('background-color', 'rgb(255, 188, 111)');
                    } else {
                        $(this).find('*').css('background-color', 'rgb(255, 229, 111)');
                    }
                }
            })
            return false;
        } else {
            valuesInRow.add(value);
        }
    })
}

const validateBoard = () => {
    let isValid = true;
    let isComplete = true;
    $(document).ready(function() {
        $('.sudokuBoard table').each(function() {
            $(this).find('tr').each(function() {
                $(this).find('td').each(function() {
                    var subtableValue = $(this).data('subtable'); 
                    var rowValue = $(this).data('row');
                    var collumnValue = $(this).data('collumn');

                    $(this).find('input').each(function() {
                        const answer = boardSolution[boardToIndex(subtableValue, rowValue, collumnValue)];
                        var res = $(this).val();
                        if(res === ''){
                            $(this).parent().css('background-color', 'rgb(255, 186, 186)');
                            $(this).css('background-color', 'rgb(255, 186, 186)');

                            isComplete = false;
                        }

                        if(isComplete === true && res !== answer){
                            isValid = false;
                            
                            validateRow(rowValue, subtableValue);
                            validateCollumn(collumnValue, subtableValue);
                            validateSubTable(subtableValue);
                        }
                    });
                    if (!isValid) return false;
                });
                if (!isValid) return false;
            });
            if (!isValid) return false;
        });
    });

    const boardString = getCurrentBoardString();
    console.log("comparing: " + boardString + " to " + boardSolution);
    if(boardString === boardSolution)
    {
        console.log("correct");
    } else {
        console.log("incorrect");
    }
}

const revealAnswer = () => {

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
            let value = $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).text();
            if (value != '') {
                boardString += value;
            } else {
                inputedValue = $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).find('input').val();
                boardString += inputedValue;
            }

            cellIndex++;
        }
        subTableIndex -= 3;
        rowIndex++;
    }

    console.log("Current Board: " + boardString);
    return boardString;
}


let boardSolution;

createBoard();
fetchBoard()
    .then(board => {
        console.log("Populating board with: " + board);
        populareBoard(board);
    })
    .then(() => {
        fetchCorrectBoard()
        .then(solution => {
            boardSolution = solution;
        })
    })