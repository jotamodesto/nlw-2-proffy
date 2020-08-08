import { produce } from "immer";

export interface TeacherFormState {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
  scheduleItems: Array<ScheduleItem>;
}

export interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export type FieldName = keyof Omit<TeacherFormState, "scheduleItems">;
export type ScheduleItemFields = keyof ScheduleItem;

interface StringValueAction {
  type: "set-string-value";
  payload: {
    fieldName: FieldName;
    value: string;
  };
}
interface ScheduleItemsAction {
  type: "set-schedule-item";
  payload: { index: number; field: ScheduleItemFields; value: string };
}
interface NewScheduleItemAction {
  type: "new-schedule-item";
}

export type TeacherFormAction =
  | StringValueAction
  | ScheduleItemsAction
  | NewScheduleItemAction;

export const initialState: TeacherFormState = {
  name: "",
  avatar: "",
  whatsapp: "",
  bio: "",
  subject: "",
  cost: "",
  scheduleItems: [{ week_day: 0, from: "", to: "" }],
};

function reducer(state: TeacherFormState, action: TeacherFormAction) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "set-string-value":
        const { fieldName, value } = action.payload;
        draft[fieldName] = value;
        break;

      case "set-schedule-item": {
        const { index, field, value } = action.payload;
        const scheduleItem = draft.scheduleItems[index];
        if (field === "week_day") scheduleItem.week_day = parseInt(value);
        else scheduleItem[field] = value;

        break;
      }

      case "new-schedule-item":
        draft.scheduleItems.push({ week_day: 0, from: "", to: "" });
        break;
    }
  });
}

export default reducer;
