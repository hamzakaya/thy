import { FareCategories } from "@/app/common/models";
import { useReducer, useCallback, useEffect } from "react";

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "change-category"; category: FareCategories };

export type IProps = {
  onUpdate: (data: { peopeCount: number; category: FareCategories }) => void;
};

export function usePassengerForm(onUpdate: IProps["onUpdate"]) {
  const [{ peopeCount, category }, dispatch] = useReducer(
    (
      state: {
        peopeCount: number;
        category: FareCategories;
      },
      action: Action
    ) => {
      switch (action.type) {
        case "increment":
          return { ...state, peopeCount: state.peopeCount + 1 };
        case "decrement":
          return { ...state, peopeCount: Math.max(state.peopeCount - 1, 0) };
        case "change-category":
          return { ...state, category: action.category };
        default:
          return state;
      }
    },
    {
      peopeCount: 1,
      category: FareCategories.ECONOMY,
    }
  );

  useEffect(
    () => onUpdate({ peopeCount, category }),
    [peopeCount, category, onUpdate]
  );

  const increment = useCallback(() => dispatch({ type: "increment" }), []);
  const decrement = useCallback(() => dispatch({ type: "decrement" }), []);
  const changeCategory = useCallback(
    (category: FareCategories) => () =>
      dispatch({ type: "change-category", category }),
    []
  );

  return {
    peopeCount,
    category,
    increment,
    decrement,
    changeCategory,
  };
}

export function isCategoryChecked(
  category: FareCategories,
  value: FareCategories
) {
  return category === value;
}
