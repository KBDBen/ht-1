interface Props {
  headers: string[];
  rows: string[][];
}

export default function DataPreview({ headers, rows }: Props) {
  // 최대 10행만 미리보기
  const previewRows = rows.slice(0, 10);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">
        📋 데이터 미리보기 ({rows.length}행 중 최대 10행)
      </h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2 text-left font-medium text-gray-700 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row, i) => (
              <tr key={i} className="border-t border-gray-100 hover:bg-gray-50">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-2 whitespace-nowrap text-gray-600">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
