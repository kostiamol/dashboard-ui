$(document).ready(function () {
    $.get("/devices", function (data) {
        let obj = JSON.parse(data);
        let dataLength = obj.length;

        $("#devices").append('<div id="container" class="container">');
        $("#container").append('<div id="row" class="row">');

        while (dataLength > 0) {
            let info_card = "info-card" + dataLength;
            let front = "front" + dataLength;
            let back = "back" + dataLength;

            // Front Side
            $("#row").append('<div id="' + info_card + '" class="info-card">');
            $("#" + info_card).append('<div id="' + front + '"class="front">');
            $('#' + front).append('<img class="card-image" src="img/fridge.ico" />');
            $('#' + front).append('</div'); // Close front

            // Back side
            $("#" + info_card).append('<div id="' + back + '"class="back">');

            // Device Info
            $("#" + back).append('<p> Type: ' + obj[dataLength - 1]["meta"]["type"] + '</p>');
            $("#" + back).append('<p>Name: ' + obj[dataLength - 1]["meta"]["name"] + '</p>');

            let devData = obj[dataLength - 1]["data"];
            let topCompart = devData.TopCompart[devData.TopCompart.length - 1].split(':');
            let botCompart = devData.BotCompart[devData.BotCompart.length - 1].split(':');

            $("#" + back).append('<p>' +
                "Cam1Time: " + new Date(parseInt(topCompart[0])).toLocaleString() + '<br>' +
                "Cam1Temp: " + topCompart[1] + '<br>' + '<br>' +
                "Cam2Time: " + new Date(parseInt(botCompart[0])).toLocaleString() + '<br>' +
                "Cam2Temp: " + botCompart[1] +
                '</p>');

            // Button get detailed data
            $("#"+back).append('<button type="button" class="btn btn-basic" id="dataBtn' + dataLength + '">' + 'Detailed data' + '</button>');
            $("#"+ "dataBtn" + dataLength).on('click', function () {
                let id = this.id.replace( /^\D+/g, '');
                window.location = "fridge.html?type=" + obj[id - 1]["meta"]["type"] + "&name="
                    + obj[id - 1]["meta"]["name"] + "&mac=" +  obj[id - 1]["meta"]["mac"];
            });

            $('#' + info_card).append('</div'); // Close
            dataLength--;
        }
    });
});