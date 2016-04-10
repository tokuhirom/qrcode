import React from "react";
import ReactDOM from "react-dom";
import QRCode from "qrcode-generator";

class QrcodeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {level: 5, text: 'http://64p.org/'};
    }

    handleLevelChange(e) {
        this.setState({level: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.renderQr();
    }

    renderQr() {
        let level = parseInt(this.state.level, 10);
        let text = this.state.text;
        this.props.onFormSubmit(level, text);
    }

    componentDidMount() {
        this.renderQr();
    }

    render() {
        return <form id="QRForm" onSubmit={this.handleSubmit.bind(this)}>
            <div class="levelItem">
                <label for="level">Level:</label>

                <select id="level" value={this.state.level} readOnly="true"
                        onChange={this.handleLevelChange.bind(this)}>
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
            <textarea id="text" rows="1" cols="80" value={this.state.text} onChange={this.handleTextChange.bind(this)}/>
            <button type="submit">Render</button>
        </form>;
    }
}

class QrcodeApp extends React.Component {
    constructor(props) {
        super(props);
    }

    handleFormSubmit(level, text) {
        let qr = this.createQr(level, text);
        let scale = 5;
        let canvas = document.getElementById('canvas');
        this.drawCanvas(qr, canvas, scale);
    }

    createQr(level, text) {
        let qr = new QRCode(level, 'H');
        qr.addData(text);
        qr.make();
        return qr;
    }

    drawCanvas(qr, canvas, scale) {
        let ctx = canvas.getContext('2d'),
            canvas_x = 0,
            canvas_y = 0,
            size = qr.getModuleCount() * scale;

        ctx.clearRect(0, 0, size, size);
        canvas.setAttribute("height", size);
        canvas.setAttribute('width', size);

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

    render() {
        return <div>
            <div id="canvas-container">
                <canvas id="canvas"/>
            </div>
            <QrcodeForm onFormSubmit={this.handleFormSubmit.bind(this)}/>
        </div>;
    }
}

ReactDOM.render(
    <QrcodeApp/>,
    document.getElementById('content')
);
