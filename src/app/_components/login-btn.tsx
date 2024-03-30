import { useSession, signIn, signOut } from "next-auth/react";

export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="mt-4">
        Signed in as {session?.user?.email} <br />
      </div>
    );
  }

  return <>Not signed in</>;
}
