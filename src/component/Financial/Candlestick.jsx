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
import { CandlestickJSON } from "./CandlestickJSON";
import { OHLC } from "./OHLC";
// End Import
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Candlestick = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date("2017-01-01"), y: [36.61, 38.45, 36.19, 36.82] },
    { x: new Date("2017-02-01"), y: [36.82, 36.95, 34.84, 36.2] },
    { x: new Date("2017-03-01"), y: [35.85, 36.3, 34.66, 36.07] },
    { x: new Date("2017-04-01"), y: [36.19, 37.5, 35.21, 36.15] },
    { x: new Date("2017-05-01"), y: [36.11, 37.17, 35.02, 36.11] },
    { x: new Date("2017-06-01"), y: [36.12, 36.57, 33.34, 33.74] },
    { x: new Date("2017-07-01"), y: [33.51, 35.86, 33.23, 35.47] },
    { x: new Date("2017-08-01"), y: [35.66, 36.7, 34.38, 35.07] },
    { x: new Date("2017-09-01"), y: [35.24, 38.15, 34.93, 38.08] },
    { x: new Date("2017-10-01"), y: [38.12, 45.8, 38.08, 45.49] },
    { x: new Date("2017-11-01"), y: [45.97, 47.3, 43.77, 44.84] },
    { x: new Date("2017-12-01"), y: [44.73, 47.64, 42.67, 46.16] },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (
      data.field1 != null &&
      data.field2 != null &&
      data.field3 != null &&
      data.field4 != null &&
      data.field5 != null
    ) {
      let arrayInterval = [];
      arrayInterval.push(parseInt(data.field2));
      arrayInterval.push(parseInt(data.field3));
      arrayInterval.push(parseInt(data.field4));
      arrayInterval.push(parseInt(data.field5));
      setPassData(passData => [
        ...passData,
        { x: new Date(data.field1), y: arrayInterval },
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

  // Handle select change
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: "Intel Corporation Stock Price -  2017",
    },
    axisX: {
      valueFormatString: "MMM",
    },
    axisY: {
      includeZero: false,
      prefix: "$",
      title: "Price (in USD)",
    },
    data: [
      {
        type: "candlestick",
        showInLegend: true,
        name: "Intel Corporation",
        yValueFormatString: "$###0.00",
        xValueFormatString: "MMMM YY",
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
            Candlestick
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            CandlestickJSON
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            OHLC
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
                    type="date"
                    name="field1"
                    id="field1"
                    placeholder="One"
                    onChange={handleChange}
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
                <FormGroup>
                  <Label for="exampleNumber" onClick={changeLabels}>
                    Area 5
                  </Label>
                  <Input
                    type="number"
                    name="field5"
                    id="field5"
                    placeholder="Five"
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
        </TabPane>
        <TabPane tabId="2">
          <CandlestickJSON />
        </TabPane>
        <TabPane tabId="3">
          <OHLC />
        </TabPane>
      </TabContent>
    </Container>
  );
};
