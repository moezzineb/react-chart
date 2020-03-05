import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Container, Button, Row, Col } from "reactstrap";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import CanvasJSReact from "../../assets/canvasjs.react";
import { Spline } from "./Spline";
import { StepLine } from "./StepLine";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const Line = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
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

  const [activeTab, setActiveTab] = useState('1');

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

  // Handle select change
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

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
  }

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: graphTitle,
    },
    axisY: {
      title: graphY,
      includeZero: false,
      suffix: "%",
    },
    axisX: {
      title: graphX,
      prefix: "W",
      interval: 2,
    },
    data: [
      {
        type: "line",
        toolTipContent: "Week {x}: {y}%",
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
            Line
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Spline
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Step Line
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
                    Line 1
                  </Label>
                  <Input
                    type="number"
                    name="field1"
                    id="field1"
                    placeholder="One"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleNumber" onClick={changeLabels}>
                    Line 2
                  </Label>
                  <Input
                    type="number"
                    name="field2"
                    id="field2"
                    placeholder="Two"
                    onChange={handleChange}
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
          <Spline />
        </TabPane>
        <TabPane tabId="3">
          <StepLine />
        </TabPane>
      </TabContent>
    </Container>
  );
};
