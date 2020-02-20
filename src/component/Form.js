import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { CanvasChart } from "./CanvasChart";
import jsPDF from "jspdf";

export const Formx = (state, action) => {
  const [passData, setPassData] = useState([
    { x: 1, y: 10 },
    { x: 2, y: 13 },
    { x: 3, y: 18 },
    { x: 4, y: 20 },
    { x: 5, y: 17 },
    { x: 6, y: 10 },
    { x: 7, y: 13 },
    { x: 8, y: 18 },
    { x: 9, y: 20 },
    { x: 10, y: 17 }
  ]);

  const [type, setType] = useState('line');

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { x: parseInt(data.field1), y: parseInt(data.field2) }
      ]);
    }
  };

  // Handle input changes
  const handleChange = e => {
    setValue(e.target.name, e.target.value);
  };

  // Handle select change
  const handleSelectChange = e => {
      setType(e.target.value)
  }

  // Get form data
  useEffect(() => {
    register({ name: "field1" });
    register({ name: "field2" });
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[0];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[0];
      var dataURL = canvas.toDataURL();
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.getWidth();
      // var height = doc.internal.pageSize.getHeight();
      doc.addImage(dataURL, "JPEG", 0, 0, width, 100);
      doc.save("download.pdf");
    });
    toolBar.lastChild.appendChild(exportCSV);
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="exampleDate">Data 1</Label>
          <Input
            type="number"
            name="field1"
            id="field1"
            placeholder="One"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleNumber">Data 2</Label>
          <Input
            type="number"
            name="field2"
            id="field2"
            placeholder="Two"
            onChange={handleChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <FormGroup>
        <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect" onChange={handleSelectChange}>
          <option value="line">Line1</option>
          <option value="spline">Spline</option>
          <option value="stepLine">StepLine</option>
          <option value="area">Area</option>
          {/* <option value="005x">5</option> */}
        </Input>
      </FormGroup>
      <CanvasChart arrayData={passData} typeChart={type}/>
    </Container>
  );
};
