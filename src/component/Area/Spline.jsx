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

export const Spline = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
  const [passData, setPassData] = useState([
    { x: new Date(2008, 0), y: 70.735 },
    { x: new Date(2009, 0), y: 74.102 },
    { x: new Date(2010, 0), y: 72.569 },
    { x: new Date(2011, 0), y: 72.743 },
    { x: new Date(2012, 0), y: 72.381 },
    { x: new Date(2013, 0), y: 71.406 },
    { x: new Date(2014, 0), y: 73.163 },
    { x: new Date(2015, 0), y: 74.27 },
    { x: new Date(2016, 0), y: 72.525 },
    { x: new Date(2017, 0), y: 73.121 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      let date = data.field1.split("-");
      setPassData(passData => [
        ...passData,
        { x: new Date(parseInt(date[0]), 0), y: parseFloat(data.field2) },
      ]);
    }

    if (data.graphTitle) {
      setGraphTitle(data.graphTitle);
    }
    if (data.graphY) {
      setGraphY(data.graphY);
    }
    if (data.graphX) {
      setGraphX(data.graphX);
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

    register({ name: "graphTitle" });
    register({ name: "graphY" });
    register({ name: "graphX" });
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    document.getElementsByClassName("canvasjs-chart-credit")[2].remove();
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
  };

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
      text: graphTitle,
    },
    axisY: {
      title: graphY,
      includeZero: false,
      suffix: " kWh",
    },
    axisX: {
      title: graphX,
      includeZero: false,
    },
    data: [
      {
        type: "splineArea",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## bn kW⋅h",
        showInLegend: true,
        legendText: "kWh = one kilowatt hour",
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
                Area 1
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
            <hr className="my-2" />
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Title
              </Label>
              <Input
                type="text"
                name="graphTitle"
                id="graphTitle"
                placeholder="Title"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Axe Y
              </Label>
              <Input
                type="text"
                name="graphY"
                id="graphY"
                placeholder="Axe Y"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Axe X
              </Label>
              <Input
                type="text"
                name="graphX"
                id="graphX"
                placeholder="Axe X"
                onChange={handleChange}
              />
            </FormGroup>
            <Button color="primary">Submit</Button>
            <Button color="info" type="button" onClick={resetData}>
              Reset
            </Button>
          </Form>
        </Col>
        <Col xs="6">
          <CanvasJSChart options={options} />
        </Col>
      </Row>
    </Container>
  );
};
