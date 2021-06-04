import {Paper} from "@material-ui/core";
import React, {useState} from "react";
import {Container} from "@material-ui/core";
import {FormGroup} from "@material-ui/core";
import {InputLabel} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {Select} from "@material-ui/core";
import {MenuItem} from "@material-ui/core";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {Theme} from "@material-ui/core";
import {createStyles} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

export const NewItemForm = () => {
    const [item, setItem] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('item');
    const [errors, setErrors] = useState<String[]>([]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const tmpErrors: String[] = [];

        if (item.trim().length < 3) {
            tmpErrors.push('Item name must have at least 3 characters');
        }

        if (isNaN(Number(quantity))) {
            tmpErrors.push('Quantity must be a number');
        } else if (Number(quantity) <= 0) {
            tmpErrors.push('Quantity must be a positive number');
        }

        setErrors(tmpErrors);
    }

    const styles = makeStyles((theme: Theme) =>

        createStyles({
            form: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap'
            },
            field: {
                margin: "10px 20px"
            },
            unitSelect: {
                minWidth: "100px"
            }
        })
    );
    const classes = styles();

    let errorsJsx = null;
    if(errors.length > 0){
        errorsJsx = errors.map( (err: String, index: number) => <Alert key={index} severity={"error"}>{err}</Alert> )
    }



    return (
        <Paper square elevation={3}>
            <Container maxWidth={"md"}>
                {errorsJsx}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <FormGroup className={classes.field}>
                        <InputLabel>Item</InputLabel>
                        <TextField value={item} onChange={(e: any) => setItem(e.target.value)}/>
                    </FormGroup>
                    <FormGroup className={classes.field}>
                        <InputLabel>Quantity</InputLabel>
                        <TextField value={quantity} onChange={(e: any) => setQuantity(e.target.value)}/>
                    </FormGroup>
                    <FormGroup className={classes.field}>
                        <InputLabel>Unit</InputLabel>
                        <Select className={classes.unitSelect} value={unit}
                                onChange={(e: any) => setUnit(e.target.value)}>
                            <MenuItem value={"g"}>grams</MenuItem>
                            <MenuItem value={"kg"}>kilograms</MenuItem>
                            <MenuItem value={"item"}>items</MenuItem>
                        </Select>
                    </FormGroup>
                    <Button type={"submit"} variant="contained" color="primary">Add</Button>

                </form>
            </Container>
        </Paper>
    );
}
