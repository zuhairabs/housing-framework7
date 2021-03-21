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
