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
        let bulletHole = `<img src = "./bulletImpact.png" style="${styling}" class="bulletHole">`
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
        let bulletHole = `<img src = "./explosion.gif" style="${styling}">`
        let bulletHoleInstance = $(bulletHole).appendTo('body');
        setTimeout(() => {
            $(bulletHoleInstance).remove();
        }, 350);
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

    const helicopter = `<img src="./helicopter.gif" style="${styling}">`;
    const helicopterInstance = $(helicopter).appendTo('body');
    setTimeout(() => {
        helicopterInstance.remove();   
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
        for(const cell of collumn){
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
}

export const displayMessageBox = () => {
    $('#messageBox').show();
    $('.overlay').show();
}

export const disableMessageBox = () => {
    $('#messageBox').hide();
    $('.overlay').hide();
    $('#messageBoxContent').empty();
}

window.applyBulletHole = applyBulletHole;
window.applyExplosion = applyExplosion;

window.doHelicopterPass = doHelicopterPass;

window.visualiseRow = visualiseRow;

window.visualiseCollumn = visualiseCollumn;

window.visualiseSubtable = visualiseSubtable;

window.removeBoardNotations = removeBoardNotations;

window.displayMessageBox = displayMessageBox;

window.disableMessageBox = disableMessageBox;
