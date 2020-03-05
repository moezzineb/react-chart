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
import { useForm } from "react-hook-form";
import jsPDF from "jspdf";
import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const StackedColumnFull = (state, action) => {
  const [graphTitle, setGraphTitle] = useState("Graph title");
  const [graphY, setGraphY] = useState("graph x");
  const [graphX, setGraphX] = useState("graph y");
  const [passData, setPassData] = useState([
    { label: "United States", y: 1118 },
    { label: "Soviet Union", y: 473 },
    { label: "Great Britain", y: 273 },
    { label: "France", y: 243 },
    { label: "Germany", y: 269 },
    { label: "Italy", y: 243 },
    { label: "Sweden", y: 195 },
    { label: "China", y: 236 },
    { label: "Russia", y: 194 },
    { label: "East Germany", y: 192 },
  ]);

  const [passData2, setPassData2] = useState([
    { label: "United States", y: 897 },
    { label: "Soviet Union", y: 376 },
    { label: "Great Britain", y: 299 },
    { label: "France", y: 272 },
    { label: "Germany", y: 272 },
    { label: "Italy", y: 212 },
    { label: "Sweden", y: 210 },
    { label: "China", y: 189 },
    { label: "Russia", y: 156 },
    { label: "East Germany", y: 165 },
  ]);

  const [passData3, setPassData3] = useState([
    { label: "United States", y: 789 },
    { label: "Soviet Union", y: 355 },
    { label: "Great Britain", y: 303 },
    { label: "France", y: 310 },
    { label: "Germany", y: 283 },
    { label: "Italy", y: 236 },
    { label: "Sweden", y: 233 },
    { label: "China", y: 174 },
    { label: "Russia", y: 187 },
    { label: "East Germany", y: 162 },
  ]);

  // useForm declaration
  const { register, handleSubmit, setValue } = useForm();

  // submit event click
  const onSubmit = data => {
    if (data.field1 != null && data.field2 != null) {
      setPassData(passData => [
        ...passData,
        { label: data.field1, y: parseInt(data.field2) },
      ]);
    }

    if (data.field3 != null && data.field4 != null) {
      setPassData2(passData2 => [
        ...passData2,
        { label: data.field3, y: parseInt(data.field4) },
      ]);
    }

    if (data.field5 != null && data.field6 != null) {
      setPassData3(passData3 => [
        ...passData3,
        { label: data.field5, y: parseInt(data.field6) },
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
    register({ name: "field5" });
    register({ name: "field6" });

    register({ name: "graphTitle" });
    register({ name: "graphY" });
    register({ name: "graphX" });
  }, [register]);

  // Initialise and add pdf export to the list
  useEffect(() => {
    document.getElementsByClassName("canvasjs-chart-credit")[4].remove();
    var toolBar = document.getElementsByClassName("canvasjs-chart-toolbar")[4];
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
      var canvas = document.getElementsByClassName("canvasjs-chart-canvas")[8];
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
  };

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

  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        "https://restcountries.eu/rest/v2/all?fields=name",
      );
      const jsonRespose = await response.json();
      setCountries(jsonRespose);
    };
    getCountries();
  }, []);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    title: {
      text: graphTitle,
    },
    axisY: {
      title: graphY,
    },
    axisX: {
      title: graphX,
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "right",
      reversed: true,
      cursor: "pointer",
      fontSize: 16,
      itemclick: toggleDataSeries,
    },
    toolTip: {
      shared: true,
    },
    data: [
      {
        type: "stackedColumn100",
        name: "Gold",
        showInLegend: true,
        color: "#D4AF37",
        dataPoints: passData,
      },
      {
        type: "stackedColumn100",
        name: "Silver",
        showInLegend: true,
        color: "#C0C0C0",
        dataPoints: passData2,
      },
      {
        type: "stackedColumn100",
        name: "Bronze",
        showInLegend: true,
        color: "#CD7F32",
        dataPoints: passData3,
      },
    ],
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
                {countries.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}
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
                {countries.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}
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
                {countries.map((item, i) => (
                  <option key={i} value={item.name}>
                    {item.name}
                  </option>
                ))}
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
    </Container>
  );
};
