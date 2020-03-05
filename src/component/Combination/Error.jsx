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
import { ErrorLine } from "./ErrorLine";
import { Pareto } from "./Pareto";
import { Combination } from "./Combination";
// End Import
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const ErrorGraph = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
  const [passData, setPassData] = useState([
    { y: 94, label: "Order Accuracy" },
    { y: 74, label: "Packaging" },
    { y: 80, label: "Quantity" },
    { y: 88, label: "Quality" },
    { y: 76, label: "Delivery" },
  ]);

  const [passData2, setPassData2] = useState([
    { y: [92, 98], label: "Order Accuracy" },
    { y: [70, 78], label: "Packaging" },
    { y: [78, 85], label: "Quantity" },
    { y: [85, 92], label: "Quality" },
    { y: [72, 78], label: "Delivery" },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { y: parseInt(data.field2), label: data.field1 },
      ]);
    }

    if (data.field1 != null && data.field3 != null && data.field4 != null) {
      let arrayData = [];
      arrayData.push(parseFloat(data.field3));
      arrayData.push(parseFloat(data.field4));
      setPassData2(passData2 => [
        ...passData2,
        { y: arrayData, label: data.field1 },
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
    register({ name: "field3" });
    register({ name: "field4" });

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
    setPassData2([]);
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
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "column",
        name: "Avg. Score",
        toolTipContent:
          '<b>{label}</b> <br> <span style="color:#4F81BC">{name}</span>: {y}',
        dataPoints: passData,
      },
      {
        type: "error",
        name: "Variability Range",
        toolTipContent:
          '<span style="color:#C0504E">{name}</span>: {y[0]} - {y[1]}',
        dataPoints: passData2,
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
            Error
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Error Line
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Pareto
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            Combination of Column, Line and Area
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
                    type="text"
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
          <ErrorLine />
        </TabPane>
        <TabPane tabId="3">
          <Pareto />
        </TabPane>
        <TabPane tabId="4">
          <Combination />
        </TabPane>
      </TabContent>
    </Container>
  );
};
