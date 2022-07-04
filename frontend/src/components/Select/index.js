import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const index = ({ label, value, onChange, options, name }) => {
    return (
        <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel id={`select-${label}`}>{label}</InputLabel>
            <Select
                labelId={`select-${label}`}
                id={`select-${label}-helper`}
                value={value}
                label={label}
                onChange={onChange}
                sx={{ height: "42px" }}
                name={name}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default index;
