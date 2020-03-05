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

export const Bubble = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
  const [passData, setPassData] = useState([
    { label: "Mercury", x: 36, y: 452, z: 3031 },
    { label: "Venus", x: 67.2, y: 726, z: 7521 },
    { label: "Earth", x: 93, y: 285, z: 7926 },
    { label: "Mars", x: 141.6, y: 230, z: 4222 },
    { label: "Jupiter", x: 483.6, y: 120, z: 88729 },
    { label: "Saturn", x: 886.7, y: 88, z: 74600 },
    { label: "Uranus", x: 1784.0, y: 59, z: 32600 },
    { label: "Neptune", x: 2794.4, y: 48, z: 30200 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (
      data.field1 != null &&
      data.field2 != null &&
      data.field3 != null &&
      data.field4 != null
    ) {
      setPassData(passData => [
        ...passData,
        {
          label: data.field1,
          x: parseFloat(data.field2),
          y: parseFloat(data.field3),
          z: parseFloat(data.field4),
        },
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
    register({ name: "field3" });
    register({ name: "field4" });

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
    theme: "dark2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: graphTitle,
      fontSize: 26,
    },
    axisX: {
      title: graphX,
      logarithmic: true,
    },
    axisY: {
      title: graphY,
    },
    data: [
      {
        type: "bubble",
        indexLabel: "{label}",
        toolTipContent:
          "<b>{label}</b><br>Distance From Sun: {x}mn miles<br>Avg. Surface Temp: {y} Kelvin<br>Diameter: {z} miles",
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
