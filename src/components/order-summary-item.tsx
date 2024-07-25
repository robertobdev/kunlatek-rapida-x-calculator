import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import * as React from 'react';

type OrderSummaryItemProps = {
  label: React.ReactNode;
  value?: string;
  tooltipLabel?: string;
  children?: React.ReactNode;
  isNegativeValue?: boolean;
};

export const OrderSummaryItem = (props: OrderSummaryItemProps) => {
  const { label, value, children, tooltipLabel, isNegativeValue } = props;
  return (
    <Flex justify="space-between" alignItems="center" fontSize="sm">
      <Text fontWeight="medium" color="#FFFFFF">
        {label}
        {tooltipLabel ? <Tooltip hasArrow label={tooltipLabel} bg='gray.300' color='black'>
          <InfoIcon ml={1} color="#5ED7F2" width={3.5} />
        </Tooltip> : <></>}
      </Text>
      {value ? (
        <Text
          fontWeight="medium"
          color={isNegativeValue ? '#F5FF38' : '#FFFFFF'}
        >
          {value}
        </Text>
      ) : (
        children
      )}
    </Flex>
  );
};