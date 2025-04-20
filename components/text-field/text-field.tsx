"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
    name: string;
    label?: string;
    isLabelRemoved?: boolean
};

const TextField: React.FC<TextFieldProps> = ({ name, label, isLabelRemoved = false, ...rest }) => {
    const [field, meta] = useField<string>(name);

    return (
        <div>
            {!isLabelRemoved && <Label className="my-2" htmlFor={name}>{label}</Label>}
            <Input
                id={name}
                className="bg-gray-100 border-none rounded-md"
                {...field}
                {...rest}
            />
            {meta.touched && meta.error && <p className="text-sm text-red-500 mt-1">{meta.error}</p>}
        </div>
    );
};

export default TextField;
