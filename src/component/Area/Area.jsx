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
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import CanvasJSReact from "../../assets/canvasjs.react";
// Import sub components
import { MultiSeries } from "./MultiSeries";
import { Spline } from "./Spline";
import { Step } from "./Step";
import { Range } from "./Range";
import { RangeSpline } from "./RangeSpline";
import { Stacked } from "./Stacked";
import { StackedFull } from "./StackedFull";
// End Import

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export const Area = (state, action) => {
  const [passData, setPassData] = useState([
    { x: new Date(2017, 0), y: 7.6 },
    { x: new Date(2016, 0), y: 7.3 },
    { x: new Date(2015, 0), y: 6.4 },
    { x: new Date(2014, 0), y: 5.3 },
    { x: new Date(2013, 0), y: 4.5 },
    { x: new Date(2012, 0), y: 3.8 },
    { x: new Date(2011, 0), y: 3.2 }
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
      text: "Number of iPhones Sold"
    },
    axisY: {
      title: "Number of iPhones ( in Million )",
      includeZero: false
    },
    data: [
      {
        type: "area",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## Million",
        dataPoints: passData
      }
    ]
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
            Area
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Multi Series Area
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            Spline Area
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            Step Area
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "5" })}
            onClick={() => {
              toggle("5");
            }}
          >
            Range Area
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "6" })}
            onClick={() => {
              toggle("6");
            }}
          >
            Range Spline
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "7" })}
            onClick={() => {
              toggle("7");
            }}
          >
            Stacked
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "8" })}
            onClick={() => {
              toggle("8");
            }}
          >
            Stacked Bar
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
          <MultiSeries />
        </TabPane>
        <TabPane tabId="3">
          <Spline />
        </TabPane>
        <TabPane tabId="4">
          <Step />
        </TabPane>
        <TabPane tabId="5">
          <Range />
        </TabPane>
        <TabPane tabId="6">
          <RangeSpline />
        </TabPane>
        <TabPane tabId="7">
          <Stacked />
        </TabPane>
        <TabPane tabId="8">
          <StackedFull />
        </TabPane>
      </TabContent>
    </Container>
  );
};
