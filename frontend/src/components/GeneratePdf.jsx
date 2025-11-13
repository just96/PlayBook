import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import Button from "./Button";
import { tacticsData } from "../data/tacticsData";
import { FaRegFilePdf } from "react-icons/fa";
import { Fragment } from "react";

export default function GeneratePdf() {
  const handleGenerate = () => {
    const doc = new jsPDF();
    const title = "PlayBook";
    const padding = 10;
    const titleWidth = doc.getTextWidth(title);
    const center = doc.internal.pageSize.width / 2 - titleWidth / 2;

    doc.text(title, center, padding);

    autoTable(doc, {
      head: [["#", "Map", "Side", "Zone", "Description", "Effectiveness"]],
      body: tacticsData.map((tactic) => [
        tactic.id,
        tactic.map,
        tactic.side,
        tactic.zone,
        tactic.description,
        tactic.effectiveness,
      ]),
    });

    doc.save("testPDF.pdf");
  };

  return (
    <div className={"flex justify-end m-1"}>
      <Button
        className="btn btn-accent"
        onClick={handleGenerate}
        children={
          <>
            <span>Export to PDF</span>
            <FaRegFilePdf size="17" />
          </>
        }
      />
    </div>
  );
}
