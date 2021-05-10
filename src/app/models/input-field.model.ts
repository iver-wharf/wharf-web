import { SelectItem } from 'primeng/api/selectitem';

export class InputField {
  default: string;
  name: string;
  type: string;
  values?: SelectItem[] = [];
}
