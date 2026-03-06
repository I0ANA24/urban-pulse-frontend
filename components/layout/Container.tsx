import NavBar from "./NavBar";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background w-screen min-h-screen flex justify-center pb-[8vh] overflow-x-hidden relative">
      <div className="container min-h-screen bg-background text-foreground font-inter flex justify-center items-center px-5 py-6">
        <div className="w-full min-h-screen animate-fade-up">{children}</div>
      </div>
      <NavBar />
    </div>
  );
}
