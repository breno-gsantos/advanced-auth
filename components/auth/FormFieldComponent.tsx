import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface FormFieldComponentProps{
  control: Control<any>;
  name: string;
  label: string;
  type: string;
  placeholder: string;
  disabled: boolean;
}

export function FormFieldComponent({control, name, label, type, placeholder, disabled}: FormFieldComponentProps) {
  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input type={type} disabled={disabled} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )} />
  )
}