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
import { Category } from '@/models/product';

type SelectCustomProps = {
  onValueChangeCustom: (value: string) => void;
  valueCustom: string;
  categories: Category[];
} & Omit<SelectProps, 'onValueChange' | 'value'>;

export function SelectCustom({
  onValueChangeCustom,
  valueCustom,
  categories = [],
  ...props
}: SelectCustomProps) {
  return (
    <Select onValueChange={onValueChangeCustom} value={valueCustom} {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione uma categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map((category, index) => (
            <SelectItem key={index} value={String(category.id)}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
