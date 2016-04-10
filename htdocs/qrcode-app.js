"use strict";

var QrcodeForm = React.createClass({
    getInitialState: function () {
        return {level: 5, text: 'http://64p.org/'};
    },
    handleLevelChange: function (e) {
        this.setState({level: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.renderQr();
    },
    renderQr: function () {
        var level = parseInt(this.state.level, 10);
        var text = this.state.text;
        this.props.onFormSubmit(level, text);
    },
    componentDidMount: function () {
        this.renderQr();
    },
    render: function () {
        return <form id="QRForm" onSubmit={this.handleSubmit}>
            <div class="levelItem">
                <label for="level">Level:</label>

                <select id="level" value={this.state.level} readOnly="true" onChange={this.handleLevelChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <br />
            <textarea id="text" rows="1" cols="80" value={this.state.text} onChange={this.handleTextChange}/>
            <button type="submit">Render</button>
        </form>
    }
});

var QrcodeApp = React.createClass({
    handleFormSubmit: function (level, text) {
        var qr = this.createQr(level, text);
        var scale = 5;
        var canvas = document.getElementById('canvas');
        this.drawCanvas(qr, canvas, scale);
    },
    createQr: function (level, text) {
        var errLevel = QRErrorCorrectLevel.H,
            qr = new QRCode(level, errLevel)
            ;
        qr.addData(text);
        qr.make();
        return qr;
    },
    drawCanvas: function (qr, canvas, scale) {
        var ctx = canvas.getContext('2d'),
            canvas_x = 0,
            canvas_y = 0,
            size = qr.getModuleCount() * scale;

        ctx.clearRect(0, 0, size, size);
        $(canvas).attr('height', size).attr('width', size);

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
    },
    render: function () {
        return <div>
            <div id="canvas-container">
                <canvas id="canvas"/>
            </div>
            <QrcodeForm onFormSubmit={this.handleFormSubmit}/>
        </div>;
    }
});

ReactDOM.render(
    <QrcodeApp/>,
    document.getElementById('content')
);
