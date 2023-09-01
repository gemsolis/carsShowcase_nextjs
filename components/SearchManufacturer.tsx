"use client";
import { useState, Fragment } from "react";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";
import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";

const SearchManufacturer = ({
  selected,
  setSelected,
}: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Combobox.Button className="relative flex w-full mr-5">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="absolute ml-4 mt-4"
              alt="Car Logo"
            />
            <Combobox.Input
              className="search-manufacturer__input"
              placeholder="Volkswagen...."
              displayValue={(manufacturer: string) => manufacturer}
              onChange={(e) => setQuery(e.target.value)}
            ></Combobox.Input>
          </Combobox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-20 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredManufacturers.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) => `
                  relative search-manufacturer__option ${
                    active ? "bg-primary-blue text-white" : "text-gray-900"
                  }`}
                  value={item}
                >
                  {({ active, selected }) => (
                    <li
                      className={`${
                        active
                          ? "bg-primary-blue text-white"
                          : "bg-white text-black"
                      }`}
                    >
                      {item}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
