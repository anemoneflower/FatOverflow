<script>
import { Radar } from "vue-chartjs";

export default {
  props: {
    myEvaluation: {
      type: Array,
      default: () => [1,4,4,3,3.23]
    },
    avgEvaluation: {
      type: Array,
      default: () => [3,2,4.3,2,3.3]
    }
  },
  extends: Radar,
  data() {
    return {
      datacollection: {
        labels: [
          "cost-effectiveness", "taste", "filling", "convenience", "undecided"
        ],
        datasets: [
          {
            label: "My Rating",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [this.myEvaluation[0],
              this.myEvaluation[1],
              this.myEvaluation[2],
              this.myEvaluation[3],
              this.myEvaluation[4]
            ]
          },
          {
            label: "Average Rating",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [this.avgEvaluation[0],
              this.avgEvaluation[1],
              this.avgEvaluation[2],
              this.avgEvaluation[3],
              this.avgEvaluation[4]
            ]
          }]},
      options: {
        scale: {
          angleLines: {
            display: false
          },
          ticks: {
            suggestedMin: 1,
            suggestedMax: 5
          }
        },
        tooltips: {
            callbacks: {
                title: (tooltipItem, data) => data.labels[tooltipItem[0].index]
            }
        }
          }};},
  mounted() {
    this.renderChart(this.datacollection, this.options);
  }};
</script>