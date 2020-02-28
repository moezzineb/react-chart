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

export const ErrorLine = (state, action) => {
  const [passData, setPassData] = useState([
    { y: 19, label: "Jan" },
    { y: 16, label: "Feb" },
    { y: 16, label: "Mar" },
    { y: 16, label: "Apr" },
    { y: 15, label: "May" },
    { y: 13, label: "Jun" },
    { y: 14, label: "Jul" },
    { y: 13, label: "Aug" },
    { y: 15, label: "Sep" },
    { y: 15, label: "Oct" },
    { y: 17, label: "Nov" },
    { y: 17, label: "Dec" }
  ]);

  const [passData2, setPassData2] = useState([
    { y: [18, 20], label: "Jan" },
    { y: [14, 18], label: "Feb" },
    { y: [15, 17], label: "Mar" },
    { y: [15, 17], label: "Apr" },
    { y: [14, 16], label: "May" },
    { y: [12, 14], label: "Jun" },
    { y: [13, 15], label: "Jul" },
    { y: [12, 14], label: "Aug" },
    { y: [14, 16], label: "Sep" },
    { y: [14, 16], label: "Oct" },
    { y: [16, 18], label: "Nov" },
    { y: [16, 19], label: "Dec" }
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { y: parseInt(data.field2), label: data.field1 }
      ]);
    }

    if (data.field1 != null && data.field3 != null && data.field4 != null) {
      let arrayData = [];
      arrayData.push(parseFloat(data.field3));
      arrayData.push(parseFloat(data.field4));
      setPassData2(passData2 => [
        ...passData2,
        { y: arrayData, label: data.field1 }
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
      setPassData2([]);
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
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Average Rain Days in London - 2017"
    },
    axisX: {
      interval: 1
    },
    axisY: {
      title: "Number of Days"
    },
    toolTip: {
      shared: true
    },
    data: [
      {
        type: "line",
        name: "Predicted",
        showInLegend: true,
        toolTipContent:
          '<b>{label}</b><br><span style="color:#4F81BC">{name}</span>: {y} days',
        dataPoints: passData
      },
      {
        type: "error",
        name: "Error Range",
        showInLegend: true,
        toolTipContent:
          '<span style="color:#C0504E">{name}</span>: {y[0]} - {y[1]} days',
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
                Area 1
              </Label>
              <Input
                type="select"
                name="field1"
                id="field1"
                placeholder="Date 1st section"
                onChange={handleChange}
              >
                <option value="Jan">Jan</option>
                <option value="Feb">Feb</option>
                <option value="Mar">Mar</option>
                <option value="Apr">Apr</option>
                <option value="May">May</option>
                <option value="Jun">Jun</option>
                <option value="Jul">Jul</option>
                <option value="Aug">Aug</option>
                <option value="Sept">Sept</option>
                <option value="Oct">Oct</option>
                <option value="Nov">Nov</option>
                <option value="Dec">Dec</option>
              </Input>
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