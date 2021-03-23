// Dom7
var $ = Dom7;

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Init App
var app = new Framework7({
    id: 'io.framework7.testapp',
    root: '#app',
    theme: 'md',
    data: function () {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
        };
    },
    methods: {
        helloWorld: function () {
            app.dialog.alert('Hello World!');
        },
        toggleSwipeStep: function () {
            var self = this;
            self.sheetSwipeToStep.stepToggle();
          },
    },
    routes: routes,
    popup: {
        closeOnEscape: true,
    },
    sheet: {
        closeOnEscape: true,
    },
    popover: {
        closeOnEscape: true,
    },
    actions: {
        closeOnEscape: true,
    },
    vi: {
        placementId: 'pltd4o7ibb9rc653x14',
    },
});

setTimeout(function () {
    $('.loader-display').hide();
}, 2000);

$('.background').each(function () {
    var imgpath = $(this).find('img');
    $(this).css('background-image', 'url(' + imgpath.attr('src') + ')');
    imgpath.hide();
})

/* PWA services worker register */
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function (event) {
        navigator.serviceWorker
            .register("../serviceWorker.js", {
            //.register("https://maxartkiller.com/website/soroniux-web/Framework7/serviceWorker.js", {
                scope: './'
            })
            .then(reg => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered"));
    });
}

/* PWA add to home button */

var defferedPrompt;
window.addEventListener("beforeinstallprompt", function (event) {
    event.preventDefault();
    defferedPrompt = event;
});

window.addEventListener("appinstalled", function (event) {
    //app.logEvent("a2hs", "Installed");
    document.getElementById('addtodevice').style.display = 'none';
});




$(document).on('page:init', function (e) {
    /* Background */
    $('.background').each(function () {
        var imgpath = $(this).find('img');
        $(this).css('background-image', 'url(' + imgpath.attr('src') + ')');
        imgpath.hide();
    })
});

$(document).on('page:init', '.page[data-name="home"]', function (e) {
    /* Background */
    $('#price-filter').on('range:change', function (e) {
        var range = app.range.get(e.target);
        $('.price-value').text('$' + (range.value[0]) + ' - $' + (range.value[1]));
    });


    // Standalone Popup
    self.autocompleteStandalonePopup = app.autocomplete.create({
        openIn: 'popup', //open in page
        searchbarPlaceholder: 'vijayanagar',
        openerEl: '#autocomplete-standalone-popup', //link that opens autocomplete
        closeOnSelect: true, //go back after we select something
        source: function (query, render) {
            var autocomplete = this;
            var results = [];
            if (query.length === 0) {
              render(results);
              return;
            }
            // Show Preloader
            autocomplete.preloaderShow();

            // Do Ajax request to Autocomplete data
            app.request({
              url: './js/autocomplete-languages.json',
              method: 'GET',
              dataType: 'json',
              //send "query" to server. Useful in case you generate response dynamically
              data: {
                query: query,
              },
              success: function (data) {
                // Find matched items
                for (var i = 0; i < data.locations.length; i++) {
                  if (data.locations[i].toLowerCase().indexOf(query.toLowerCase()) === 0) results.push(data.locations[i]);
                }
                // Hide Preoloader
                autocomplete.preloaderHide();
                // Render items by passing array with result items
                render(results);
              }
            });
        },
        on: {
          change: function (value) {
            // Add item text value to item-after
            $('#autocomplete-standalone-popup').find('.item-after').text(value[0]);
            // Add item value to input value
            $('#autocomplete-standalone-popup').find('input').val(value[0]);
          },
        },
      });

      self.sheetSwipeToStep = self.app.sheet.create({
        el: '.demo-sheet-swipe-to-step',
        swipeToClose: true,
        swipeToStep: true,
        push: true,
        backdrop: true,
        on: {
            open: function (sheet) {
                let location = document.getElementById('predict_location').value;
                let total_sqft = document.getElementById('predict_sqft').value;
                let bhk = document.getElementById('predict_bhk').value;
                let bath = document.getElementById('predict_bath').value;
                // Do Ajax request to Autocomplete data
                app.request({
                    url: 'https://jsonplaceholder.typicode.com/todos/1',
                    method: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        $('#predicted_price').html(`<b>${data.id} Lakhs</b>`);
                        $('#predicted_location').html(`<b>${location}</b>`.toUpperCase());
                        $('#predicted_sqft').html(`<b>${total_sqft}</b>`);
                        $('#predicted_bath').html(`<b>${bath}</b>`);
                        $('#predicted_bhk').html(`<b>${bhk}</b>`);
                    }
                });
            },
        }
      });
  
    document.getElementById('addtohome').addEventListener("click", function (event) {
        defferedPrompt.prompt();

        defferedPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            defferedPrompt = null;
        });
    });


});

$(document).on('page:init', '.page[data-name="analytics"]', function (e) {
    /* Background */
    var areachart = document.getElementById('mixedchartjs').getContext('2d');
    var gradient1 = areachart.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, '#FF97B5');
    gradient1.addColorStop(0.5, 'rgba(251, 151, 181, 0)');

    area();

    function area() {

        var configareachart = {
            type: 'line',
            data: {
                labels: ['0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
                datasets: [{
                    label: 'My First dataset',
                    borderWidth: '1',
                    borderColor: 'rgba(255, 151, 181, 1)',
                    backgroundColor: gradient1,
                    data: [
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor(),
                        randomScalingFactor()
                    ],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    point: {
                        radius: '1',
                    }
                },
                title: {
                    display: false,
                    text: 'Chart.js Line Chart - Stacked Area'
                },
                tooltips: {
                    mode: 'index',
                },
                hover: {
                    mode: 'index'
                },
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            display: false,
                            fontColor: "#90b5ff",
                        },
                        display: false,
                        stacked: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: false,
                            fontColor: "#90b5ff",
                        },
                        display: false,
                        stacked: false,
                        scaleLabel: {
                            display: false,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        };

        window.salesareachart = new Chart(areachart, configareachart);

        setInterval(function () {
            configareachart.data.datasets.forEach(function (dataset) {
                dataset.data = dataset.data.map(function () {
                    return randomScalingFactor();
                });

            });
            window.salesareachart.update();
        }, 1100);

    }

});
