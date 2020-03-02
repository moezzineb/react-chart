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

export const Spline = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date(2017, 0), y: 25060 },
    { x: new Date(2017, 1), y: 27980 },
    { x: new Date(2017, 2), y: 42800 },
    { x: new Date(2017, 3), y: 32400 },
    { x: new Date(2017, 4), y: 35260 },
    { x: new Date(2017, 5), y: 33900 },
    { x: new Date(2017, 6), y: 40000 },
    { x: new Date(2017, 7), y: 52500 },
    { x: new Date(2017, 8), y: 32300 },
    { x: new Date(2017, 9), y: 42000 },
    { x: new Date(2017, 10), y: 37160 },
    { x: new Date(2017, 11), y: 38400 }
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      let date = data.field1.split('-');
      setPassData(passData => [
        ...passData,
        { x: new Date(parseInt(date[0]), parseInt(date[1]) - 1), y: parseInt(data.field2) }
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
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[1];
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
      text: "Monthly Sales - 2017"
    },
    axisX: {
      valueFormatString: "MMM"
    },
    axisY: {
      title: "Sales (in USD)",
      prefix: "$",
      includeZero: false
    },
    data: [
      {
        type: "spline",
        yValueFormatString: "$#,###",
        xValueFormatString: "MMMM",
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
                type="number"
                name="field2"
                id="field2"
                placeholder="Two"
                onChange={handleChange}
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
