import React, { Component } from "react";
import CanvasJSReact from "../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export class CanvasChart extends Component {    
    render() {
        const options = {
            animationEnabled: true,
			exportEnabled: true,
            title: {
                text: "Dynamic Line Chart"
            },
            data: [
                {
                    type: this.props.typeChart,
                    dataPoints: this.props.arrayData
                }
            ]
        };
        return (
            <div>
                <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
