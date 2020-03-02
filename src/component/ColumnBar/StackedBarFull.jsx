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

export const StackedBarFull = (state, action) => {
  const [passData, setPassData] = useState([
    { label: "Health & Clinical Science", y: 85 },
    { label: "Education", y: 79 },
    { label: "Psyhcology", y: 77 },
    { label: "Language & Literature", y: 68 },
    { label: "Communication Tech", y: 63 },
    { label: "Art", y: 61 },
    { label: "Biomedical Science", y: 59 },
    { label: "Social Science & History", y: 49 },
    { label: "Business", y: 49 },
    { label: "Computer & Info Science", y: 18 }
  ]);

  const [passData2, setPassData2] = useState([
    { label: "Health & Clinical Science", y: 15 },
    { label: "Education", y: 21 },
    { label: "Psychology", y: 23 },
    { label: "Language & Literature", y: 32 },
    { label: "Communication Tech", y: 37 },
    { label: "Art", y: 39 },
    { label: "Biomedical Science", y: 41 },
    { label: "Social Science & History", y: 51 },
    { label: "Business", y: 51 },
    { label: "Computer & Info Science", y: 82 }
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { label: data.field1, y: parseInt(data.field2) }
      ]);
    }

    if (data.field3 != null && data.field4 != null) {
      setPassData2(passData2 => [
        ...passData2,
        { label: data.field3, y: parseInt(data.field4) }
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
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[7];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[14];
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
      text: "Popular Majors Opted by Women & Men"
    },
    toolTip: {
      shared: true
    },
    legend: {
      verticalAlign: "top"
    },
    axisY: {
      suffix: "%"
    },
    data: [
      {
        type: "stackedBar100",
        color: "#9bbb59",
        name: "Women",
        showInLegend: true,
        indexLabel: "{y}",
        indexLabelFontColor: "white",
        yValueFormatString: "#,###'%'",
        dataPoints: passData
      },
      {
        type: "stackedBar100",
        color: "#7f7f7f",
        name: "Men",
        showInLegend: true,
        indexLabel: "{y}%",
        indexLabelFontColor: "white",
        yValueFormatString: "#,###'%'",
        dataPoints: passData2
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
                Field 1st section
              </Label>
              <Input
                type="text"
                name="field1"
                id="field1"
                placeholder="Field 1st section"
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
            <hr className="my-2" />
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Field 2nd section
              </Label>
              <Input
                type="text"
                name="field3"
                id="field3"
                placeholder="Field 2nd section"
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
