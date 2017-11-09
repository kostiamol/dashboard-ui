export function parseURLParams(url) {
    let queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") {
        return;
    }

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) {
            parms[n] = [];
        }

        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

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

export function setDevConfigFields(obj) {
    if (obj["turnedOn"]) {
        document.getElementById('turnedOnBtn').innerHTML = "On";
        document.getElementById('turnedOnBtn').className = "btn btn-success";
    } else {
        document.getElementById('turnedOnBtn').innerHTML = "Off";
        document.getElementById('turnedOnBtn').className = "btn btn-danger";
    }

    document.getElementById('collectFreq').value = obj["collectFreq"];
    document.getElementById('sendFreq').value = obj["sendFreq"];

    if (obj["streamOn"]) {
        document.getElementById('streamOnBtn').innerHTML = "On";
        document.getElementById('streamOnBtn').className = "btn btn-success";
    } else {
        document.getElementById('streamOnBtn').innerHTML = "Off";
        document.getElementById('streamOnBtn').className = "btn btn-danger";
    }
}

export function openDevDataWSConn() {
    let url = window.location.href.split("/"),
        urlParams = parseURLParams(window.location.href),
        domain = url[2].split(":"),
        devDataList = [],
        webSocket = new WebSocket("ws://" + domain[0] + ":3546" + "/devices/" + String(urlParams["mac"]));

    webSocket.onmessage = function (event) {
        let message = event.data,
            devData = JSON.parse(message);
        devDataList.push(devData);
    };
}
