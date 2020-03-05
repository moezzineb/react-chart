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

export const MultiSeries = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
  const [passData, setPassData] = useState([
    { x: new Date("2017- 01- 01"), y: 84.927 },
    { x: new Date("2017- 02- 01"), y: 82.609 },
    { x: new Date("2017- 03- 01"), y: 81.428 },
    { x: new Date("2017- 04- 01"), y: 83.259 },
    { x: new Date("2017- 05- 01"), y: 83.153 },
    { x: new Date("2017- 06- 01"), y: 84.18 },
    { x: new Date("2017- 07- 01"), y: 84.84 },
    { x: new Date("2017- 08- 01"), y: 82.671 },
    { x: new Date("2017- 09- 01"), y: 87.496 },
    { x: new Date("2017- 10- 01"), y: 86.007 },
    { x: new Date("2017- 11- 01"), y: 87.233 },
    { x: new Date("2017- 12- 01"), y: 86.276 },
  ]);

  const [passData2, setPassData2] = useState([
    { x: new Date("2017- 01- 01"), y: 67.515 },
    { x: new Date("2017- 02- 01"), y: 66.725 },
    { x: new Date("2017- 03- 01"), y: 64.86 },
    { x: new Date("2017- 04- 01"), y: 64.29 },
    { x: new Date("2017- 05- 01"), y: 64.51 },
    { x: new Date("2017- 06- 01"), y: 64.62 },
    { x: new Date("2017- 07- 01"), y: 64.2 },
    { x: new Date("2017- 08- 01"), y: 63.935 },
    { x: new Date("2017- 09- 01"), y: 65.31 },
    { x: new Date("2017- 10- 01"), y: 64.75 },
    { x: new Date("2017- 11- 01"), y: 64.49 },
    { x: new Date("2017- 12- 01"), y: 63.84 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { x: new Date(data.field1), y: parseFloat(data.field2) },
      ]);
    }

    if (data.field3 != null && data.field4 != null) {
      setPassData2(passData2 => [
        ...passData2,
        { x: new Date(data.field3), y: parseFloat(data.field4) },
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
    document.getElementsByClassName("canvasjs-chart-credit")[1].remove();
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
  }, []);

  // Reset event
  const resetData = () => {
    setPassData([]);
    setPassData2([]);
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
    },
    axisX: {
      title: graphX,
      includeZero: false,
      prefix: "₹",
    },
    subtitles: [
      {
        text: "GBP & USD to INR",
      },
    ],
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "area",
        name: "GBP",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "₹#,##0.##",
        dataPoints: passData,
      },
      {
        type: "area",
        name: "USD",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "₹#,##0.##",
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
                Date 1st section
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
                Value 1st section
              </Label>
              <Input
                type="number"
                name="field2"
                id="field2"
                placeholder="Value 1st section"
                onChange={handleChange}
                step="0.1"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Date 2nd section
              </Label>
              <Input
                type="date"
                name="field3"
                id="field3"
                placeholder="Date 2nd section"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Value 2nd section
              </Label>
              <Input
                type="number"
                name="field4"
                id="field4"
                placeholder="Value 2nd section"
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
