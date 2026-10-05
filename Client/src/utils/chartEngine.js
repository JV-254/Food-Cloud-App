// Client/src/utils/chartEngine.js
// 1. Line Chart Option Matrix compiler
export const getLineChartConfig = (labels, datasets = []) => {
  return {
    data: {
      labels: labels,
      datasets: datasets.map((ds, idx) => ({
        // 💡 Falls back to ds.label if ds.name isn't found
        label: ds.name || ds.label, 
        data: ds.data,
        borderColor: idx === 0 ? '#059669' : idx === 1 ? '#3b82f6' : '#f59e0b',
        backgroundColor: 'transparent',
        borderWidth: 2.5,
        tension: 0.3,
        pointRadius: 3
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Inter' } } } },
      scales: { y: { grid: { color: 'rgba(156, 163, 175, 0.1)' } }, x: { grid: { display: false } } }
    }
  };
};
// 2. Doughnut Chart Configuration Compiler
export const getDoughnutChartConfig = (labels, data = []) => {
  return {
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ['#059669', '#2563eb', '#38bdf8', '#fbbf24', '#94a3b8'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { 
        legend: { 
          position: 'right', 
          labels: { boxWidth: 12, font: { family: 'Inter' } } 
        } 
      },
      cutout: '70%'
    }
  };
};

// 3. Bar Chart Configuration Compiler (Includes horizontal toggle capability)
export const getBarChartConfig = (labels, data = [], horizontal = false) => {
  return {
    data: {
      labels: labels,
      datasets: [{
        label: 'Volume KSh',
        data: data,
        backgroundColor: '#059669',
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: horizontal ? 'y' : 'x',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { 
        y: { grid: { color: 'rgba(156, 163, 175, 0.1)' } }, 
        x: { grid: { display: false } } 
      }
    }
  };
};