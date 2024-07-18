'use client'

import { CardWrapper } from "@/components/auth/CardWrapper";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/schemas/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldComponent } from "@/components/auth/FormFieldComponent";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form/FormError";
import { FormSuccess } from "@/components/form/FormSuccess";
import { login } from "@/actions/login";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError('');
    setSuccess('');
    
    const data = await login(values);

    if (data?.success) {
      setSuccess(data.success)
    }

    if (data?.error) {
      setError(data.error)
    }

    form.reset()
  }

  return (
    <CardWrapper headerLabel="Welcome Back" backButtonLabel="Don't have an account?" backButtonHref="/register" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormFieldComponent control={form.control} name="email" label="Email" placeholder="Email address..." type="email" disabled={form.formState.isSubmitting} />
            <FormFieldComponent control={form.control} name="password" label="Password" placeholder="********" type="password" disabled={form.formState.isSubmitting}  />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={form.formState.isSubmitting} className="w-full">Login</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}