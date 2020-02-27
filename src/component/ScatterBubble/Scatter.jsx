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
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import CanvasJSReact from "../../assets/canvasjs.react";
// Import sub components
import { ScatterMakers } from "./ScatterMakers";
import { Bubble } from "./Bubble";
// End Import
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Scatter = (state, action) => {
  const [passData, setPassData] = useState([
    { x: 14.2, y: 215 },
    { x: 12.9, y: 175 },
    { x: 16.4, y: 325 },
    { x: 26.9, y: 635 },
    { x: 32.5, y: 464 },
    { x: 22.1, y: 522 },
    { x: 19.4, y: 412 },
    { x: 25.1, y: 614 },
    { x: 34.9, y: 374 },
    { x: 28.7, y: 625 },
    { x: 23.4, y: 544 },
    { x: 31.4, y: 502 },
    { x: 40.8, y: 262 },
    { x: 37.4, y: 312 },
    { x: 42.3, y: 202 },
    { x: 39.1, y: 302 },
    { x: 17.2, y: 408 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (
      data.field1 != null &&
      data.field2 != null 
    ) {
      setPassData(passData => [
        ...passData,
        { x: parseFloat(data.field1), y: parseInt(data.field2) },
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
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[0];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[0];
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
      "padding: 12px 8px; background-color: white; color: black",
    );
    resetChart.appendChild(resetChartText);

    resetChart.addEventListener("mouseover", function() {
      resetChart.setAttribute(
        "style",
        "padding: 12px 8px; background-color: #2196F3; color: white",
      );
    });
    resetChart.addEventListener("mouseout", function() {
      resetChart.setAttribute(
        "style",
        "padding: 12px 8px; background-color: white; color: black",
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

  // Handle select change
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "dark2",
    zoomEnabled: true,
    title: {
      text: "Ice Cream Sales vs Temperature",
    },
    axisX: {
      title: "Temperature (in °C)",
      suffix: "°C",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Sales",
      includeZero: false,
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    data: [
      {
        ype: "scatter",
        markerSize: 15,
        toolTipContent: "<b>Temperature: </b>{x}°C<br/><b>Sales: </b>{y}",
        dataPoints: passData,
      },
    ],
  };

  return (
    <Container>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Scatter / Point
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Scatter with Custom Markers
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Bubble
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col xs="6">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                  <Label for="exampleDate" onClick={changeLabels}>
                    Area 1
                  </Label>
                  <Input
                    type="number"
                    name="field1"
                    id="field1"
                    placeholder="One"
                    onChange={handleChange}
                    step="0.1"
                  />
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
                <Button>Submit</Button>
              </Form>
            </Col>
            <Col xs="6">
              <CanvasJSChart options={options} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <ScatterMakers />
        </TabPane>
        <TabPane tabId="3">
          <Bubble />
        </TabPane>
      </TabContent>
    </Container>
  );
};