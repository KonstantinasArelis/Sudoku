export const validateSubtable = (subtableValue) => {
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

export const validateCollumn = (collumnValue, subtableValue) => {
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

export const validateRow = (rowValue, subtableValue) => {
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