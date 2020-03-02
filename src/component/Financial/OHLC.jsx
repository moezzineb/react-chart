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

export const OHLC = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date("2017-01-01"), y: [22.6, 23.55, 22.01, 22.64] },
    { x: new Date("2017-02-01"), y: [22.97, 24.95, 22.45, 24.68] },
    { x: new Date("2017-03-01"), y: [25.37, 25.8, 22.16, 23.59] },
    { x: new Date("2017-04-01"), y: [23.65, 24.35, 22.26, 23.34] },
    { x: new Date("2017-05-01"), y: [23.52, 24.31, 22.09, 22.41] },
    { x: new Date("2017-06-01"), y: [22.48, 24.67, 22.07, 24.26] },
    { x: new Date("2017-07-01"), y: [24.46, 25.11, 23.61, 24.12] },
    { x: new Date("2017-08-01"), y: [24.29, 25.35, 23.12, 23.89] },
    { x: new Date("2017-09-01"), y: [23.9, 25.64, 22.75, 25.34] },
    { x: new Date("2017-10-01"), y: [25.46, 27.98, 25.12, 27.39] },
    { x: new Date("2017-11-01"), y: [27.64, 28.72, 25.81, 28.17] },
    { x: new Date("2017-12-01"), y: [28.25, 30.03, 27.5, 29.52] }
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
      let arrayInterval = [];
      arrayInterval.push(parseFloat(data.field2));
      arrayInterval.push(parseFloat(data.field3));
      arrayInterval.push(parseFloat(data.field4));
      arrayInterval.push(parseFloat(data.field5));
      setPassData(passData => [
        ...passData,
        { x: new Date(data.field1), y: arrayInterval },
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
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[2];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[4];
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
  }

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
    exportFileName: "Bank-of-America-Corporation-StockChart",
    title: {
      text: "Bank of America Corporation - 2017",
    },
    axisX: {
      interval: 1,
      intervalType: "month",
      valueFormatString: "MMM",
    },
    axisY: {
      includeZero: false,
      prefix: "$",
      title: "Price (in USD)",
    },
    data: [
      {
        type: "ohlc",
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMM YYYY",
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
