'use client'

import { CardWrapper } from "@/components/auth/CardWrapper";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerSchema } from "@/schemas/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldComponent } from "@/components/auth/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import { useState } from "react";
import { register } from "@/actions/register";

export function RegisterForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError('');
    setSuccess('');
    
    const data = await register(values);

    if (data.success) {
      setSuccess(data.success)
    } else {
      setError(data.error)
      form.reset();
    }
  }

  return (
    <CardWrapper headerLabel="Create an account" backButtonLabel="Already have an account?" backButtonHref="/login" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormFieldComponent control={form.control} name="name" label="Name" placeholder="John Doe" type="text" disabled={form.formState.isSubmitting} />
            <FormFieldComponent control={form.control} name="email" label="Email" placeholder="john.doe@example.com" type="email" disabled={form.formState.isSubmitting} />
            <FormFieldComponent control={form.control} name="password" label="Password" placeholder="********" type="password" disabled={form.formState.isSubmitting} />
            <FormFieldComponent control={form.control} name="confirmPassword" label="Confirm Password" placeholder="********" type="password" disabled={form.formState.isSubmitting}  />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" disabled={form.formState.isSubmitting}>Create an account</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}