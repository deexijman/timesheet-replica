import { useEffect, useState } from 'react';
import {
    Typography,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Button,
    Select,
    MenuItem,
    TextField,
} from '@mui/material';

// imports of utils
import {
    createBauComponent,
    deleteBauComponent
} from '../utils/bauFunctions'

import {
    createSalesComponent,
    deleteSalesComponent,

    salesProjectTypeChange
} from '../utils/salesFunction'

const drawerWidth = 220;

const activities = {
    bau: {
        bau_001: ["Stakeholder Meeting", "Code Review"],
        bau_002: ["Daily Standup", "Documentation Review", "Performance Testing", "Bug Fixing"],
    },
    sales: {
        sales_001: ["Client Meeting", "Follow-up Calls", "Presentation Preparation"],
        sales_002: ["Market Research", "Strategy Planning", "Review Sales Targets", "Client Outreach", "Proposal Drafting"],
    },
};

function Timesheet() {

    // For functionality
    const [totalHours, setTotalHours] = useState(0);
    const [bauTotalHours, setBauTotalHours] = useState(0)
    const [salesTotalHours, setSalesTotalHours] = useState(0)
    const [storageTime, setStorageTime] = useState([])
    const [daysOfWeek, setDaysOfWeek] = useState({
        mon: 0,
        tue: 0,
        wed: 0,
        thu: 0,
        fri: 0,
        sat: 0,
        sun: 0,
    })
    const [bauRowData, setBauRowData] = useState([
        { id: 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
    ]);
    const [salesRowData, setSalesRowData] = useState([
        { id: 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
    ]);

    useEffect(() => {

        // To update the total hours
        let totalTime = salesTotalHours + bauTotalHours
        setTotalHours(totalTime)

        // To update the daysOfWeek
        var weekDay = {
            mon: 0,
            tue: 0,
            wed: 0,
            thu: 0,
            fri: 0,
            sat: 0,
            sun: 0,
        }

        bauRowData.forEach((row) => {
            weekDay.mon += row.mon || 0;
            weekDay.tue += row.tue || 0;
            weekDay.wed += row.wed || 0;
            weekDay.thu += row.thu || 0;
            weekDay.fri += row.fri || 0;
            weekDay.sat += row.sat || 0;
            weekDay.sun += row.sun || 0;
        });

        salesRowData.forEach((row) => {
            weekDay.mon += row.mon || 0;
            weekDay.tue += row.tue || 0;
            weekDay.wed += row.wed || 0;
            weekDay.thu += row.thu || 0;
            weekDay.fri += row.fri || 0;
            weekDay.sat += row.sat || 0;
            weekDay.sun += row.sun || 0;
        });

        setDaysOfWeek(weekDay)

    }, [bauTotalHours, salesTotalHours])


    // BauFunctions ...
    const handleCreateBauComponent = () => {
        createBauComponent(bauRowData, setBauRowData);
    }

    const handleDeleteBauComponent = (id) => {
        deleteBauComponent(id, bauRowData, setBauRowData, setBauTotalHours)
    }

    // SalesFunctions ...
    const handleCreateSalesComponent = () => {
        createSalesComponent(salesRowData, setSalesRowData)
    }

    const handleDeleteSalesComponent = (id) => {
        deleteSalesComponent(id, salesRowData, setSalesRowData, setSalesTotalHours)
    }

    // Dropdown functionality for Sales ...
    const handleSalesProjectTypeChange = (event, id) => {
        salesProjectTypeChange(event, id, salesRowData, setSalesRowData)
    };

    const handleSalesProjectNameChange = (event, id) => {
        const { value } = event.target;

        const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, projectName: value } : row));
        setSalesRowData(updatedRowData);
    };

    // Dropdown functionality for BAU ...
    const handleBauProjectTypeChange = (event, id) => {
        const { value } = event.target;

        const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, projectType: value, projectName: '', task: '' } : row));
        setBauRowData(updatedRowData);
    };

    const handleBauProjectNameChange = (event, id) => {
        const { value } = event.target;

        const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, projectName: value } : row));
        setBauRowData(updatedRowData);
    };

    const handleCommentChange = (event, id) => {
        const { value } = event.target;

        const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, comment: value } : row));
        setBauRowData(updatedRowData);
    };

    const handleSalesCommentChange = (event, id) => {
        const { value } = event.target;

        const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, comment: value } : row));
        setSalesRowData(updatedRowData);
    };

    const handleBauDayOfWeekChange = (event, day, id) => {

        const { value } = event.target;

        if (value <= 24 && value >= 0) {
            // Update the respective row data
            const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, [day]: parseInt(value, 10) || 0 } : row));
            setBauRowData(updatedRowData);

            // Recalculate total hours
            const updatedTotalHours = updatedRowData.reduce(
                (total, row) => total + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat + row.sun,
                0
            );

            setBauTotalHours(updatedTotalHours);
        }

    };

    const handleSalesDayOfWeekChange = (event, day, id) => {
        const { value } = event.target;

        if (value <= 24 && value >= 0) {
            // Update the respective row data
            const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, [day]: parseInt(value, 10) || 0 } : row));
            setSalesRowData(updatedRowData);

            // Recalculate total hours
            const updatedTotalHours = updatedRowData.reduce(
                (total, row) => total + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat + row.sun,
                0
            );

            setSalesTotalHours(updatedTotalHours);
        }

    };


    return (
        <div className="App">

            {/* Total Content Screen */}
            <Grid container>
                {/* Title */}
                <Grid item xs={12} md={12} lg={12} >
                    <Typography variant="h4" gutterBottom sx={{ color: "#19105b", fontWeight: 'bold', textAlign: "left", m: 0, p: 0 }}>
                        Timesheet
                    </Typography>
                </Grid>


                {/* Total Hours */}
                <Grid item xs={12} md={12} lg={12} sx={{ textAlign: "left", m: 0, p: 0 }} >
                    <p style={{ color: "#19105b", textAlign: "left", padding: '10px', paddingLeft: '0px' }}>
                        Total Hours: {totalHours}
                    </p>
                </Grid>

                {/* Allocation Extension */}
                <Grid item xs={12} md={12} lg={12} sx={{ bgcolor: "#19105b" }}>
                    <p style={{ color: "#ffffff", textAlign: "left", padding: '10px' }}>
                        Allocation Extension
                    </p>
                </Grid>

                {/* Timesheet Title*/}
                <Grid item xs={12} md={12} lg={12} sx={{ bgcolor: "#19105b", mt: '10px' }}>
                    <p style={{ color: "#ffffff", textAlign: "left", padding: '10px' }}>
                        Timesheet
                    </p>
                </Grid>

                {/* Timesheet Table for BAU Activites */}
                <Grid item xs={12} md={12} lg={12} sx={{ mt: 0 }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ bgcolor: '#ffe5ee' }}>
                                <TableRow>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }}>Project Type</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }}>Project Name</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }}>Task</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }}>Comment</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Mon</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Tue</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Wed</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Thu</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Fri</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Sat</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Sun</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center">Total</TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center"></TableCell>
                                    <TableCell sx={{ color: "#19105b", fontWeight: '550' }} align="center"></TableCell>
                                </TableRow>
                            </TableHead>

                            {/* For Bau Activites */}
                            <TableBody>
                                {bauRowData.map((data, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            {idx === 0 ? "BauActivity" : ""}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={data.projectType}
                                                onChange={(e) => handleBauProjectTypeChange(e, data.id)}
                                            >
                                                <MenuItem value="">Select</MenuItem>
                                                {Object.keys(activities['bau']).map((type, idx) => (
                                                    <MenuItem key={idx} value={type}>{type}</MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={data.projectName}
                                                onChange={(e) => handleBauProjectNameChange(e, data.id)}
                                            >
                                                <MenuItem value="">Select</MenuItem>
                                                {data.projectType &&
                                                    activities['bau'][data.projectType] &&
                                                    activities['bau'][data.projectType].map((name, idx) => (
                                                        <MenuItem key={idx} value={name}>{name}</MenuItem>
                                                    ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.mon > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}

                                                id={`comment-${idx}`}
                                                label=""
                                                variant="filled"
                                                value={data.comment}
                                                onChange={(e) => handleCommentChange(e, data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.mon > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                    width: '70px'
                                                }}

                                                id={`mon-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.mon}
                                                onChange={(e) => handleBauDayOfWeekChange(e, 'mon', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.tue > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                    width: '60px',
                                                }}
                                                id={`tue-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.tue}
                                                onChange={(e) => handleBauDayOfWeekChange(e, 'tue', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.wed > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                    width: '70px'
                                                }}

                                                id={`wed-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.wed}
                                                onChange={(e) => handleBauDayOfWeekChange(e, 'wed', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.thu > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                    width: '70px'
                                                }}

                                                id={`thu-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.thu}
                                                onChange={(e) => handleBauDayOfWeekChange(e, 'thu', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.fri > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                    width: '70px'
                                                }}

                                                id={`fri-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.fri}
                                                onChange={(e) => handleBauDayOfWeekChange(e, 'fri', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.sat > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                    padding: '0px',
                                                    margin: '0px',
                                                    width: '70px'
                                                }}
                                                id={`sat-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.sat}
                                                onChange={(e) => handleBauDayOfWeekChange(e, 'sat', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                inputProps={{ maxLength: 1 }}
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.sun > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                    width: '70px'
                                                }}
                                                id={`sun-${idx}`}
                                                type="number"
                                                value={data.sun}
                                                onChange={(e) => handleBauDayOfWeekChange(e, 'sun', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {data.mon + data.tue + data.wed + data.thu + data.fri + data.sat + data.sun}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="text" color="inherit" size="large" onClick={handleCreateBauComponent}>+</Button>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                idx === 0
                                                    ?
                                                    ""
                                                    :
                                                    <Button variant="text" color="inherit" size="large" onClick={() => handleDeleteBauComponent(data.id)}>-</Button>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>


                            {/* For Sales Activities */}
                            <TableBody>
                                {salesRowData.map((data, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell>
                                            {idx === 0 ? "SalesActivity" : ""}
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={data.projectType}
                                                onChange={(e) => handleSalesProjectTypeChange(e, data.id)}
                                            >
                                                <MenuItem value="">Select</MenuItem>
                                                {Object.keys(activities['sales']).map((type, idx) => (
                                                    <MenuItem key={idx} value={type}>{type}</MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={data.projectName}
                                                onChange={(e) => handleSalesProjectNameChange(e, data.id)}
                                            >
                                                <MenuItem value="">Select</MenuItem>
                                                {data.projectType &&
                                                    activities['sales'][data.projectType] &&
                                                    activities['sales'][data.projectType].map((name, idx) => (
                                                        <MenuItem key={idx} value={name}>{name}</MenuItem>
                                                    ))}
                                            </Select>
                                        </TableCell>

                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.mon > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}

                                                id={`comment-${idx}`}
                                                label=""
                                                variant="filled"
                                                value={data.comment}
                                                onChange={(e) => handleSalesCommentChange(e, data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.mon > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}

                                                id={`mon-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.mon}
                                                onChange={(e) => handleSalesDayOfWeekChange(e, 'mon', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.tue > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}
                                                id={`tue-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.tue}
                                                onChange={(e) => handleSalesDayOfWeekChange(e, 'tue', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.wed > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}

                                                id={`wed-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.wed}
                                                onChange={(e) => handleSalesDayOfWeekChange(e, 'wed', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.thu > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}

                                                id={`thu-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.thu}
                                                onChange={(e) => handleSalesDayOfWeekChange(e, 'thu', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.fri > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}

                                                id={`fri-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.fri}
                                                onChange={(e) => handleSalesDayOfWeekChange(e, 'fri', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.sat > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}
                                                id={`sat-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.sat}
                                                onChange={(e) => handleSalesDayOfWeekChange(e, 'sat', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                sx={{
                                                    alignSelf: 'center',
                                                    '& input': {
                                                        textAlign: 'center',
                                                        color: data.sun > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
                                                    },
                                                }}
                                                id={`sun-${idx}`}
                                                label=""
                                                type="number"
                                                value={data.sun}
                                                onChange={(e) => handleSalesDayOfWeekChange(e, 'sun', data.id)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {data.mon + data.tue + data.wed + data.thu + data.fri + data.sat + data.sun}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="text" color="inherit" size="large" onClick={handleCreateSalesComponent}>+</Button>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                idx === 0
                                                    ?
                                                    ""
                                                    :
                                                    <Button variant="text" color="inherit" size="large" onClick={() => handleDeleteSalesComponent(data.id)}>-</Button>
                                            }
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Total Hours
                                    </TableCell>

                                    {/* Empty Columns */}
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>

                                    {/* Store Time / day in a week */}
                                    {
                                        Object.keys(daysOfWeek).map((task, idx) => (
                                            <TableCell sx={{ textAlign: "center" }} key={idx}>{daysOfWeek[task]}</TableCell>
                                        ))
                                    }

                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Machine Hours
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        Break Hours
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>
                    </TableContainer>
                </Grid>

                <Grid item xs={12} md={12} lg={12} sx={{ mt: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div></div>

                        <div>
                            <Button
                                style={{ color: 'white', backgroundColor: '#19105b', marginRight: '5px', padding: '5px' }}
                                onClick={() => {
                                    var temp = [...storageTime]
                                    temp.push(Date.now().toString())
                                    setStorageTime(temp)
                                    localStorage.setItem(Date.now().toString(), [...bauRowData, ...salesRowData].toString());
                                    alert('Saved Data')
                                }}>save</Button>
                            <Button
                                style={{ color: 'white', backgroundColor: '#ef5b92', marginLeft: '5px', padding: '5px' }}
                                onClick={() => {
                                    storageTime.forEach((date, idx) => {
                                        let data = localStorage.getItem(date.toString());
                                        console.log("This is at ", idx, " stores : ", Object.keys(data), " values ", Object.values(data));
                                    })
                                    alert('Logged all data in the console')
                                }}
                            >submit</Button>
                        </div>

                    </div>
                </Grid>

            </Grid>

        </div>
    );
}

export default Timesheet;
