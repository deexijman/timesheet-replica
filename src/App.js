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

function App() {
  const [totalHours, setTotalHours] = useState(0);
  const [bauTotalHours, setBauTotalHours] = useState(0)
  const [salesTotalHours, setSalesTotalHours] = useState(0)

  const [bauRowData, setBauRowData] = useState([
    { id: 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
  ]);
  const [salesRowData, setSalesRowData] = useState([
    { id: 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 },
  ]);

  const createBauComponent = () => {
    var newRow = { id: bauRowData.length + 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    var newBuiData = [...bauRowData];
    newBuiData.push(newRow);
    setBauRowData(newBuiData);
  };

  const createSalesComponent = () => {
    var newRow = { id: salesRowData.length + 1, projectType: '', projectName: '', task: '', comment: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    var newSalesData = [...salesRowData];
    newSalesData.push(newRow);
    setSalesRowData(newSalesData);
  };

  const handleSalesProjectTypeChange = (event, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, projectType: value, projectName: '', task: '' } : row));
    setSalesRowData(updatedRowData);
  };

  const handleSalesProjectNameChange = (event, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, projectName: value } : row));
    setSalesRowData(updatedRowData);
  };

  const handleProjectTypeChange = (event, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, projectType: value, projectName: '', task: '' } : row));
    setBauRowData(updatedRowData);
  };

  const handleProjectNameChange = (event, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, projectName: value } : row));
    setBauRowData(updatedRowData);
  };

  const handleCommentChange = (event, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, comment: value } : row));
    setBauRowData(updatedRowData);
  };

  const handleSalesCommentChange = (event, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, comment: value } : row));
    setSalesRowData(updatedRowData);
  };

  useEffect(() => {
    let totalTime = salesTotalHours + bauTotalHours
    setTotalHours(totalTime)
  }, [bauTotalHours, salesTotalHours])

  const handleDayOfWeekChange = (event, day, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = bauRowData.map(row => (row.id === id ? { ...row, [day]: parseInt(value, 10) || 0 } : row));
    setBauRowData(updatedRowData);

    // Recalculate total hours
    const updatedTotalHours = updatedRowData.reduce(
      (total, row) => total + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat + row.sun,
      0
    );

    setBauTotalHours(updatedTotalHours);
  };

  const handleSalesDayOfWeekChange = (event, day, id) => {
    const { value } = event.target;

    // Update the respective row data
    const updatedRowData = salesRowData.map(row => (row.id === id ? { ...row, [day]: parseInt(value, 10) || 0 } : row));
    setSalesRowData(updatedRowData);

    // Recalculate total hours
    const updatedTotalHours = updatedRowData.reduce(
      (total, row) => total + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat + row.sun,
      0
    );

    setSalesTotalHours(updatedTotalHours);
  };


  return (
    <div className="App">
      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12} md={12} lg={12} sx={{ textAlign: "left" }}>
          <Typography variant="h5" gutterBottom>
            Timesheet
          </Typography>
        </Grid>

        {/* Total Hours */}
        <Grid item xs={12} md={12} lg={12} sx={{ textAlign: "left" }}>
          <Typography variant="h5" gutterBottom>
            Total Hours: {totalHours}
          </Typography>
        </Grid>

        {/* Timesheet Table for BAU Activites */}
        <Grid item xs={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Project Type</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Task</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Mon</TableCell>
                  <TableCell>Tue</TableCell>
                  <TableCell>Wed</TableCell>
                  <TableCell>Thu</TableCell>
                  <TableCell>Fri</TableCell>
                  <TableCell>Sat</TableCell>
                  <TableCell>Sun</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
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
                        onChange={(e) => handleProjectTypeChange(e, data.id)}
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
                        onChange={(e) => handleProjectNameChange(e, data.id)}
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
                        }}

                        id={`mon-${idx}`}
                        label=""
                        type="number"
                        value={data.mon}
                        onChange={(e) => handleDayOfWeekChange(e, 'mon', data.id)}
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
                        id={`tue-${idx}`}
                        label=""
                        type="number"
                        value={data.tue}
                        onChange={(e) => handleDayOfWeekChange(e, 'tue', data.id)}
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
                        onChange={(e) => handleDayOfWeekChange(e, 'wed', data.id)}
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
                        onChange={(e) => handleDayOfWeekChange(e, 'thu', data.id)}
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
                        onChange={(e) => handleDayOfWeekChange(e, 'fri', data.id)}
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
                        onChange={(e) => handleDayOfWeekChange(e, 'sat', data.id)}
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
                        onChange={(e) => handleDayOfWeekChange(e, 'sun', data.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {data.mon + data.tue + data.wed + data.thu + data.fri + data.sat + data.sun}
                    </TableCell>
                    <TableCell>
                      <Button variant="text" onClick={createBauComponent}>+</Button>
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
                            color: data.mon > 8 ? 'red' : 'inherit', // Turns red if the value exceeds 8
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
                      <Button variant="text" onClick={createSalesComponent}>+</Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </Grid>
    </div>
  );
}

export default App;
