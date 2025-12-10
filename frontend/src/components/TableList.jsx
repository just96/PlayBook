import MapImage from "./MapImage";
import Button from "./Button";
import GeneratePdf from "./GeneratePdf";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export default function TableList({ handleOpen, tacticData, onDelete, onDetails }) {
  return (
    <div className="overflow-x-auto mt-10">
      <GeneratePdf className={"text-center mb-5"} tactics={tacticData} />
      <table className="table">
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th>#</th>
            <th>Map</th>
            <th></th>
            <th>Side</th>
            <th>Zone</th>
            <th>Description</th>
            <th>Effectiveness</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        {/* Corpo da tabela */}
        <tbody className="hover">
          {Array.isArray(tacticData) && tacticData.length > 0 ? (
            tacticData.map((tactic, index) => (
              <tr key={tactic._id} className="hover:bg-gray-700 cursor-pointer" onClick={() => onDetails(tactic)}>
                <th>#{index + 1}</th>
                <td>
                  <strong>{tactic.map}</strong>
                </td>
                <td className="min-w-[100px]">
                  <MapImage map={tactic.map} />
                </td>
                <td>
                  <strong>{tactic.side}</strong>
                </td>
                <td>
                  <strong>{tactic.zone}</strong>
                </td>
                <td>
                  <strong>{tactic.description}</strong>
                </td>
                <td>
                  <strong>{tactic.effectiveness}</strong>
                </td>
                {/* Botão de edição */}
                <td>
                  <Button
                    onOpen={(e) => {
                      e.stopPropagation(); // evita disparar onDetails
                      handleOpen("edit", tactic);
                    }}
                    className={"btn btn-info btn-md"}
                    children={
                      <>
                        <FaEdit color="black" size="15" />
                        <span>Update</span>
                      </>
                    }
                  ></Button>
                </td>

                {/* Botão de exclusão */}
                <td>
                  <Button
                    onOpen={(e) => {
                      e.stopPropagation(); // evita disparar onDetails
                      onDelete(tactic);
                    }}
                    className={"btn btn-error btn-md"}
                    children={
                      <>
                        <MdDelete color="black" size="15" />
                        <span>Delete</span>
                      </>
                    }
                  ></Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-2xl font-bold">
                No tactics available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
