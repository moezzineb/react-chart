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

export const StackedFull = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date(2000, 0), y: 40 },
    { x: new Date(2001, 0), y: 62 },
    { x: new Date(2002, 0), y: 53 },
    { x: new Date(2003, 0), y: 49 },
    { x: new Date(2004, 0), y: 52 },
    { x: new Date(2005, 0), y: 32 },
    { x: new Date(2006, 0), y: 28 },
    { x: new Date(2007, 0), y: 46 },
    { x: new Date(2008, 0), y: 55 },
    { x: new Date(2009, 0), y: 88 },
    { x: new Date(2010, 0), y: 68 },
    { x: new Date(2011, 0), y: 63 },
    { x: new Date(2012, 0), y: 65 },
    { x: new Date(2013, 0), y: 68 },
    { x: new Date(2014, 0), y: 48 },
    { x: new Date(2015, 0), y: 39 },
    { x: new Date(2016, 0), y: 20 },
    { x: new Date(2017, 0), y: 26 }
  ]);

  const [passData2, setPassData2] = useState([
    { x: new Date(2000, 0), y: 20 },
    { x: new Date(2001, 0), y: 12 },
    { x: new Date(2002, 0), y: 19 },
    { x: new Date(2003, 0), y: 28 },
    { x: new Date(2004, 0), y: 42 },
    { x: new Date(2005, 0), y: 75 },
    { x: new Date(2006, 0), y: 85 },
    { x: new Date(2007, 0), y: 55 },
    { x: new Date(2008, 0), y: 45 },
    { x: new Date(2009, 0), y: 38 },
    { x: new Date(2010, 0), y: 29 },
    { x: new Date(2011, 0), y: 19 },
    { x: new Date(2012, 0), y: 14 },
    { x: new Date(2013, 0), y: 18 },
    { x: new Date(2014, 0), y: 16 },
    { x: new Date(2015, 0), y: 13 },
    { x: new Date(2016, 0), y: 10 },
    { x: new Date(2017, 0), y: 14 }
  ]);

  const [passData3, setPassData3] = useState([
    { x: new Date(2000, 0), y: 0 },
    { x: new Date(2001, 0), y: 6 },
    { x: new Date(2002, 0), y: 8 },
    { x: new Date(2003, 0), y: 10 },
    { x: new Date(2004, 0), y: 12 },
    { x: new Date(2005, 0), y: 15 },
    { x: new Date(2006, 0), y: 17 },
    { x: new Date(2007, 0), y: 18 },
    { x: new Date(2008, 0), y: 25 },
    { x: new Date(2009, 0), y: 18 },
    { x: new Date(2010, 0), y: 24 },
    { x: new Date(2011, 0), y: 29 },
    { x: new Date(2012, 0), y: 31 },
    { x: new Date(2013, 0), y: 52 },
    { x: new Date(2014, 0), y: 72 },
    { x: new Date(2015, 0), y: 63 },
    { x: new Date(2016, 0), y: 20 },
    { x: new Date(2017, 0), y: 18 }
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      let date = data.field1.split("-");
      setPassData(passData => [
        ...passData,
        { x: new Date(parseInt(date[0]), 0), y: parseFloat(data.field2) }
      ]);
    }

    if (data.field3 != null && data.field4 != null) {
      let date = data.field3.split("-");
      setPassData2(passData2 => [
        ...passData2,
        { x: new Date(parseInt(date[0]), 0), y: parseFloat(data.field4) }
      ]);
    }

    if (data.field5 != null && data.field6 != null) {
      let date = data.field5.split("-");
      setPassData3(passData3 => [
        ...passData3,
        { x: new Date(parseInt(date[0]), 0), y: parseFloat(data.field6) }
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
    register({ name: "field6" });
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
    setPassData3([]);
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
      text: "Global Sales"
    },
    axisY: {
      title: "Sales",
      suffix: "%"
    },
    toolTip: {
      shared: true,
      reversed: true
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      reversed: true
    },
    data: [
      {
        type: "stackedArea100",
        name: "US",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: passData
      },
      {
        type: "stackedArea100",
        name: "France",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: passData2
      },
      {
        type: "stackedArea100",
        name: "UK",
        showInLegend: true,
        xValueFormatString: "YYYY",
        dataPoints: passData3
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
            <hr className="my-2" />
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
                Date 3rd section
              </Label>
              <Input
                type="date"
                name="field5"
                id="field5"
                placeholder="Date 3rd section"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Value 3rd section
              </Label>
              <Input
                type="number"
                name="field6"
                id="field6"
                placeholder="Value 3rd section"
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
