const handleClick = () => {
    console.log("clicked");
}

const populateBoard = () => {
    const url = "https://6550e0cc7d203ab6626e476a.mockapi.io/api/v1/SudokuBoard/1?fbclid=IwAR0Zs1QuyeuDFGTR5S-EaWCMw7mV3ExT6KTWMUvAF-tnt0xoIQqX6m3f9Ig";
    fetch(url, 
        {
            method: 'GET'
        }
    ).then(response => {
        if(!response.ok) {
            throw new Error("Couldnt fetch the board from url");
        }
        return response.json();
    }).then(data => {
        const board = data.board;

        for (let i = 0;i < 9; i++)
            {
                for (let j = 0; j < 3; j++)
                {
                    for (let k = 0; k < 3; k++)
                    {
                        $(`td[data-subtable="${i}"][data-row="${j}"][data-collumn="${k}"]`).text(board[k + 9*j + i*3]);
                    }
                }
            }

        console.log(data);
    }).catch(error => {
        console.error('Error:' + error);
    })
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

createBoard();
populateBoard();