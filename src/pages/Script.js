
import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';

async function renderChart() {
  const sdk = new ChartsEmbedSDK({
    baseUrl: 'https://charts.mongodb.com/charts-project-0-hvoqv',
  });
  const chart = sdk.createChart({
    chartId: 'cf5a5758-87da-4faf-a90b-3b544af2f546',
  });
  await chart.render(document.getElementById('chart'));
}

renderChart().catch(e => window.alert(e.message));