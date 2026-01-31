import Layout from "../../components/layout/Layout";
import Button from "../../components/common/Button";

export default function StudentList() {
  const students = [
    { name: "Kavipriya", project: "PMES" },
    { name: "Student 2", project: "ML App" }
  ];

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Assigned Students</h2>

      {students.map((s, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded shadow mb-3 flex justify-between"
        >
          <div>
            <p className="font-semibold">{s.name}</p>
            <p className="text-sm text-gray-500">{s.project}</p>
          </div>

          <Button text="Review" />
        </div>
      ))}
    </Layout>
  );
}
