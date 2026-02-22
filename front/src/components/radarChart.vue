<script setup lang="ts">
import { computed } from 'vue'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const props = defineProps<{
  scores: number[] 
}>()

const MAX_VALUES = [40, 30, 20, 10];

const getPointColor = (score: number, max: number) => {
  const ratio = score / max;
  if (ratio <= 0.3) return '#10b981'; 
  if (ratio <= 0.6) return '#fb923c'; 
  return '#f87171'; // Rouge
}

const data = computed(() => {
  const colors = props.scores.map((s, i) => getPointColor(s, MAX_VALUES[i] || 1));

  return {
    labels: ['Mots de passe', 'Navigation Web', 'Email / Phishing', 'Réseaux Sociaux'],
    datasets: [
      {
        label: 'Niveau de Risque',
        backgroundColor: 'rgba(97, 220, 163, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderWidth: 2,
        pointBackgroundColor: colors,
        pointBorderColor: '#000',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        data: props.scores
      }
    ]
  }
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const val = context.raw;
          const max = MAX_VALUES[context.dataIndex] || 0;
          return ` Score: ${val} / ${max}`;
        }
      }
    }
  },
  scales: {
    r: {
      angleLines: {
        display: true,
        color: 'rgba(255,255,255,0.1)'
      },
      grid: {
        color: 'rgba(255,255,255,0.08)'
      },
      pointLabels: {
        color: 'rgba(255,255,255,0.7)',
        font: { 
          size: 12,
          weight: 'bold'
        }
      },
      ticks: {
        display: true,
        color: 'rgba(255,255,255,0.3)',
        backdropColor: 'transparent',
        font: { size: 10 },
        z: 10
      },
      suggestedMin: 0,
      suggestedMax: 40
    }
  }
}

const plugin = {
  id: 'pointLabels',
  afterDatasetsDraw(chart: any) {
    const { ctx, data } = chart;
    ctx.save();
    data.datasets.forEach((dataset: any, i: number) => {
      chart.getDatasetMeta(i).data.forEach((point: any, index: number) => {
        const value = dataset.data[index];
        if (value === undefined || value === null) return;
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(value.toString(), point.x, point.y - 10);
      });
    });
    ctx.restore();
  }
};
</script>

<template>
  <div class="chart-container">
    <Radar :data="data" :options="options as any" :plugins="[plugin]" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>