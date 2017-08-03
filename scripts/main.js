var app = new Vue({
    el: '#app',
    data: {
        percent: 0,
        cycles: 0,
        isCharging: false,
        updatedInfo: false
    }
});

// Import the systeminformation module and store it in the si variable
var si = require('systeminformation');

// Create a function that can be continuosly called to get updated batter info
function updateData () {
    // Access the battery API of si and pass in a callback function
    si.battery(function (data) {
        // Force the value of updatedInfo in our Vue app to false,
        // this will show the text "Updated" on the page.
        app.updatedInfo = false;
        // Update the data in our Vue app with the data from si
        app.percent = Math.round(data.percent);
        app.isCharging = data.ischarging;
        app.cycles = data.cyclecount;
        // To force a CSS animation to occur we wait 1 second
        setTimeout(function () {
            // Then re-add the class of "updated" on the page so the text fades away
            app.updatedInfo = true;
        }, 1000);
    });
}

// Run the function once when the app first loads.
updateData();

// Update the batter data every 10 seconds.
setInterval(updateData, (10 * 1000));

