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

export const StackedBar = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date(2018, 5, 25), y: 56 },
    { x: new Date(2018, 5, 26), y: 45 },
    { x: new Date(2018, 5, 27), y: 71 },
    { x: new Date(2018, 5, 28), y: 41 },
    { x: new Date(2018, 5, 29), y: 60 },
    { x: new Date(2018, 5, 30), y: 75 },
    { x: new Date(2018, 6, 1), y: 98 }
  ]);

  const [passData2, setPassData2] = useState([
    { x: new Date(2018, 5, 25), y: 86 },
    { x: new Date(2018, 5, 26), y: 95 },
    { x: new Date(2018, 5, 27), y: 71 },
    { x: new Date(2018, 5, 28), y: 58 },
    { x: new Date(2018, 5, 29), y: 60 },
    { x: new Date(2018, 5, 30), y: 65 },
    { x: new Date(2018, 6, 1), y: 89 }
  ]);

  const [passData3, setPassData3] = useState([
    { x: new Date(2018, 5, 25), y: 48 },
    { x: new Date(2018, 5, 26), y: 45 },
    { x: new Date(2018, 5, 27), y: 41 },
    { x: new Date(2018, 5, 28), y: 55 },
    { x: new Date(2018, 5, 29), y: 80 },
    { x: new Date(2018, 5, 30), y: 85 },
    { x: new Date(2018, 6, 1), y: 83 }
  ]);

  const [passData4, setPassData4] = useState([
    { x: new Date(2018, 5, 25), y: 61 },
    { x: new Date(2018, 5, 26), y: 55 },
    { x: new Date(2018, 5, 27), y: 61 },
    { x: new Date(2018, 5, 28), y: 75 },
    { x: new Date(2018, 5, 29), y: 80 },
    { x: new Date(2018, 5, 30), y: 85 },
    { x: new Date(2018, 6, 1), y: 105 }
  ]);

  const [passData5, setPassData5] = useState([
    { x: new Date(2018, 5, 25), y: 52 },
    { x: new Date(2018, 5, 26), y: 55 },
    { x: new Date(2018, 5, 27), y: 20 },
    { x: new Date(2018, 5, 28), y: 35 },
    { x: new Date(2018, 5, 29), y: 30 },
    { x: new Date(2018, 5, 30), y: 45 },
    { x: new Date(2018, 6, 1), y: 25 }
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      let date = data.field1.split("-");
      setPassData(passData => [
        ...passData,
        {
          x: new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])),
          y: parseFloat(data.field2)
        }
      ]);
    }

    if (data.field3 != null && data.field4 != null) {
      let date = data.field3.split("-");
      setPassData2(passData2 => [
        ...passData2,
        {
          x: new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])),
          y: parseFloat(data.field4)
        }
      ]);
    }

    if (data.field5 != null && data.field6 != null) {
      let date = data.field5.split("-");
      setPassData3(passData3 => [
        ...passData3,
        {
          x: new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])),
          y: parseFloat(data.field6)
        }
      ]);
    }

    if (data.field7 != null && data.field8 != null) {
      let date = data.field7.split("-");
      setPassData4(passData4 => [
        ...passData4,
        {
          x: new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])),
          y: parseFloat(data.field8)
        }
      ]);
    }

    if (data.field9 != null && data.field10 != null) {
      let date = data.field9.split("-");
      setPassData5(passData5 => [
        ...passData5,
        {
          x: new Date(parseInt(date[0]), parseInt(date[1]), parseInt(date[2])),
          y: parseFloat(data.field10)
        }
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
    register({ name: "field9" });
    register({ name: "field10" });
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[6];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[12];
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
    setPassData5([]);
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
      text: "Evening Sales in a Restaurant"
    },
    axisX: {
      valueFormatString: "DDD"
    },
    axisY: {
      prefix: "$"
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: "stackedBar",
        name: "Meals",
        showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: passData
      },
      {
        type: "stackedBar",
        name: "Snacks",
        showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: passData2
      },
      {
        type: "stackedBar",
        name: "Drinks",
        showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: passData3
      },
      {
        type: "stackedBar",
        name: "Dessert",
        showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: passData4
      },
      {
        type: "stackedBar",
        name: "Takeaway",
        showInLegend: "true",
        xValueFormatString: "DD, MMM",
        yValueFormatString: "$#,##0",
        dataPoints: passData5
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
            <hr className="my-2" />
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Date 4th section
              </Label>
              <Input
                type="date"
                name="field7"
                id="field7"
                placeholder="Date 4th section"
                onChange={handleChange}
              />
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
            <hr className="my-2" />
            <FormGroup>
              <Label for="exampleDate" onClick={changeLabels}>
                Date 5th section
              </Label>
              <Input
                type="date"
                name="field9"
                id="field9"
                placeholder="Date 5th section"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber" onClick={changeLabels}>
                Value 5th section
              </Label>
              <Input
                type="number"
                name="field10"
                id="field10"
                placeholder="Value 5th section"
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
