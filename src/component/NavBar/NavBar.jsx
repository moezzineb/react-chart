import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { BrowserRouter as Link } from "react-router-dom";

export const HeaderMenu = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Charts</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Categories
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem><Link to="/Line">Line</Link></DropdownItem>
                <DropdownItem><Link to="/Area">Area</Link></DropdownItem>
                <DropdownItem><Link to="/ColumnBar">Column & Bar</Link></DropdownItem>
                <DropdownItem><Link to="/PieFunnel">Pie & Funnel</Link></DropdownItem>
                <DropdownItem><Link to="/Financial">Financial</Link></DropdownItem>
                <DropdownItem><Link to="/ScatterBubble">Scatter & Bubble</Link></DropdownItem>
                <DropdownItem><Link to="/BoxWhisker">Box & Whisker</Link></DropdownItem>
                <DropdownItem><Link to="/CombinationCharts">Combination of Charts</Link></DropdownItem>
                <DropdownItem><Link to="/Dynamic">Dynamic</Link></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
