import { InputGroup, InputLeftElement, Switch } from "@chakra-ui/react";
import { OrderSummaryItem } from "./order-summary-item";

type SwitchComponentProps = {
  title: string;
  isChecked: boolean;
  handleSwitch: (isChecked: boolean, type: string) => void;
  type: string;
};
export const SwitchComponent = ({ title, isChecked, handleSwitch, type }: SwitchComponentProps) => {
  return (
    <OrderSummaryItem
      label={title}
    >
      <InputGroup width={150} justifyContent="end">
        <InputLeftElement
          pointerEvents="none"
          color="#FFFFFF"
          fontSize="1.2em"
        />
        <Switch
          size='lg'
          color="#FFFFFF"
          isChecked={isChecked}
          onChange={({ target }) => handleSwitch(target.checked, type)}
        />
      </InputGroup>
    </OrderSummaryItem>
  );
};