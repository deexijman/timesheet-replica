/**
 * Function to delete specific Sales component.
 * @param {string} id - id of the specific component
 * @param {Array} salesRowData - The current array of Sales row data. 
 * @param {function} setSalesRowData - The state setter function for updating the Sales row data.
 * @param {function} setSalesTotalHours - The state setter function for updating the Sales row data.
 */
const createSalesComponent = (salesRowData, setSalesRowData) => {
    var newRow = { id: salesRowData.length + 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    var newSalesData = [...salesRowData];
    newSalesData.push(newRow);
    setSalesRowData(newSalesData);
};


/**
 * Function to delete specific Sales component.
 * @param {string} id - id of the specific component
 * @param {Array} salesRowData - The current array of Sales row data. 
 * @param {function} setSalesRowData - The state setter function for updating the Sales row data.
 * @param {function} setSalesTotalHours - The state setter function for updating the Sales row data.
 */
const deleteSalesComponent = (id, salesRowData, setSalesRowData, setSalesTotalHours) => {
    // Filter out the row with the specified id
    const updatedSalesData = salesRowData.filter(row => row.id !== id);
    setSalesRowData(updatedSalesData)

    // Recalculate total hours
    const updatedTotalHours = updatedSalesData.reduce(
        (total, row) => total + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat + row.sun,
        0
    );

    setSalesTotalHours(updatedTotalHours);
}


/**
 * Function to delete specific Sales component.
 * @param {event} event - id of the specific component
 * @param {Array} salesRowData - The current array of Sales row data. 
 * @param {function} setSalesRowData - The state setter function for updating the Sales row data.
 * @param {function} setSalesTotalHours - The state setter function for updating the Sales row data.
 */
const salesProjectTypeChange = (event, id, salesRowData, setSalesRowData) =>{
    const { value } = event.target;

    const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, projectType: value, projectName: '', task: '' } : row));
    setSalesRowData(updatedRowData);
}


export { deleteSalesComponent, createSalesComponent, salesProjectTypeChange }