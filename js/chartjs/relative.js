// dependant upon chartsjs loading

var ctx = document.getElementById('relative');
  var toxicityChart = new Chart(ctx, {
    // type: 'horizontalBar',
    type: 'bar',
      // data: {
      //     labels: 
      //     ['BATTERY',  'CABLE',  'DONGLE',  'ELASTOMERS',  'FEET',  'METAL','PLASTIC FOAM','PLASTIC SHEET/FILM',  'RIGID PLASTIC','PCBA'],
      //     datasets: [
      //               {
      //                   label: 'Design 1',
      //                   data: [ 0.000 , 0.338 , 0.573 , 0.056 , 0.005 , 0.000 , 0.002 , 0.002 , 0.022 , 0.001]
      //                   //  //backgroundColor: '#D6E9C6' // green
      //               },
      //               {
      //                   label: 'Design 2',
      //                   data: [0.000 , 0.676,1.146 , 0.111 , 0.011 , 0.000 , 0.004 , 0.005 , 0.044 , 0.002]
      //                   //  //backgroundColor: '#FAEBCC' // yellow
      //               },
      //               {
      //                   label: 'Design 3',
      //                   data: [0.000,1.014,1.719 , 0.167 , 0.016 , 0.000 , 0.006 , 0.007 , 0.066 , 0.004]
      //                   //  //backgroundColor: '#EBCCD1' // red
      //               }
      //               ]
      // },
      data: {
          labels: 
          ['Design 1',  'Design 2',  'Design 3'],
          datasets: [
                    {
                        label: 'Battery',
                        data: [ 0.000 , 0.000, 0.000],
                          //backgroundColor: '#D6E9C6' // green
                    },
                    {
                        label: 'CABLES',
                        data: [0.338, 0.676, 1.014],           
                         //backgroundColor: '#FAEBCC' // yellow
                    },
                    {
                        label: 'DONGLE',
                        data: [0.573, 1.146, 1.719],
                         //backgroundColor: '#EBCCD1' // red
                    },
                    {
                        label: 'ELASTOMERS',
                        data: [0.056, 0.111, 0.167],
                         //backgroundColor: 'ORANGE' // red
                    },
                    {
                        label: 'FEET',
                        data: [0.005, 0.011, 0.016],
                         //backgroundColor: 'INDIGO' // red
                    },
                    {
                        label: 'METAL',
                        data: [ 0.000 , 0.000, 0.000],
                         //backgroundColor: 'PURPLE' // red
                    },
                    {
                        label: 'PLASTIC FOAM',
                        data: [0.002,0.004,0.006],
                         //backgroundColor: 'BROWN' // red
                    },
                    {
                        label: 'PLASTIC SHEET/FILM',
                        data: [0.002,0.005,0.007],            
                         //backgroundColor: '#EBCCD1' // red
                    },
                    {
                        label: 'RIGID PLASTICS',                      
                        data: [0.022, 0.044, 0.066],
                         //backgroundColor: '#EBCCD1' // red
                    },
                    {
                        label: 'PCBA',                      
                        data: [0.001, 0.002, 0.004],
                         //backgroundColor: '#EBCCD1' // red
                    },
                    ]
      },
      options: {
	     title: {
			display: true,
			text: 'Estimated relative baseline'
          },
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'right',
          },
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: true,
						}],
						yAxes: [{
							stacked: true
						}]
                    },
                    plugins: {
                        colorschemes: {
                            scheme: 'brewer.Paired12'
                        }
                    }
				}
  });