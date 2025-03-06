import GithubButton from "@/components/auth/social/GithubButton";

export default function Home() {
  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center gap-10">
      <h1 className="text-4xl font-semibold">Manage invoices</h1>
      <GithubButton />
    </div>
  );
}
