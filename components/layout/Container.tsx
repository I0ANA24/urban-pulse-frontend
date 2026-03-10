import NavBar from "./NavBar";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background w-full min-h-screen relative pb-[8vh] overflow-hidden">
      <div className="w-full min-h-screen bg-background text-foreground font-sans">
        <div className="w-full min-h-screen animate-fade-up">{children}</div>
      </div>
      <NavBar />
    </div>
  );
}