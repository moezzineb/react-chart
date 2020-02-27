import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const ScatterMakers = (state, action) => {
  const [passData, setPassData] = useState([
    { x: 100, y: 10 },
    { x: 150, y: 15 },
    { x: 190, y: 17 },
    { x: 250, y: 19 },
    { x: 310, y: 21 },
    { x: 400, y: 25 },
    { x: 500, y: 40 },
    { x: 510, y: 50 },
    { x: 600, y: 30 },
    { x: 700, y: 35 },
    { x: 800, y: 40 },
    { x: 900, y: 45 },
    { x: 1000, y: 47 },
    { x: 1100, y: 55 },
    { x: 1230, y: 51 },
    { x: 1300, y: 60 },
    { x: 1330, y: 65 },
    { x: 1400, y: 70 },
    { x: 1450, y: 71 },
    { x: 1500, y: 69 },
  ]);

  const [passData2, setPassData2] = useState([
    { x: 100, y: 25 },
    { x: 150, y: 35 },
    { x: 190, y: 35 },
    { x: 250, y: 40 },
    { x: 310, y: 45 },
    { x: 400, y: 42 },
    { x: 500, y: 57 },
    { x: 510, y: 67 },
    { x: 600, y: 40 },
    { x: 700, y: 46 },
    { x: 800, y: 50 },
    { x: 900, y: 60 },
    { x: 1000, y: 66 },
    { x: 1100, y: 79 },
    { x: 1230, y: 60 },
    { x: 1300, y: 75 },
    { x: 1330, y: 80 },
    { x: 1400, y: 82 },
    { x: 1450, y: 88 },
    { x: 1500, y: 87 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { x: parseInt(data.field1), y: parseInt(data.field2) },
      ]);
    }

    if (data.field1 != null && data.field3 != null) {
      setPassData2(passData2 => [
        ...passData2,
        { x: parseInt(data.field1), y: parseInt(data.field3) },
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
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[1];
    // Add export PDF
    var exportCSV = document.createElement("div");
    var text = document.createTextNode("Save as PDF");
    exportCSV.setAttribute(
      "style",
      "padding: 12px 8px; background-color: white; color: black",
    );
    exportCSV.appendChild(text);

    exportCSV.addEventListener("mouseover", function() {
      exportCSV.setAttribute(
        "style",
        "padding: 12px 8px; background-color: #2196F3; color: white",
      );
    });
    exportCSV.addEventListener("mouseout", function() {
      exportCSV.setAttribute(
        "style",
        "padding: 12px 8px; background-color: white; color: black",
      );
    });
    exportCSV.addEventListener("click", function() {
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[2];
      var dataURL = canvas.toDataURL();
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      // var height = doc.internal.pageSize.getHeight();
      doc.addImage(dataURL, "JPEG", 0, 0, width, 100);
      doc.save("download.pdf");
    });
    toolBar.lastChild.appendChild(exportCSV);
    // Add reset chart
    var resetChart = document.createElement("div");
    var resetChartText = document.createTextNode("Reset");
    resetChart.setAttribute(
      "style",
      "padding: 12px 8px; background-color: white; color: black",
    );
    resetChart.appendChild(resetChartText);

    resetChart.addEventListener("mouseover", function() {
      resetChart.setAttribute(
        "style",
        "padding: 12px 8px; background-color: #2196F3; color: white",
      );
    });
    resetChart.addEventListener("mouseout", function() {
      resetChart.setAttribute(
        "style",
        "padding: 12px 8px; background-color: white; color: black",
      );
    });
    resetChart.addEventListener("click", function() {
      setPassData([]);
      setPassData2([]);
    });
    toolBar.lastChild.appendChild(resetChart);
  }, []);

  // change Labels
  const changeLabels = e => {
    var label = prompt("Please enter label name", e.target.textContent);
    if (label != null) {
      e.target.textContent = label;
    }
  };

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
    title: {
      text: "Active Users vs Server CPU Utilization",
    },
    axisX: {
      title: "Active Users",
    },
    axisY: {
      title: "CPU Utilization",
      suffix: "%",
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: [
      {
        type: "scatter",
        name: "Server 1",
        markerType: "triangle",
        showInLegend: true,
        toolTipContent:
          '<span style="color:#4F81BC ">{name}</span><br>Active Users: {x}<br>CPU Utilization: {y}%',
        dataPoints: passData,
      },
      {
        type: "scatter",
        name: "Server 2",
        showInLegend: true,
        markerType: "cross",
        toolTipContent:
          '<span style="color:#C0504E ">{name}</span><br>Active Users: {x}<br>CPU Utilization: {y}%',
        dataPoints: passData2,
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col xs="6">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Bar 1
              </Label>
              <Input
                type="number"
                name="field1"
                id="field1"
                placeholder="One"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Bar 2
              </Label>
              <Input
                type="number"
                name="field2"
                id="field2"
                placeholder="Two"
                onChange={handleChange}
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
            <Button>Submit</Button>
          </Form>
        </Col>
        <Col xs="6">
          <CanvasJSChart options={options} />
        </Col>
      </Row>
    </Container>
  );
};
