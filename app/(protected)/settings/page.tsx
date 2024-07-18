import { auth, signOut } from "@/auth"

export default async function SettingsPage(){
  const session = await auth();


  return (
    <div className="flex items-center justify-center h-full">
      {JSON.stringify(session)}
      <form action={async () => {
        'use server'

        await signOut({redirectTo: '/'})
      }}> 
        <button>Sair</button>
      </form> 
    </div>
  )
}

