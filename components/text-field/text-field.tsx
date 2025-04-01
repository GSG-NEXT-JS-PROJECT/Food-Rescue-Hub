"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

type TextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
    name: string;
    label?: string;
};

const TextField: React.FC<TextFieldProps> = ({ name, label, ...rest }) => {
    const [field, meta] = useField<string>(name);

    return (
        <div className="py-2">
            <Label className="my-2">{label}</Label>
            <Input
                id={name}
                {...field}
                {...rest}
                className="bg-gray-100 border-none rounded-xl py-2 "
            />
            {meta.touched && meta.error && <p className="text-sm text-red-500 mt-1">{meta.error}</p>}
        </div>
    );
};

export default TextField;
