import { useState, useEffect } from 'react';
import Select from 'react-select';

const CustomSelect = ({ data, config, label, onSelect, defaultValue, width = "300px", isMulti=false }) => {
  // console.log(data)
  const options = data.map((item) => ({
    value: item[config.key],
    label: item[config.label],
  }));

  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`!w-[${width}] !max-w-[600px] my-3`}>
      {label && <label className="block text-gray-700 font-medium mb-3 text-sm">{label}</label>}
      <Select
        isMulti={isMulti}
        value={selectedValue}
        options={options}
        onChange={onSelect}
        className="w-full text-sm"
        classNames={{
          control: () => 'border !border-gray-600 rounded-md px-2 min-h-[20px] text-sm',
          menu: () => 'bg-white shadow-lg rounded-md text-sm',
          option: ({ isFocused }) =>
            `px-2 py-1 cursor-pointer text-sm ${isFocused ? '' : ''}`,
        }}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }), // <- custom z-index for menu portal
          menu: (base) => ({ ...base, zIndex: 9999 }), // <- custom z-index for menu itself
        }}
        menuPortalTarget={document.body} // attach menu to body to respect zIndex
      />
    </div>
  );
};

export default CustomSelect;
