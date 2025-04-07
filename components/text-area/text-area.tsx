"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useField } from "formik";

type TextAreaFieldProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> & {
    name: string;
    label?: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({ name, label, ...rest }) => {
    const [field, meta, helpers] = useField<string>(name);

    const textareaProps = {
        ...field,
        ...rest,
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            helpers.setValue(e.target.value);
        },
        onBlur: (e: React.FocusEvent<HTMLTextAreaElement>) => {
            field.onBlur(e);
        }
    };

    return (
        <div>
            <Label className="my-2" htmlFor={name}>{label}</Label>
            <Textarea
                id={name}
                {...textareaProps}
                className="bg-gray-100 border-none rounded-md min-h-[100px]"
            />
            {meta.touched && meta.error && <p className="text-sm text-red-500 mt-1">{meta.error}</p>}
        </div>
    );
};

export default TextAreaField;