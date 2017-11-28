export function setPATCHRequestParams(id, xhr) {
    let url = "/devices/" + id + "/config?mac=" + urlParams["mac"] +
        "&type=" + urlParams["type"] + "&name=" + urlParams["name"];
    xhr.open("PATCH", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Data have been delivered!");
        } else if (xhr.readyState === 4 && xhr.status === 400) {
            alert(xhr.responseText);
        }
    };
}

export function sendDevConfigFreq(id, collectFreq, sendFreq) {
    let xhr = new XMLHttpRequest();
    setPATCHRequestParams(id, xhr);

    let config = JSON.stringify(
        {
            "mac": id[0],
            "data": {
                "collectFreq": collectFreq,
                "sendFreq": sendFreq
            }
        });

    xhr.send(config);
}

export function sendDevConfigTurnedOn(id, turnedOn) {
    let xhr = new XMLHttpRequest();
    setPATCHRequestParams(id, xhr);

    let config = JSON.stringify(
        {
            "mac": id[0],
            "data": {
                "turnedOn": turnedOn
            }
        });

    xhr.send(config);
}

export function sendDevDataStreamOn(id, streamOn) {
    let xhr = new XMLHttpRequest();
    setPATCHRequestParams(id, xhr);

    let config = JSON.stringify(
        {
            "mac": id[0],
            "data": {
                "streamOn": streamOn
            }
        });

    xhr.send(config);
}
