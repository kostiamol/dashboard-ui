var oldObject,
    validNames = ["Fridge_001"];
    // "Forno_El_trico_Brastemp_Ative__de_Embutir___60cm___Inox_001"

global.hoverObject = function hoverObject(object) {
    if (oldObject) {
        if (oldObject.material.length) {
            oldObject.material.forEach(function (mat, i) {
                mat.color.setHex(oldObject.userData.originalColors[i]);
            });
        }
        else {
            oldObject.material.color.setHex(oldObject.userData.originalColors[0]);
        }
    }

    if (validateHoveredObject(object)) {
        oldObject = object;
        document.getElementById('root').style.cursor = "pointer";
        $('#containerTile').addClass('showTile');

        if (object.material.length) {
            return object.material.forEach(function (mat) {
                mat.color.setHex(0xfff000);
            });
        }
        return object.material.color.setHex(0xfff000);
    }

    document.getElementById('root').style.cursor = "";
    $('#containerTile').removeClass('showTile');
    
    oldObject = undefined;
}

function validateHoveredObject(object) {
    if (object instanceof THREE.Mesh && ~validNames.indexOf(object.name)) {
        return true;
    }
}

// $(document).ready(function () {
//     $("body").on("click", "a", function (event) {
//         event.preventDefault();
//         let id = $(this).attr('href'),
//             top = $(id).offset().top;
        // $('body, html').animate({ scrollTop: $('#details').offset().top }, 1500);
//     });
// });