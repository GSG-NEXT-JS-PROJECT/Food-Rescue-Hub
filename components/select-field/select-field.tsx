"use client";

import { useField } from "formik";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type SelectFieldProps = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "onChange"> & {
    name: string;
    label?: string;
    options: string[];
    placeholder?: string;
    onValueChange?: (value: string) => void;
    defaultValue?: string;
};

const SelectField: React.FC<SelectFieldProps> = ({ name, label, options, placeholder, onValueChange,
    defaultValue }) => {
    const [field, meta, helpers] = useField<string>(name);

    return (
        <div>
            {label && <Label className="my-2">{label}</Label>}
            <Select
                onValueChange={(value) => {
                    helpers.setValue(value);
                    if (onValueChange) onValueChange(value);
                }}
                defaultValue={defaultValue || field.value}
            >
                <SelectTrigger className="bg-gray-100 border-none rounded-md w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option} value={option} >
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {meta.touched && meta.error && <p className="text-red-500 text-sm">{meta.error}</p>}
        </div>
    );
};

export default SelectField;
