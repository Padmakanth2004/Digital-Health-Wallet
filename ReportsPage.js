import Navbar from "../components/Navbar";
import UploadReport from "../components/UploadReport";

export default function ReportsPage() {
  return (
    <>
      <Navbar />
      <div className="page-center">
        <UploadReport />
      </div>
    </>
  );
}
