export default function TableList({ handleOpen, tacticData, onDelete, onDetails }) {
  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* Cabeçalho da tabela */}
        <thead>
          <tr>
            <th>#</th>
            <th>Map</th>
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
              <td>{tactic.map}</td>
              <td>{tactic.side}</td>
              <td>{tactic.zone}</td>
              <td>{tactic.description}</td>
              <td>{tactic.effectiveness}</td>

              {/* Botão de edição */}
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evita disparar onDetails
                    handleOpen("edit", tactic);
                  }}
                  className="btn btn-info btn-sm font-bold"
                >
                  Update
                </button>
              </td>

              {/* Botão de exclusão */}
              <td>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // evita disparar onDetails
                    onDelete(tactic);
                  }}
                  className="btn btn-error btn-sm font-bold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
