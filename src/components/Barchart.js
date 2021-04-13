import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: [],
                backgroundColor: [],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                      min: 0,
                      stepSize: 1,
                    }
                  }]
            }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('restaurants').doc(this.$userUid).get().then(doc => {
        var orders=doc.data()["order_counts"];
        for(var key in orders){
            this.datacollection.datasets[0].label.push(key);
            this.datacollection.datasets[0].data.push(orders[key]);
            this.datacollection.datasets[0].backgroundColor.push("#3e95cd");
        }
        this.renderChart(this.datacollection, this.options);
      })
    }
  },
  created () {
    this.fetchItems()
  }
}