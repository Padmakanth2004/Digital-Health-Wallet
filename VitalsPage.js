import Navbar from "../components/Navbar";
import AddVitals from "../components/AddVitals";

export default function VitalsPage() {
  return (
    <>
      <Navbar />
      <div className="page-center">
        <AddVitals />
      </div>
    </>
  );
}
