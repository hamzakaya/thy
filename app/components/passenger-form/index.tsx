"use client";
import { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import { FareCategories, fareCategories } from "@/app/common/models";
import useClickOutside from "@/app/utils/useClickOutside";
import { IProps, isCategoryChecked, usePassengerForm } from "./utils";
import Image from "next/image";

export default function PassengerForm({ onUpdate }: IProps) {
  const [open, setOpen] = useState(false);

  const ref = useClickOutside(() => setOpen(false));
  const toggle = useCallback(() => setOpen((status) => !status), []);

  const { peopeCount, increment, decrement, category, changeCategory } =
    usePassengerForm(onUpdate);

  return (
    <div className="h-10 w-32">
      <label
        className="w-full relative text-neutral-400 text-sm font-semibold block h-14 bg-slate-800 mt-0 px-5 py-4 cursor-pointer"
        onClick={toggle}
      >
        <Image
          className="mx-auto"
          src={`/user.svg`}
          alt={"user"}
          width={30}
          height={30}
          priority
          style={{
            opacity: 0.7,
          }}
        />
        <i className="absolute top-1 right-5">{peopeCount}</i>
      </label>

      {open && (
        <div
          ref={ref}
          className="relative bg-white mobile-space p-3  d-block w-96 right-64 top-0.5"
        >
          <p className="">Kabin ve yolcu seçimi</p>
          <div className="">
            <div className="grid grid-cols-2 gap-2 border-zinc-100 border-b mt-3 mb-6 pb-3.5">
              {fareCategories.map(({ label, value }, index) => (
                <RadioItem
                  key={index}
                  label={label}
                  value={value}
                  checked={isCategoryChecked(category, value)}
                  changeCategory={changeCategory}
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="block">Yolcu</div>
              <div className="action">
                <CountButton label="-" onClick={decrement} />
                <span className="mx-3">{peopeCount}</span>
                <CountButton label="+" onClick={increment} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RadioItem({
  label,
  value,
  checked,
  changeCategory,
}: {
  label: string;
  value: FareCategories;
  checked: boolean;
  changeCategory: (value: FareCategories) => () => void;
}) {
  const id = nanoid();
  return (
    <div className="flex" key={id}>
      <input
        id={id}
        type="radio"
        name="radio"
        value={value}
        className="h-4 w-4 border-gray-300"
        aria-labelledby={id}
        aria-describedby={id}
        defaultChecked={checked}
        onClick={changeCategory(value)}
      ></input>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-900 ml-2 block"
      >
        {label}
      </label>
    </div>
  );
}

function CountButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="btn btn-grey fs-5 bg-gray-300 text-zinc-800 w-7 h-7 rounded-sm shadow"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
