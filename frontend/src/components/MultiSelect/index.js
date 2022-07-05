import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MDTypography from "components/MDTypography";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 300,
            overflow: "hidden",
        },
    },
};

const matchIdToClassName = (originalList, id) => {
    return originalList.filter((x) => x._id === id && x)[0];
};

export default function MultipleSelect({
    options,
    selected,
    handleChange,
    label,
    originalList,
}) {
    const renderValue = () => {
        const items = [];
        for (let item of selected) {
            const cls = matchIdToClassName(originalList, item);
            items.push(`${cls.className} by ${cls.teacher.name}`);
        }
        return items.join(", ");
    };
    const renderClassName = (originalList, item) => {
        const cls = matchIdToClassName(originalList, item);
        return `${cls.className} by ${cls.teacher.name}`;
    };
    return (
        <FormControl sx={{ minWidth: "100%" }}>
            <InputLabel id={`multiple-checkbox-${label}`}>{label}</InputLabel>
            <Select
                labelId={`multiple-checkbox-${label}`}
                id={`multiple-checkbox-${label}-id`}
                multiple
                value={selected}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                renderValue={renderValue}
                MenuProps={MenuProps}
                sx={{ height: "42px" }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                        <MDTypography variant="button">
                            {renderClassName(originalList, option)}
                        </MDTypography>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
