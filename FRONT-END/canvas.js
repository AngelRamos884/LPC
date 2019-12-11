function setChart(dataP, dataCD){

    const label = []
    for (let index = 0; index <= 100;index++) {
       
        label.push(index);
        
    }
    var ctxC = document.getElementById('myChartC').getContext('2d');
    var chartC = new Chart(ctxC, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels:dataCD,
            datasets: [{
                label: 'Registro de pulsos',
                data: dataP,
                backgroundColor: [
                    'rgba(243, 47, 9, 0.6)',
                    
                ],
                borderColor: 'orange',
    backgroundColor: 'transparent',
    borderDash: [5, 5],
    pointBorderColor: 'orange',
    pointBackgroundColor: 'rgba(255,150,0,0.5)',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
            }
        ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                    max: 100,
                    min: 10,
                    stepSize: 10
                }
                }]
            },
            events: ['click']
        },
        legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 80,
              fontColor: 'black'
            }
          }
      
    });
   
    
}