import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Container, Button } from "reactstrap";
import { useForm } from "react-hook-form";
import { Test } from "./Test";

export const Formx = (state, action) => {
    
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

    // useForm declaration
    const { register, handleSubmit, setValue } = useForm();

    // submit event click
    const onSubmit = data => {
        if (data.date != null && data.number != null) {
            // let finalDate = parseInt(data.date.split("-")[0]);
            // setPassData([...passData, { x: new Date(finalDate, 0), y: data.number }]);
            setPassData(passData => [
              ...passData,
              { x: data.field1, y: data.field2 }
            ]);
            console.log(passData);
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

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="exampleDate">Data 1</Label>
                    <Input
                        type="number"
                        name="field1"
                        id="field1"
                        placeholder="One"
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleNumber">Data 2</Label>
                    <Input
                        type="number"
                        name="field2"
                        id="field2"
                        placeholder="Two"
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button>Submit</Button>
            </Form>
            <Test arrayData={passData}/>
        </Container>
    );
};
