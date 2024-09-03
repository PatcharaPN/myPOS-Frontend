import React from "react";

type TableComponentProps = {
  headers: { label: React.ReactNode; key: string }[];
  data: any[];
  renderRow: (item: any, index: any) => React.ReactNode;
  onSelectAll?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectAll?: boolean;
};

const TableComponent: React.FC<TableComponentProps> = ({
  headers,
  data,
  renderRow,
  onSelectAll,
  selectAll,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key} className="align-header">
              {header.key === "checkbox" ? (
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={onSelectAll}
                />
              ) : (
                header.label
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="content-wrapper">
        {data.length > 0 ? (
          data.map(renderRow)
        ) : (
          <tr>
            <td colSpan={headers.length}>
              <div className="empty-img">
                <img
                  width={450}
                  src="/assets/undraw_empty_re_opql.svg"
                  alt="Empty"
                />
                <h2 className="text-alert">
                  Oops! Your inventory is empty. Try to adding new items.
                </h2>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
