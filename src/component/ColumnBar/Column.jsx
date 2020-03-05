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
import { Bar } from "./Bar";
import { RangeColumn } from "./RangeColumn";
import { StackedColumn } from "./StackedColumn";
import { StackedColumnFull } from "./StackedColumnFull";
import { RangeBar } from "./RangeBar";
import { StackedBar } from "./StackedBar";
import { StackedBarFull } from "./StackedBarFull";
import { Waterfall } from "./Waterfall";
// End Import
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Column = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
  const [passData, setPassData] = useState([
    { label: "Apple", y: 10 },
    { label: "Orange", y: 15 },
    { label: "Banana", y: 25 },
    { label: "Mango", y: 30 },
    { label: "Grape", y: 28 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { label: data.field1, y: parseFloat(data.field2) },
      ]);
    }

    if (data.graphTitle) {
      setGraphTitle(data.graphTitle);
    }
    if (data.graphY) {
      setGraphY(data.graphY);
    }
    if (data.graphX) {
      setGraphX(data.graphX);
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

    register({ name: "graphTitle" });
    register({ name: "graphY" });
    register({ name: "graphX" });
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    document.getElementsByClassName("canvasjs-chart-credit")[0].remove();
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
  };

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
      text: graphTitle,
    },
    axisY: {
      title: graphY,
      includeZero: false,
    },
    axisX: {
      title: graphX,
      includeZero: false,
    },
    data: [
      {
        type: "column",
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
            Column
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Bar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Range Column
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            Stacked Column
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            Stacked Column 100%
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "6" })}
            onClick={() => {
              toggle("6");
            }}
          >
            Range Bar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "7" })}
            onClick={() => {
              toggle("7");
            }}
          >
            Stacked Bar
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "8" })}
            onClick={() => {
              toggle("8");
            }}
          >
            Stacked Bar 100%
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "9" })}
            onClick={() => {
              toggle("9");
            }}
          >
            Waterfall
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
                    Column 1
                  </Label>
                  <Input
                    type="text"
                    name="field1"
                    id="field1"
                    placeholder="One"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNumber" onClick={changeLabels}>
                    Column 2
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
                <hr className="my-2" />
                <FormGroup>
                  <Label for="exampleDate" onClick={changeLabels}>
                    Title
                  </Label>
                  <Input
                    type="text"
                    name="graphTitle"
                    id="graphTitle"
                    placeholder="Title"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNumber" onClick={changeLabels}>
                    Axe Y
                  </Label>
                  <Input
                    type="text"
                    name="graphY"
                    id="graphY"
                    placeholder="Axe Y"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNumber" onClick={changeLabels}>
                    Axe X
                  </Label>
                  <Input
                    type="text"
                    name="graphX"
                    id="graphX"
                    placeholder="Axe X"
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button color="primary">Submit</Button>
                <Button color="info" type="button" onClick={resetData}>
                  Reset
                </Button>
              </Form>
            </Col>
            <Col xs="6">
              <CanvasJSChart options={options} />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Bar />
        </TabPane>
        <TabPane tabId="3">
          <RangeColumn />
        </TabPane>
        <TabPane tabId="4">
          <StackedColumn />
        </TabPane>
        <TabPane tabId="5">
          <StackedColumnFull />
        </TabPane>
        <TabPane tabId="6">
          <RangeBar />
        </TabPane>
        <TabPane tabId="7">
          <StackedBar />
        </TabPane>
        <TabPane tabId="8">
          <StackedBarFull />
        </TabPane>
        <TabPane tabId="9">
          <Waterfall />
        </TabPane>
      </TabContent>
    </Container>
  );
};
