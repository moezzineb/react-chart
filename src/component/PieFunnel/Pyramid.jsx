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

export const Pyramid = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
  const [passData, setPassData] = useState([
    { label: "Impressions", y: 2850 },
    { label: "Clicked", y: 2150 },
    { label: "Free Downloads", y: 1900 },
    { label: "Purchase", y: 650 },
    { label: "Renewal", y: 250 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { label: data.field1, y: parseInt(data.field2) },
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
    document.getElementsByClassName("canvasjs-chart-credit")[5].remove();
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[5];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[10];
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
    title: {
      text: graphTitle,
    },
    axisY: {
      title: graphY
    },
    axisX: {
      title: graphX
    },
    legend: {
      horizontalAlign: "right",
      verticalAlign: "center",
      reversed: true,
    },
    data: [
      {
        type: "pyramid",
        showInLegend: true,
        legendText: "{label}",
        indexLabel: "{label} - {y}",
        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
        dataPoints: passData,
      },
    ],
  };

  var dataPoint;
  var total;
  dataPoint = options.data[0].dataPoints;
  total = dataPoint[0].y;
  for (var i = 0; i < dataPoint.length; i++) {
    if (i === 0) {
      options.data[0].dataPoints[i].percentage = 100;
    } else {
      options.data[0].dataPoints[i].percentage = (
        (dataPoint[i].y / total) *
        100
      ).toFixed(2);
    }
  }
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
                type="text"
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
