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
import { BoxWhiskerCustom } from "./BoxWhiskerCustom";
// End Import
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const BoxWhisker = (state, action) => {
  const [passData, setPassData] = useState([
    { label: "Bread", y: [179, 256, 300, 418, 274] },
    { label: "Cake", y: [252, 346, 409, 437, 374.5] },
    { label: "Biscuit", y: [236, 281.5, 336.5, 428, 313] },
    { label: "Doughnut", y: [340, 382, 430, 452, 417] },
    { label: "Pancakes", y: [194, 224.5, 342, 384, 251] },
    { label: "Bagels", y: [241, 255, 276.5, 294, 274.5] },
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
      data.field5 != null &&
      data.field6 != null
    ) {
      let arrayData = [];
      arrayData.push(parseFloat(data.field2));
      arrayData.push(parseFloat(data.field3));
      arrayData.push(parseFloat(data.field4));
      arrayData.push(parseFloat(data.field5));
      arrayData.push(parseFloat(data.field6));
      setPassData(passData => [
        ...passData,
        { label: data.field1, y: arrayData },
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
    title: {
      text: "Energy in Baked Foods",
    },
    axisY: {
      title: "Energy Per 100 g (kcal/100g)",
      includeZero: false,
    },
    data: [
      {
        type: "boxAndWhisker",
        yValueFormatString: '#,##0.# "kcal/100g"',
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
            Box And Whisker
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Box And Whisker with Customization
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
                <FormGroup>
                  <Label for="exampleNumber" onClick={changeLabels}>
                    Area 2
                  </Label>
                  <Input
                    type="number"
                    name="field6"
                    id="field6"
                    placeholder="Six"
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
          <BoxWhiskerCustom />
        </TabPane>
      </TabContent>
    </Container>
  );
};
