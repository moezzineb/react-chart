import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
  Row,
  Col
} from "reactstrap";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Combination = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date(2017, 0), y: 27500 },
    { x: new Date(2017, 1), y: 29000 },
    { x: new Date(2017, 2), y: 22000 },
    { x: new Date(2017, 3), y: 26500 },
    { x: new Date(2017, 4), y: 33000 },
    { x: new Date(2017, 5), y: 37000 },
    { x: new Date(2017, 6), y: 32000 },
    { x: new Date(2017, 7), y: 27500 },
    { x: new Date(2017, 8), y: 29500 },
    { x: new Date(2017, 9), y: 43000 },
    { x: new Date(2017, 10), y: 55000, indexLabel: "High Renewals" },
    { x: new Date(2017, 11), y: 39500 }
  ]);

  const [passData2, setPassData2] = useState([
    { x: new Date(2017, 0), y: 38000 },
    { x: new Date(2017, 1), y: 39000 },
    { x: new Date(2017, 2), y: 35000 },
    { x: new Date(2017, 3), y: 37000 },
    { x: new Date(2017, 4), y: 42000 },
    { x: new Date(2017, 5), y: 48000 },
    { x: new Date(2017, 6), y: 41000 },
    { x: new Date(2017, 7), y: 38000 },
    { x: new Date(2017, 8), y: 42000 },
    { x: new Date(2017, 9), y: 45000 },
    { x: new Date(2017, 10), y: 48000 },
    { x: new Date(2017, 11), y: 47000 }
  ]);

  const [passData3, setPassData3] = useState([
    { x: new Date(2017, 0), y: 11500 },
    { x: new Date(2017, 1), y: 10500 },
    { x: new Date(2017, 2), y: 9000 },
    { x: new Date(2017, 3), y: 13500 },
    { x: new Date(2017, 4), y: 13890 },
    { x: new Date(2017, 5), y: 18500 },
    { x: new Date(2017, 6), y: 16000 },
    { x: new Date(2017, 7), y: 14500 },
    { x: new Date(2017, 8), y: 15880 },
    { x: new Date(2017, 9), y: 24000 },
    { x: new Date(2017, 10), y: 31000 },
    { x: new Date(2017, 11), y: 19000 }
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
    let date = data.field1.split("-");
      setPassData(passData => [
        ...passData,
        { x: new Date(date[0], date[1]), y: parseInt(data.field2) }
      ]);
    }

    if (data.field1 != null && data.field3 != null) {
      let date = data.field1.split("-");
      setPassData2(passData2 => [
        ...passData2,
        { x: new Date(date[0], date[1]), y: parseInt(data.field3) }
      ]);
    }

    if (data.field1 != null && data.field4 != null) {
      let date = data.field1.split("-");
      setPassData3(passData3 => [
        ...passData3,
        { x: new Date(date[0], date[1]), y: parseInt(data.field4) }
      ]);
    }
  };

  // Handle input changes
  const handleChange = e => {
    setValue(e.target.name, e.target.value);
  };

  // Get form data
  useEffect(() => {
    register({ name: "field1" });
    register({ name: "field2" });
    register({ name: "field3" });
    register({ name: "field4" });
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[3];
    // Add export PDF
    var exportCSV = document.createElement("div");
    var text = document.createTextNode("Save as PDF");
    exportCSV.setAttribute(
      "style",
      "padding: 12px 8px; background-color: white; color: black"
    );
    exportCSV.appendChild(text);

    exportCSV.addEventListener("mouseover", function() {
      exportCSV.setAttribute(
        "style",
        "padding: 12px 8px; background-color: #2196F3; color: white"
      );
    });
    exportCSV.addEventListener("mouseout", function() {
      exportCSV.setAttribute(
        "style",
        "padding: 12px 8px; background-color: white; color: black"
      );
    });
    exportCSV.addEventListener("click", function() {
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[6];
      var dataURL = canvas.toDataURL();
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      // var height = doc.internal.pageSize.getHeight();
      doc.addImage(dataURL, "JPEG", 0, 0, width, 100);
      doc.save("download.pdf");
    });
    toolBar.lastChild.appendChild(exportCSV);
  }, []);

  // Reset event
  const resetData = () => {
    setPassData([]);
    setPassData2([]);
    setPassData3([]);
  }

  // change Labels
  const changeLabels = e => {
    var label = prompt("Please enter label name", e.target.textContent);
    if (label != null) {
      e.target.textContent = label;
    }
  };

    const addSymbols = e => {
		var suffixes = ["", "K", "M", "B"];
		var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
		if (order > suffixes.length - 1)
			order = suffixes.length - 1;
		var suffix = suffixes[order];
		return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
	}
	const toggleDataSeries = e => {
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    colorSet: "colorSet2",
    title: {
      text: "Monthly Sales"
    },
    axisX: {
      valueFormatString: "MMMM"
    },
    axisY: {
      prefix: "$",
      labelFormatter: addSymbols
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
      verticalAlign: "top"
    },
    data: [
      {
        type: "column",
        name: "Actual Sales",
        showInLegend: true,
        xValueFormatString: "MMMM YYYY",
        yValueFormatString: "$#,##0",
        dataPoints: passData
      },
      {
        type: "line",
        name: "Expected Sales",
        showInLegend: true,
        yValueFormatString: "$#,##0",
        dataPoints: passData2
      },
      {
        type: "area",
        name: "Profit",
        markerBorderColor: "white",
        markerBorderThickness: 2,
        showInLegend: true,
        yValueFormatString: "$#,##0",
        dataPoints: passData3
      }
    ]
  };

  return (
    <Container>
      <Row>
        <Col xs="6">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Area 1
              </Label>
              <Input
                type="date"
                name="field1"
                id="field1"
                placeholder="Date 1st section"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Area 2
              </Label>
              <Input
                type="number"
                name="field2"
                id="field2"
                placeholder="Two"
                onChange={handleChange}
                step="0.1"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Area 3
              </Label>
              <Input
                type="number"
                name="field3"
                id="field3"
                placeholder="Three"
                onChange={handleChange}
                step="0.1"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Area 4
              </Label>
              <Input
                type="number"
                name="field4"
                id="field4"
                placeholder="Four"
                onChange={handleChange}
                step="0.1"
              />
            </FormGroup>
            <Button color="primary">Submit</Button>
            <Button color="info" type='button' onClick={resetData}>Reset</Button>
          </Form>
        </Col>
        <Col xs="6">
          <CanvasJSChart options={options} />
        </Col>
      </Row>
    </Container>
  );
};
