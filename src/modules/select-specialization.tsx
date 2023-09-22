import { SelectProps } from "@radix-ui/react-select";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/select";
import { SPECIALIZATION } from "../lib/constants";

export const SelectSpecialization = (props: SelectProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Specialization" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SPECIALIZATION).map(([id, name]) => {
          return (
            <SelectItem key={id} value={id}>
              {name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
