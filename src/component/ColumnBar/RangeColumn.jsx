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
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const RangeColumn = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date("2017- 01- 01"), y: [19, 26] },
    { x: new Date("2017- 02- 01"), y: [19, 26] },
    { x: new Date("2017- 03- 01"), y: [18, 25] },
    { x: new Date("2017- 04- 01"), y: [15, 23] },
    { x: new Date("2017- 05- 01"), y: [12, 20] },
    { x: new Date("2017- 06- 01"), y: [10, 18] },
    { x: new Date("2017- 07- 01"), y: [8, 17] },
    { x: new Date("2017- 08- 01"), y: [9, 18] },
    { x: new Date("2017- 09- 01"), y: [12, 20] },
    { x: new Date("2017- 10- 01"), y: [14, 22] },
    { x: new Date("2017- 11- 01"), y: [16, 24] },
    { x: new Date("2017- 12- 01"), y: [18, 26] }
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null && data.field3 != null) {
      let arrayInterval = [];
      arrayInterval.push(parseInt(data.field2));
      arrayInterval.push(parseInt(data.field3));
      setPassData(passData => [
        ...passData,
        { x: new Date(data.field1), y: arrayInterval }
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
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[2];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[4];
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
      "padding: 12px 8px; background-color: white; color: black"
    );
    resetChart.appendChild(resetChartText);

    resetChart.addEventListener("mouseover", function() {
      resetChart.setAttribute(
        "style",
        "padding: 12px 8px; background-color: #2196F3; color: white"
      );
    });
    resetChart.addEventListener("mouseout", function() {
      resetChart.setAttribute(
        "style",
        "padding: 12px 8px; background-color: white; color: black"
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
    theme: "dark2",
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Monthly Average Temperature Variation in Sydney"
    },
    axisX: {
      valueFormatString: "MMM YYYY"
    },
    axisY: {
      title: "Temperature (°C)",
      suffix: " °C"
    },
    data: [
      {
        type: "rangeColumn",
        indexLabel: "{y[#index]}°",
        xValueFormatString: "MMM YYYY",
        toolTipContent:
          "<strong>{x}</strong></br> Max: {y[1]} °C<br/> Min: {y[0]} °C",
        dataPoints: passData
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
                Spline 1
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
                Spline 2
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
