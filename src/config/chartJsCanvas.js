import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

export const generateChartImage = async ({ labels, dataSet }) => {
  const configurationChart = {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          data: dataSet,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderRadius: 10,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
      },
    },
  };

  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 300, height: 300 });

  const chartImage = await chartJSNodeCanvas.renderToBuffer(configurationChart);

  return chartImage;
};
