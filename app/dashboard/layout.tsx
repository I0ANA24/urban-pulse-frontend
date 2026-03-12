import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 z-10 px-4 pt-4">
          <TopBar back={false} notifications={true} settings={false} />
        </div>
        {children}
      </div>
    </Container>
  );
}