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

export const CandlestickJSON = (state, action) => {
  const [passData, setPassData] = useState([
    {
      x: 1512066600000,
      y: [83.6, 84.81, 83.22, 84.26],
    },
    {
      x: 1512325800000,
      y: [84.42, 84.43, 80.7, 81.08],
    },
    {
      x: 1512412200000,
      y: [81.34, 82.68, 80.98, 81.59],
    },
    {
      x: 1512498600000,
      y: [81.55, 83.14, 81.43, 82.78],
    },
    {
      x: 1512585000000,
      y: [82.54, 82.8, 82, 82.49],
    },
    {
      x: 1512671400000,
      y: [83.63, 84.58, 83.33, 84.16],
    },
    {
      x: 1512930600000,
      y: [84.29, 85.37, 84.12, 85.23],
    },
    {
      x: 1513017000000,
      y: [85.31, 86.05, 85.08, 85.58],
    },
    {
      x: 1513103400000,
      y: [85.74, 86, 85.17, 85.35],
    },
    {
      x: 1513189800000,
      y: [85.43, 85.87, 84.53, 84.69],
    },
    {
      x: 1513276200000,
      y: [85.26, 87.09, 84.88, 86.85],
    },
    {
      x: 1513535400000,
      y: [87.12, 87.5, 86.23, 86.38],
    },
    {
      x: 1513621800000,
      y: [86.35, 86.35, 85.27, 85.83],
    },
    {
      x: 1513708200000,
      y: [86.2, 86.3, 84.71, 85.52],
    },
    {
      x: 1513794600000,
      y: [86.05, 86.1, 85.4, 85.5],
    },
    {
      x: 1513881000000,
      y: [85.4, 85.63, 84.92, 85.51],
    },
    {
      x: 1514226600000,
      y: [85.31, 85.53, 85.03, 85.4],
    },
    {
      x: 1514313000000,
      y: [85.65, 85.98, 85.22, 85.71],
    },
    {
      x: 1514399400000,
      y: [85.9, 85.93, 85.55, 85.72],
    },
    {
      x: 1514485800000,
      y: [85.63, 86.05, 85.5, 85.54],
    },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (
      data.field1 != null &&
      data.field2 != null &&
      data.field3 != null &&
      data.field4 != null &&
      data.field5 != null
    ) {
        let date = new Date(data.field1).getTime();
        let arrayInterval = [];
        arrayInterval.push(parseFloat(data.field2));
        arrayInterval.push(parseFloat(data.field3));
        arrayInterval.push(parseFloat(data.field4));
        arrayInterval.push(parseFloat(data.field5));
        setPassData(passData => [
        ...passData,
        { x: date, y: arrayInterval },
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
    register({ name: "field5" });
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

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Microsoft Corporation Stock Price - December 2017",
    },
    axisX: {
      valueFormatString: "D MMM",
    },
    axisY: {
      title: "Price",
      includeZero: false,
      prefix: "$",
    },
    data: [
      {
        type: "candlestick",
        name: "Microsoft Corporation Price",
        showInLegend: true,
        yValueFormatString: "$##0.00",
        xValueType: "dateTime",
        dataPoints: passData,
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
                type="date"
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
                type="text"
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
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Area 5
              </Label>
              <Input
                type="number"
                name="field5"
                id="field5"
                placeholder="Five"
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
