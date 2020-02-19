import React from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;     

export const AreaChart = (state, action) => {
	
	const options = {
		theme: "light2",
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Number of iPhones Sold"
		},
		axisY: {
			title: "Number of iPhones ( in Million )",
			includeZero: false,
		},
		data: [
			{
				type: "area",
				xValueFormatString: "YYYY",
				yValueFormatString: "#,##0.## Million",
				dataPoints: state.arrayData
			}
		]
	}
	return (
		<div>
			<h1>React Area Chart</h1>
			<CanvasJSChart options={options}
			/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
	);
}