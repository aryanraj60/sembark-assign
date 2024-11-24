import { Listbox } from "@headlessui/react";
import { HiOutlineSelector } from "react-icons/hi";

interface OptionType {
  value: string | number;
  title: string;
}

interface SelectProps {
  options: OptionType[];
  selectedValues: OptionType[] | OptionType;
  onChange: (selectedOptions: OptionType[] | OptionType) => void;
  placeholder?: string;
  isMulti?: boolean;
}

const SelectInput: React.FC<SelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select Options",
  isMulti = false,
}) => {
  const handleSelectionChange = (newSelected: OptionType[]) => {
    onChange(newSelected);
  };

  return (
    <Listbox
      value={selectedValues}
      onChange={handleSelectionChange}
      multiple={isMulti}
    >
      {({ open }) => (
        <div className="relative">
          <div className="relative inline-block text-left">
            <Listbox.Button className="inline-flex w-full items-center justify-center gap-4 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              {isMulti && Array.isArray(selectedValues)
                ? selectedValues.length > 0
                  ? `${selectedValues.length} Selected`
                  : placeholder
                : placeholder}
              <HiOutlineSelector size="22" />
            </Listbox.Button>
          </div>
          <Listbox.Options
            className="absolute mt-1 max-h-60 min-w-[180px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            style={{ display: open ? "block" : "none" }}
          >
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option}
                className={({ active }) =>
                  `${active ? "bg-blue-500 text-white" : "text-gray-900"}
                    relative cursor-pointer select-none py-2 pl-1 pr-4`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      readOnly
                      checked={selected}
                      className="cursor-pointer"
                    />
                    <span
                      className={`${
                        selected ? "font-semibold" : "font-normal"
                      }`}
                    >
                      {option.title}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
};

export default SelectInput;
