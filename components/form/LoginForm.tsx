import { CardWrapper } from "@/components/auth/CardWrapper";

export function LoginForm() {
  return (
    <CardWrapper headerLabel="Welcome Back" backButtonLabel="Don't have an account?" backButtonHref="/register" showSocial>
      Login Form
    </CardWrapper>
  )
}