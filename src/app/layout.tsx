import SessionProvider from "./_components/providers/session";
import AntDProvider from "./_components/providers/theme";

function MainLayout() {
  return (
    <SessionProvider>
      <AntDProvider />
    </SessionProvider>
  );
}
export default MainLayout;
