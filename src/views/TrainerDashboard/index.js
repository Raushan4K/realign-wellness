
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Box, Paper, Typography, Button, Switch, Slider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// Mock user/class data (array for future multiple records)
const mockClasses = [
  {
    id: 1,
    packageName: 'Premium Yoga',
    purchaseDate: '2025-09-01',
    daysLeft: 3,
    className: 'Morning Flow',
    trainer: 'Anjali Sharma',
    classDateTime: '2025-09-17T07:00:00',
    zoomLink: 'https://zoom.us/j/123456789',
  },
];
// Mock week-wise progress (trainer can edit week metrics)
const weekRanges = [
  '04 Sep - 10 Sep',
  '11 Sep - 17 Sep',
  '18 Sep - 24 Sep',
  '25 Sep - 01 Oct',
];
const initialWeekMetrics = {
  '04 Sep - 10 Sep': { Strength: 70, Stamina: 60, Flexibility: 50, Mindfulness: 40 },
  '11 Sep - 17 Sep': { Strength: 75, Stamina: 65, Flexibility: 55, Mindfulness: 45 },
  '18 Sep - 24 Sep': { Strength: 80, Stamina: 70, Flexibility: 60, Mindfulness: 50 },
  '25 Sep - 01 Oct': { Strength: 85, Stamina: 75, Flexibility: 65, Mindfulness: 55 },
};

const metricLabels = ['Strength', 'Stamina', 'Flexibility', 'Mindfulness'];


const TrainerDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState(weekRanges[0]);
  const [weekMetrics, setWeekMetrics] = useState(initialWeekMetrics);
  const [saveMsg, setSaveMsg] = useState('');

  // Handler for week metric change
  const handleMetricChange = (metric, value) => {
    setWeekMetrics(prev => ({
      ...prev,
      [selectedWeek]: { ...prev[selectedWeek], [metric]: value },
    }));
  };

  // Simulate save (would call API in real app)
  const handleSave = () => {
    setSaveMsg('Metrics updated for ' + selectedWeek + '!');
    setTimeout(() => setSaveMsg(''), 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" color="primary" sx={{ flex: 1 }}>Trainer Dashboard</Typography>
        {/* Switch button (no functionality yet) */}
        <Switch color="primary" />
      </Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" color="primary" mb={2}>Class Details</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Package</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Number Of classes</TableCell>
                <TableCell>Yoga Class</TableCell>
                <TableCell>Trainer</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Zoom Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockClasses.map(row => (
                <TableRow key={row.id}>
                  <TableCell>{row.packageName || '-'}</TableCell>
                  <TableCell>{row.purchaseDate || '-'}</TableCell>
                  <TableCell>{row.daysLeft ?? '-'}</TableCell>
                  <TableCell>{row.className || '-'}</TableCell>
                  <TableCell>{row.trainer || '-'}</TableCell>
                  <TableCell>{row.classDateTime ? new Date(row.classDateTime).toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    {row.zoomLink ? (
                      <Button variant="contained" color="success" size="small" href={row.zoomLink} target="_blank" rel="noopener">Start</Button>
                    ) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" color="primary" mb={2}>Progress Report (Edit Week-wise)</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="body2" fontWeight={600}>Select Week:</Typography>
          <select
            value={selectedWeek}
            onChange={e => setSelectedWeek(e.target.value)}
            style={{ fontSize: 16, padding: '4px 12px', borderRadius: 6 }}
          >
            {weekRanges.map(week => (
              <option key={week} value={week}>{week}</option>
            ))}
          </select>
        </Box>
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 2 }}>
          {metricLabels.map(label => (
            <Box key={label} sx={{ flex: 1, minWidth: 120, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" mb={1}>{label}</Typography>
              <Slider
                value={weekMetrics[selectedWeek][label]}
                min={0}
                max={100}
                step={1}
                onChange={(_, val) => handleMetricChange(label, val)}
                valueLabelDisplay="auto"
                sx={{ mb: 1 }}
              />
              <Typography variant="h6" fontWeight={700}>{weekMetrics[selectedWeek][label]}</Typography>
            </Box>
          ))}
        </Box>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        {saveMsg && <Typography color="success.main" sx={{ mt: 1 }}>{saveMsg}</Typography>}
      </Paper>
    </Box>
  );
};

export default TrainerDashboard;