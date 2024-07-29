import { formatPrice } from "@/utils/format-price";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { OrderSummaryItem } from "./order-summary-item";

type DetailsComponentProps = {
  founders: number;
  dev: number;
  acquire: number;
  manager: number;
};
export const DetailsComponent = ({ founders, dev, acquire, manager }: DetailsComponentProps) => {
  return (
    <Accordion allowToggle className="text-white">
      <AccordionItem className="border-none">
        <h2>
          <AccordionButton className="!px-0">
            <Box as='span' flex='1' textAlign='left'>
              Detalhes
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} >
          <OrderSummaryItem
            label="Valor por dev"
            tooltipLabel={`Valor total: ${formatPrice(dev * founders)} para 3 devs`}
            value={formatPrice(dev)} />
          <OrderSummaryItem
            label="Valor captação"
            tooltipLabel='Valor Bruto'
            value={formatPrice(acquire)} />
          <OrderSummaryItem
            label="Valor gerenciamento"
            tooltipLabel='Valor Bruto'
            value={formatPrice(manager)} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};