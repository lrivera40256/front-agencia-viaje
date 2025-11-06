 interface BaseCardInfo {
    label: string;
    value: string;
}
interface ReadonlyField extends BaseCardInfo {
  editable: false;
}

interface EditableField extends BaseCardInfo {
  editable: true;
  handleChange: ( newValue: string) => void;
}
export type InfoCard = ReadonlyField | EditableField;