import Container from "@/components/layout/Container";
import TopBar from "@/components/layout/TopBar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <TopBar back={false} notifications={true} settings={true} />
      {children}
    </Container>
  );
}
