import { createSelector } from "reselect";

const categories_reducer = (state) => state.categories;

export const categories_selector = createSelector([categories_reducer], (categories) => categories);
