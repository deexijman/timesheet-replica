/**
 * Function to create a new BAU component.
 * @param {Array} bauRowData - The current array of BAU row data.
 * @param {function} setBauRowData - The state setter function for updating the BAU row data.
 */
function createBauComponent(bauRowData, setBauRowData) {
    var newRow = { id: bauRowData.length + 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    var newBuiData = [...bauRowData];
    newBuiData.push(newRow);
    setBauRowData(newBuiData);
}


/**
 * Function to delete specific BAU component.
 * @param {string} id - id of the specific component
 * @param {Array} bauRowData - The current array of BAU row data. 
 * @param {function} setBauRowData - The state setter function for updating the BAU row data.
 * @param {function} setBauTotalHours - The state setter function for updating the BAU row data.
 */
const deleteBauComponent = (id, bauRowData, setBauRowData, setBauTotalHours) => {

    // Filter out the row with the specified id
    const updatedBauData = bauRowData.filter(row => row.id !== id);
    setBauRowData(updatedBauData);

    // Recalculate total hours
    const updatedTotalHours = updatedBauData.reduce(
        (total, row) => total + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat + row.sun,
        0
    );

    setBauTotalHours(updatedTotalHours);
    
}


export { createBauComponent, deleteBauComponent }