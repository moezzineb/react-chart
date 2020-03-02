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

export const StackedColumn = (state, action) => {
  const [passData, setPassData] = useState([
    { label: "Jan", y: 14 },
    { label: "Feb", y: 12 },
    { label: "Mar", y: 14 },
    { label: "Apr", y: 13 },
    { label: "May", y: 13 },
    { label: "Jun", y: 13 },
    { label: "Jul", y: 14 },
    { label: "Aug", y: 14 },
    { label: "Sept", y: 13 },
    { label: "Oct", y: 14 },
    { label: "Nov", y: 14 },
    { label: "Dec", y: 14 }
  ]);

  const [passData2, setPassData2] = useState([
    { label: "Jan", y: 13 },
    { label: "Feb", y: 13 },
    { label: "Mar", y: 15 },
    { label: "Apr", y: 16 },
    { label: "May", y: 17 },
    { label: "Jun", y: 17 },
    { label: "Jul", y: 18 },
    { label: "Aug", y: 18 },
    { label: "Sept", y: 17 },
    { label: "Oct", y: 18 },
    { label: "Nov", y: 18 },
    { label: "Dec", y: 18 }
  ]);

  const [passData3, setPassData3] = useState([
    { label: "Jan", y: 13 },
    { label: "Feb", y: 13 },
    { label: "Mar", y: 15 },
    { label: "Apr", y: 15 },
    { label: "May", y: 15 },
    { label: "Jun", y: 15 },
    { label: "Jul", y: 16 },
    { label: "Aug", y: 17 },
    { label: "Sept", y: 17 },
    { label: "Oct", y: 18 },
    { label: "Nov", y: 19 },
    { label: "Dec", y: 20 }
  ]);

  const [passData4, setPassData4] = useState([
    { label: "Jan", y: 14 },
    { label: "Feb", y: 8 },
    { label: "Mar", y: 6 },
    { label: "Apr", y: 6 },
    { label: "May", y: 5 },
    { label: "Jun", y: 5 },
    { label: "Jul", y: 6 },
    { label: "Aug", y: 3 },
    { label: "Sept", y: 9 },
    { label: "Oct", y: 5 },
    { label: "Nov", y: 8 },
    { label: "Dec", y: 2 }
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

    if (data.field5 != null && data.field6 != null) {
      setPassData3(passData3 => [
        ...passData3,
        { label: data.field5, y: parseInt(data.field6) }
      ]);
    }

    if (data.field7 != null && data.field8 != null) {
      setPassData4(passData4 => [
        ...passData4,
        { label: data.field7, y: parseInt(data.field8) }
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
    register({ name: "field7" });
    register({ name: "field8" });
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[3];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[6];
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
    setPassData4([]);
  }

  // change Labels
  const changeLabels = e => {
    var label = prompt("Please enter label name", e.target.textContent);
    if (label != null) {
      e.target.textContent = label;
    }
  };

  const toggleDataSeries = e => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    // this.chart.render();
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Operating Expenses of ACME",
      fontFamily: "verdana"
    },
    axisY: {
      title: "in Eur",
      prefix: "€",
      suffix: "k"
    },
    toolTip: {
      shared: true,
      reversed: true
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      reversed: true,
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: "stackedColumn",
        name: "General",
        showInLegend: true,
        yValueFormatString: "#,###k",
        dataPoints: passData
      },
      {
        type: "stackedColumn",
        name: "Marketing",
        showInLegend: true,
        yValueFormatString: "#,###k",
        dataPoints: passData2
      },
      {
        type: "stackedColumn",
        name: "Sales",
        showInLegend: true,
        yValueFormatString: "#,###k",
        dataPoints: passData3
      },
      {
        type: "stackedColumn",
        name: "IT",
        showInLegend: true,
        yValueFormatString: "#,###k",
        dataPoints: passData4
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
                type="select"
                name="field3"
                id="field3"
                placeholder="Date 2nd section"
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
                type="select"
                name="field5"
                id="field5"
                placeholder="Date 3rd section"
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
            <hr className="my-2" />
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Date 4th section
              </Label>
              <Input
                type="select"
                name="field7"
                id="field7"
                placeholder="Date 4th section"
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
                Value 4th section
              </Label>
              <Input
                type="number"
                name="field8"
                id="field8"
                placeholder="Value 4th section"
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
