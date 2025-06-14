import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SelectProps } from '@radix-ui/react-select';

type SelectCustomProps = {
  onValueChangeCustom: (value: string) => void;
  valueCustom: string;
} & Omit<SelectProps, 'onValueChange' | 'value'>;

export function SelectCustom({
  onValueChangeCustom,
  valueCustom,
  ...props
}: SelectCustomProps) {
  return (
    <Select  onValueChange={onValueChangeCustom} value={valueCustom} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categorias</SelectLabel>
          <SelectItem value="1">Apple</SelectItem>
          <SelectItem value="2">Banana</SelectItem>
          <SelectItem value="3">Blueberry</SelectItem>
          <SelectItem value="5">Grapes</SelectItem>
          <SelectItem value="4">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
