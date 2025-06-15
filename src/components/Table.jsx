import { useState, useMemo, useEffect } from 'react';
import Select from './Select';

export default function CustomTable({
  label,
  data = [],
  columns = [],
  searchKey = 'name',
  searchPlaceholder = 'name'
}) {
  const [searchText, setSearchText] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    return data.filter(item =>
      String(item[searchKey] || '')
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [data, searchText, searchKey]);

  const totalPages = Math.ceil(filteredData.length / perPage);

  const paginatedData = useMemo(() => {
    console.log("per page is ", perPage)
    const start = (currentPage - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [filteredData, currentPage, perPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const config = { key: 'value', label: 'label' };

  useEffect(() => {
    setCurrentPage(1);
  }, [perPage]);

  return (
    <div className="w-full bg-white rounded-lg shadow p-6">
      {label && (
        <h2 className="text-xl font-semibold text-black mb-4">{label}</h2>
      )}

      <input
        type="text"
        placeholder={`Seach by ${searchPlaceholder}`}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1);
        }}
        className="mb-4 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none max-w-[300px]"
      />

      {paginatedData.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No data available</div>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-2 text-md font-medium text-gray-700"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-4 py-2 text-md text-gray-800"
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-2">
          <span className="text-md text-gray-600">Rows per page:</span>
          <Select
            config={config}
            data={[
              { label: '5', value: 5 },
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
            ]}
            defaultValue={10}
            onSelect={(val) => {
              setPerPage(val.value);
            }}
            width={80}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-md text-gray-600 disabled:text-gray-400"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-md rounded ${
                currentPage === page
                  ? 'bg-black text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-md text-gray-600 disabled:text-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
