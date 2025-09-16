import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Typography, IconButton, Paper, Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Mock data for demonstration
const weekRanges = [
  '04 Aug - 10 Aug',
  '11 Aug - 17 Aug',
  '18 Aug - 24 Aug',
  '25 Aug - 31 Aug',
  '01 Sep - 07 Sep',
  '08 Sep - 14 Sep',
];
const weekMetrics = [
  { Strength: 70, Stamina: 60, Flexibility: 50, Mindfulness: 40 },
  { Strength: 80, Stamina: 65, Flexibility: 55, Mindfulness: 45 },
  { Strength: 75, Stamina: 70, Flexibility: 60, Mindfulness: 50 },
  { Strength: 90, Stamina: 80, Flexibility: 70, Mindfulness: 60 },
  { Strength: 85, Stamina: 75, Flexibility: 65, Mindfulness: 55 },
  { Strength: 95, Stamina: 85, Flexibility: 75, Mindfulness: 65 },
];

const metricLabels = ['Strength', 'Stamina', 'Flexibility', 'Mindfulness'];

const UserDashboard = () => {
  const [weekIndex, setWeekIndex] = useState(5); // last week selected

  // --- Yoga Package/Class State ---
  const [classInfo, setClassInfo] = useState(null); // fetched from API
  const [daysLeft, setDaysLeft] = useState(null);
  // Simulate API fetch on mount
  React.useEffect(() => {
    // Replace with real API call
    setTimeout(() => {
      setClassInfo({
        packageName: 'Premium Yoga',
        purchaseDate: '2025-09-01',
        totalDays: 10,
        className: 'Morning Flow',
        trainer: 'Anjali Sharma',
        classDateTime: '2025-09-17T07:00:00',
        zoomLink: 'https://zoom.us/j/123456789',
      });
      setDaysLeft(4); // Simulate days left
    }, 500);
  }, []);

  // Join handler: open Zoom, decrement days, (optionally call API)
  const handleJoin = () => {
    if (classInfo?.zoomLink && daysLeft > 0) {
      window.open(classInfo.zoomLink, '_blank', 'noopener');
      setDaysLeft(prev => (prev > 0 ? prev - 1 : 0));
      // TODO: Call API to record attendance
    }
  };

  // Bar chart config for selected week
  const barOptions = {
    chart: { id: 'week-bar', toolbar: { show: false } },
    xaxis: { categories: metricLabels, labels: { style: { fontSize: '14px' } } },
    yaxis: { show: true, labels: { style: { fontSize: '14px' } } },
    dataLabels: { enabled: true },
    colors: ['#1976d2', '#43a047', '#fbc02d', '#ff6f91'],
    grid: { show: true },
    tooltip: { enabled: true },
    legend: { show: false },
  };
  const barSeries = [{
    name: 'Score',
    data: metricLabels.map(label => weekMetrics[weekIndex][label]),
  }];

  // Pie chart config for selected week
  const pieOptions = {
    labels: metricLabels,
    legend: { position: 'bottom' },
    colors: ['#1976d2', '#43a047', '#fbc02d', '#ff6f91'],
    dataLabels: { enabled: true },
    tooltip: { enabled: true },
    responsive: [{ breakpoint: 600, options: { chart: { height: 200 } } }],
  };
  const pieSeries = metricLabels.map(label => weekMetrics[weekIndex][label]);

  // Week navigation handlers
  const handlePrevWeek = () => setWeekIndex((i) => Math.max(i - 1, 0));
  const handleNextWeek = () => setWeekIndex((i) => Math.min(i + 1, weekRanges.length - 1));

  return (
    <Box sx={{ p: 2 }}>
      {/* Yoga Package/Class Card */}
  <Paper elevation={3} sx={{ mb: 3, p: { xs: 1.5, md: 3 }, width: '100%', boxSizing: 'border-box', borderRadius: 2 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom color="primary" sx={{ mb: 2 }}>
          My Yoga Package/Class
        </Typography>
        <Box sx={{ width: '100%', px: { xs: 0, md: 2 } }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ padding: '10px 8px', color: '#757575', fontWeight: 500, width: '40%' }}>Package Purchased</td>
                <td style={{ padding: '10px 8px', fontWeight: 700 }}>{classInfo?.packageName || '-'}</td>
              </tr>
              <tr style={{ background: '#fafafa' }}>
                <td style={{ padding: '10px 8px', color: '#757575', fontWeight: 500 }}>Purchase Date</td>
                <td style={{ padding: '10px 8px', fontWeight: 700 }}>{classInfo?.purchaseDate ? new Date(classInfo.purchaseDate).toLocaleDateString() : '-'}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 8px', color: '#757575', fontWeight: 500 }}>Days Left</td>
                <td style={{ padding: '10px 8px', fontWeight: 700 }}>{daysLeft ?? '-'}</td>
              </tr>
              <tr style={{ background: '#fafafa' }}>
                <td style={{ padding: '10px 8px', color: '#757575', fontWeight: 500 }}>Yoga Class</td>
                <td style={{ padding: '10px 8px', fontWeight: 700 }}>{classInfo?.className || '-'}</td>
              </tr>
              <tr>
                <td style={{ padding: '10px 8px', color: '#757575', fontWeight: 500 }}>Trainer</td>
                <td style={{ padding: '10px 8px', fontWeight: 700 }}>{classInfo?.trainer || '-'}</td>
              </tr>
              <tr style={{ background: '#fafafa' }}>
                <td style={{ padding: '10px 8px', color: '#757575', fontWeight: 500 }}>Date & Time</td>
                <td style={{ padding: '10px 8px', fontWeight: 700 }}>
                  {classInfo?.classDateTime ?
                    new Date(classInfo.classDateTime).toLocaleString(undefined, {
                      hour: '2-digit', minute: '2-digit', hour12: true, day: '2-digit', month: 'short', year: 'numeric'
                    }) : '-'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 8px', color: '#757575', fontWeight: 500 }}>Zoom Link</td>
                <td style={{ padding: '10px 8px' }}>
                  {classInfo?.zoomLink ? (
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={handleJoin}
                      disabled={daysLeft === 0}
                      sx={{ minWidth: 80 }}
                    >
                      JOIN
                    </Button>
                  ) : (
                    <span style={{ fontWeight: 700 }}>-</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </Paper>

      {/* Weekly Reports Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handlePrevWeek} disabled={weekIndex === 0}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', fontWeight: 700 }}>
          Weekly Reports
        </Typography>
        <IconButton onClick={handleNextWeek} disabled={weekIndex === weekRanges.length - 1}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button variant="outlined" size="small" sx={{ borderRadius: 3, px: 2, fontWeight: 600 }}>
          {weekRanges[weekIndex]}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        <Paper elevation={2} sx={{ flex: 1, p: 2, mb: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle2" color="#1976d2" fontWeight={700} mb={2}>
            Weekly Metrics
          </Typography>
          <ReactApexChart
            type="bar"
            height={300}
            width="100%"
            options={barOptions}
            series={barSeries}
          />
        </Paper>
        <Paper elevation={2} sx={{ flex: 1, p: 2 }}>
          <Typography variant="subtitle2" color="#ff6f91" fontWeight={700} mb={2}>
            Weekly Distribution
          </Typography>
          <ReactApexChart
            type="pie"
            height={300}
            width="100%"
            options={pieOptions}
            series={pieSeries}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default UserDashboard;
