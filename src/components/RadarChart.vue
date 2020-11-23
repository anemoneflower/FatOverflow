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
    },
    myCe: Number,
    myTaste: Number,
    myFilling: Number,
    myConvenience: Number,
    myPortability: Number,
    avgCe: Number,
    avgTaste: Number,
    avgFilling: Number,
    avgConvenience: Number,
    avgPortability: Number,



  },
  extends: Radar,
  data() {
    return {
      datacollection: {
        labels: [
          "cost-effectiveness", "taste", "filling", "convenience", "portability"
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
            data: [this.myCe, this.myTaste, this.myFilling, this.myConvenience, this.myPortability
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
            data: [this.avgCe, this.avgTaste, this.avgFilling, this.avgConvenience, this.avgPortability
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
          }
          };},
  mounted() {
    console.log("RadarChart called")
    this.renderChart(this.datacollection, this.options);
  }};
</script>