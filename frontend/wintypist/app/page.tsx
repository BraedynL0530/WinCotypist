import NavBar from "./components/Navbar";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";

export default function Home() {
  return (
    <div
      className="min-h-screen w-full h-full"
      style={{
        background:
          "radial-gradient(265.57% 312.12% at -1.25% -144.26%, #07090C 65.51%, #425672 100%)",
      }}
    >
      <NavBar />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}
