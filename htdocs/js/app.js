document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    var levelElem = document.getElementById("level");
    var textElem = document.getElementById("text");
    var qrFormElem = document.getElementById("QRForm");
    var canvasElem = document.getElementById("canvas");

    function renderQRCode() {
        var text = textElem.value;
        var level = levelElem.value;

        var qr = new qrcode(level, 'H');
        qr.addData(text);
        qr.make();

        var scale = 5;
        var ctx = canvasElem.getContext('2d'),
            canvas_x = 0,
            canvas_y = 0,
            size = qr.getModuleCount() * scale;

        ctx.clearRect(0, 0, size, size);
        canvasElem.setAttribute("height", size);
        canvasElem.setAttribute('width', size);

        for (var r = 0; r < qr.getModuleCount(); r++) {
            for (var c = 0; c < qr.getModuleCount(); c++) {
                if (qr.isDark(r, c)) {
                    ctx.fillRect(canvas_x, canvas_y, scale, scale);
                }
                canvas_x += scale;
            }
            canvas_x = 0;
            canvas_y += scale;
        }
    }

    qrFormElem.addEventListener("submit", function (e) {
        e.stopPropagation();
        e.preventDefault();

        renderQRCode();
    }, false);

    renderQRCode();
}, false);
