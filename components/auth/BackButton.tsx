import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BackButtonProps{
  href: string;
  label: string;
}

export function BackButton({href, label}: BackButtonProps) {
  return (
    <Button variant='link' asChild className="font-normal w-full" size='sm'>
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}