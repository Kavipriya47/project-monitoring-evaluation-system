import Layout from "../../components/layout/Layout";
import Button from "../../components/common/Button";
import { useState } from "react";

export default function UpdateReview() {
  const [marks, setMarks] = useState("");
  const [status, setStatus] = useState("Pending");

  const update = () => {
    alert("Marks updated (backend later)");
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">Update Review</h2>

      <input
        type="number"
        className="border p-2 w-full mb-3"
        placeholder="Marks"
        onChange={(e) => setMarks(e.target.value)}
      />

      <select
        className="border p-2 w-full mb-3"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Pending</option>
        <option>Approved</option>
        <option>Rejected</option>
      </select>

      <Button text="Update Review" onClick={update} />
    </Layout>
  );
}
