export const applyBulletHole = (element, delay) => {
    setTimeout(() => {
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
        let bulletHole = `<img src = "./images/bulletImpact.png" style="${styling}" class="bulletHole">`
        let bulletHoleInstance = $(bulletHole).appendTo('body');

        setTimeout(() => {
            $(bulletHoleInstance).remove();
        }, duration * 950);
    }, delay)
}

export const applyExplosion = (element, delay) => {
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
        let bulletHole = `<img src = "./images/explosion.gif" style="${styling}">`
        let bulletHoleInstance = $(bulletHole).appendTo('body');
        setTimeout(() => {
            $(bulletHoleInstance).remove();
        }, 350);
    }, delay);
}

export const applySpark = (element, delay) => {
    setTimeout(() => {
        const duration = (Math.random()+1) * 2;
        const position = $(element).offset();
        const offsetX = Math.random() * $(element).width() + position.left;
        const offsetY = Math.random() * $(element).height() + position.top;
        const degreeVariation = Math.random() * 360;
        let styling = `
            position: absolute;
            left: ${offsetX}px;
            top: ${offsetY}px;
            transform: rotate(${degreeVariation}deg);
            width: 80px;
            height: 80px;

        `;
        let spark = `<img src = "./images/spark.gif" style="${styling}" class="spark">`
        let sparkInstance = $(spark).appendTo('body');

        setTimeout(() => {
            $(sparkInstance).remove();
        }, duration * 200);
    }, delay);
}

export const doHelicopterPass = () => {
    const verticalPosition = (Math.random() - 0.5) * 80;
    let styling = `
            position: fixed;
            left: 100%;
            top: ${verticalPosition}%;
            animation: helicopterPass 1.5s linear 1;
            height: 60%;
            width: 60%;
        `;

    const helicopter = `<img src="./images/helicopter.gif" style="${styling}">`;
    const helicopterInstance = $(helicopter).appendTo('body');
    setTimeout(() => {
        helicopterInstance.remove();   
    }, 1500);
}

export const doPlanePass = () => {
    const horizontalPosition = (Math.random()) * 80;
    
    let styling = `
        position: fixed;
        top: 100%;
        right: ${horizontalPosition}%;
        animation: planePass 1.5s linear 1;
    `;

    const plane = `<img src="./images/plane.gif" style="${styling}">`;
    const planeInstance = $(plane).appendTo('body');
    setTimeout(() => {
        planeInstance.remove();
    }, 1500);
}

export const visualiseRow = (mistakes, row) => {
    row.reverse();
    mistakes.reverse();
    if(mistakes.length !== 0){
        doHelicopterPass();

        // delay to make the visuals sequential
        let delay = 0;

        for(const cell of row){
            delay+= 100;
            applyBulletHole(cell, delay);
            applyExplosion(cell, delay);
            $(cell).addClass('rowWarning');
        }
        for (const cell of mistakes){
            $(cell).addClass('rowMistake');
        }
    } else {
        for (const cell of row){
            $(cell).removeClass('rowWarning');
            $(cell).removeClass('rowMistake');
        }
    }
}

export const visualiseCollumn = (mistakes, collumn) => {
    if(mistakes.length !== 0){
        const sequentialCollumn = sortByRowDescending(collumn);
        // delay to make the visuals sequential
        let delay = 0;
        doPlanePass();

        for(const cell of sequentialCollumn){
            
            for(let i=0;i<20;i++){
                applySpark(cell, delay);
                delay+= (Math.random() + 1) * 5;
            }
            
            $(cell).addClass('collumnWarning');
        }
        for (const cell of mistakes){
            $(cell).addClass('collumnMistake');
        }
    } else {
        for (const cell of collumn){
            $(cell).removeClass('collumnWarning');
            $(cell).removeClass('collumnMistake');
        }
    }
}

export const visualiseSubtable = (mistakes, subtable) => {
    if(mistakes.length !== 0){
        for(const cell of subtable){
            $(cell).addClass('subtableWarning');
        }
        for (const cell of mistakes){
            $(cell).addClass('subtableMistake');
        }
    } else {
        for (const cell of subtable){
            $(cell).removeClass('subtableWarning');
            $(cell).removeClass('subtableMistake');
        }
    }
}

export const removeBoardNotations = () => {
    $(".sudokuBoard *").removeClass("cellWarning");
    $(".sudokuBoard *").removeClass("cellMistake");
    $(".sudokuBoard *").removeClass("cellMissingValue");

    $(".sudokuBoard *").removeClass("rowWarning");
    $(".sudokuBoard *").removeClass("subtableWarning");
    $(".sudokuBoard *").removeClass("collumnWarning");

    $(".sudokuBoard *").removeClass("rowMistake");
    $(".sudokuBoard *").removeClass("subtableMistake");
    $(".sudokuBoard *").removeClass("collumnMistake");
}

export const displayMessageBox = () => {
    $('#messageBox').show();
    $('.overlay').show();
}

export const disableMessageBox = () => {
    $('#missingCellsMessageBox').hide();
    $('#incorrectBoardMessageBox').hide();
    $('#correctBoardMessageBox').hide();
    $('#correctAutoFilledBoardMessageBox').hide();
    $('.overlay').hide();
}

function sortByRowDescending(column) {
    const sortedColumn = [];
  
    for (const cell of column) {
      const row = cell.data('row') + cell.data('subtable');
      sortedColumn[row] = cell;
    }
  
    sortedColumn.reverse();
  
    return sortedColumn;
  }
  