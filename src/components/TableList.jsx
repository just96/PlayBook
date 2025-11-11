import MapImage from "./MapImage";
import Button from "./Button";

export default function TableList({ handleOpen, tacticData, onDelete, onDetails }) {
  return (
    <div className="overflow-x-auto mt-10">
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
          {tacticData.map((tactic) => (
            <tr key={tactic.id} className="hover:bg-gray-700 cursor-pointer" onClick={() => onDetails(tactic)}>
              <th>#{tactic.id}</th>
              <td>
                <strong>{tactic.map}</strong>
              </td>
              <td>
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
                  className={"btn btn-info btn-md font-bold"}
                  children={"Update"}
                ></Button>
              </td>

              {/* Botão de exclusão */}
              <td>
                <Button
                  onOpen={(e) => {
                    e.stopPropagation(); // evita disparar onDetails
                    onDelete(tactic);
                  }}
                  className={"btn btn-error btn-md font-bold"}
                  children={"Delete"}
                ></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
