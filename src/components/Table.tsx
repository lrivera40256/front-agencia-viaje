import React from 'react';

interface TableAction<T = any> {
  label: string;
  onClick: (row: T) => void;   
}

interface tableProps {
  tableName:string
  titles: string[];
  data: Record<string, any>[];
  actions?: TableAction<Record<string, any>>[]
}

const Table:React.FC<tableProps> = (props:tableProps) => {
  return (
    <div>
      <div className="bg-gray-100 flex justify-center h-screen">
        <div className="overflow-x-auto w-4/5">
          <table className="w-full border-collapse bg-black shadow-lg rounded-2xl overflow-hidden">
            <caption className="text-3xl font-bold mb-4 text-gray-800">{props.tableName}</caption>
            <thead className="bg-blue-600 text-white">
              <tr>
                {props.titles.map((item) => (
                  <th key={item} className="px-6 py-3 text-left text-sm font-semibold text-white">
                    {item}
                  </th>
                ))}
                {props.actions && props.actions.length > 0 && (
                  <th className="px-6 py-3 text-sm font-semibold text-white">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {props.data.map((row, i) => (
                <tr key={i} className="hover:bg-blue-50 transition-colors">
                  {Object.entries(row).map(([k, value]) =>
                    k === "_id" ? null : (
                      <td key={k} className="px-6 py-4 text-sm text-white">
                        {String(value)}
                      </td>
                    )
                  )}

                  {props.actions && props.actions.length > 0 && (
                    <td className="px-6 py-4 space-x-2">
                      {props.actions.map((action, ai) => (
                        <button
                          key={ai}
                          onClick={() => action.onClick(row)}
                          className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};
export default Table;