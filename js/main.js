$(document).ready(function () {
    $.getJSON('https://api.coingecko.com/api/v3/coins', function (data) {
        $.each(data, function (i, id) {
            $('#result').append(`
      
      <div class="card-deck col-sm-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${id.symbol}</h5>
              <label class="switch">
                <input type="checkbox">
                <span class="slider round"></span>
              </label>
              <p class="card-text name">${id.name}</p>
              <button id="${id.name}" class="button" data-toggle="collapse" href="#${id.symbol}" aria-expanded="false" aria-controls="${id.symbol}">More Info</button>
              <div class="collapse" id="${id.symbol}">
              <p class="card-text info-one">$=${id.market_data.current_price.usd}</p>
              <p class="card-text info-zero"><img src="${id.image.small}" alt="image"></p>
              <p class="card-text info-two">€=${id.market_data.current_price.eur}</p>
              <p class="card-text info-three">₪=${id.market_data.current_price.ils}</p>
              </div>
              </div>
              </div>
      `);
        });
    });
});

$(document).ready(function () {
    $.ajax({
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/bitcoin',
        dataType: 'json',
    }).done(function (data) {
        console.log(data);
        $.map(data, function (bitcoin, i) {
            $('#ok').append(
                '<h3>' +
                    bitcoin.market_data.current_price.usd +
                    '</h3><p>' +
                    bitcoin.market_data.current_price.eur +
                    '</p>'
            );
        });
    });
});

window.onload = function () {
    var dataPoints = [];
    var chart;
    $.getJSON(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,BTC&tsyms=USD',
        function (data) {
            $.each(data, function (key, value) {
                dataPoints.push({ x: value[0], y: parseInt(value[1]) });
            });
            chart = new CanvasJS.Chart('chartContainer', {
                title: {
                    text: 'Live Chart with dataPoints from External JSON',
                },
                data: [
                    {
                        type: 'line',
                        dataPoints: dataPoints,
                    },
                ],
            });
            chart.render();
            updateChart();
        }
    );
    function updateChart() {
        $.getJSON(
            'https://canvasjs.com/services/data/datapoints.php?xstart=' +
                (dataPoints.length + 1) +
                '&ystart=' +
                dataPoints[dataPoints.length - 1].y +
                '&length=1&type=json',
            function (data) {
                $.each(data, function (key, value) {
                    dataPoints.push({
                        x: parseInt(value[0]),
                        y: parseInt(value[1]),
                    });
                });
                chart.render();
                setTimeout(function () {
                    updateChart();
                }, 1000);
            }
        );
    }
};

// window.onload = function () {

//   var options = {
//     animationEnabled: true,
//     title:{
//       text: "Cryptonite"
//     },
//     axisY :{
//       valueFormatString: "#0,.",
//       prefix: "$",
//       suffix: "k",
//       title: "Sales"
//     },
//     toolTip: {
//       shared: true
//     },
//     data: [{
//       type: "stackedArea",
//       showInLegend: true,
//       name: "Central",
//       xValueFormatString: "MMM YYYY",
//       yValueFormatString: "$#,###",
//       dataPoints: [
//         { x: new Date(2017, 0), y: 90000 },
//         { x: new Date(2017, 1), y: 83000 },
//         { x: new Date(2017, 2), y: 97000 },
//         { x: new Date(2017, 3), y: 175000 },
//         { x: new Date(2017, 4), y: 148000 },
//         { x: new Date(2017, 5), y: 93000 },
//         { x: new Date(2017, 6), y: 131000 },
//         { x: new Date(2017, 7), y: 142000 },
//         { x: new Date(2017, 8), y: 156000 },
//         { x: new Date(2017, 9), y: 134000 },
//         { x: new Date(2017, 10), y: 115000 },
//         { x: new Date(2017, 11), y: 98000 }
//       ]
//     }, {
//       type: "stackedArea",
//       name: "East",
//       showInLegend: true,
//       yValueFormatString: "$#,###",
//       dataPoints: [
//         { x: new Date(2017, 0), y: 93000 },
//         { x: new Date(2017, 1), y: 99000 },
//         { x: new Date(2017, 2), y: 107000 },
//         { x: new Date(2017, 3), y: 110500 },
//         { x: new Date(2017, 4), y: 114000 },
//         { x: new Date(2017, 5), y: 133000 },
//         { x: new Date(2017, 6), y: 205000 },
//         { x: new Date(2017, 7), y: 192000 },
//         { x: new Date(2017, 8), y: 156000 },
//         { x: new Date(2017, 9), y: 114000 },
//         { x: new Date(2017, 10), y: 99000 },
//         { x: new Date(2017, 11), y: 135000 }
//       ]
//     }, {
//       type: "stackedArea",
//       name: "South",
//       showInLegend: true,
//       yValueFormatString: "$#,###",
//       dataPoints: [
//         { x: new Date(2017, 0), y: 123000 },
//         { x: new Date(2017, 1), y: 117000 },
//         { x: new Date(2017, 2), y: 107000 },
//         { x: new Date(2017, 3), y: 98000 },
//         { x: new Date(2017, 4), y: 94000 },
//         { x: new Date(2017, 5), y: 103000 },
//         { x: new Date(2017, 6), y: 121000 },
//         { x: new Date(2017, 7), y: 132000 },
//         { x: new Date(2017, 8), y: 99700 },
//         { x: new Date(2017, 9), y: 104000 },
//         { x: new Date(2017, 10), y: 137000 },
//         { x: new Date(2017, 11), y: 145000 }
//       ]
//     }, {
//       type: "stackedArea",
//       name: "West",
//       //indexLabel: "#total",
//       yValueFormatString: "$#,###",
//       showInLegend: true,
//       dataPoints: [
//         { x: new Date(2017, 0), y: 78000 },
//         { x: new Date(2017, 1), y: 83000 },
//         { x: new Date(2017, 2), y: 67000 },
//         { x: new Date(2017, 3), y: 88600 },
//         { x: new Date(2017, 4), y: 94000 },
//         { x: new Date(2017, 5), y: 73900 },
//         { x: new Date(2017, 6), y: 31000 },
//         { x: new Date(2017, 7), y: 42000 },
//         { x: new Date(2017, 8), y: 56000 },
//         { x: new Date(2017, 9), y: 64000 },
//         { x: new Date(2017, 10), y: 81000 },
//         { x: new Date(2017, 11), y: 105000 }
//       ]
//     }]
//   };
//   $("#chartContainer").CanvasJSChart(options);

//   }

// window.onscroll = function() {myFunction()};

// var navbar = document.getElementById("navbar");
// var sticky = navbar.offsetTop;

// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }
