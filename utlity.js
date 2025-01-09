export const hardCodedBoard = {
    "width": 9,
    "height": 9,
    "board": "53xx7xxxx6xx195xxxx98xxxx6x8xxx6xxx34xx8x3xx17xxx2xxx6x6xxxx28xxxx419xx5xxxx8xx79",
    "id": "1" 
}

export const hardCodedAnswer = {
    "solution": "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
    "id": "1"
}

export const getCurrentBoardString = () => {
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
            const inputedValue = $(`td[data-subtable="${subTableIndex}"][data-row="${rowIndex}"][data-collumn="${cellIndex}"]`).find('input').val();
            boardString += inputedValue;
            
            cellIndex++;
        }
        subTableIndex -= 3;
        rowIndex++;
    }

    return boardString;
};

export const boardToIndex = (_subTableIndex, _rowIndex, _cellIndex) => {
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

export const createBoard = () => {
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