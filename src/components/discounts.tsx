import { formatPrice } from "@/utils/format-price";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { OrderSummaryItem } from "./order-summary-item";

type DiscountsComponentProps = {
  issPisConfins: number;
  kunlatekFee: number;
  kunlatek: number;
  inss: number;
};
export const DiscountsComponent = ({ issPisConfins, kunlatekFee, kunlatek, inss }: DiscountsComponentProps) => {
  return (
    <Accordion allowToggle className="text-white">
      <AccordionItem className="border-none">
        <h2>
          <AccordionButton className="!px-0">
            <Box as='span' flex='1' textAlign='left'>
              Descontos
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} >
          <OrderSummaryItem
            tooltipLabel="ISS + PIS + COFINS incide sob o valor bruto e é fixado em 5,65%"
            label="Imposto(ISS+PIS+COFINS)"
            isNegativeValue={true}
            value={formatPrice(issPisConfins * -1)}
          />
          <OrderSummaryItem
            label="Kunlatek"
            tooltipLabel={'Kunlatek incide sob o valor bruto - Impostos(Iss PIS e COFINS) e é fixado em ' + kunlatekFee * 100 + '%'}
            isNegativeValue={true}
            value={formatPrice(kunlatek * -1)}
          />
          <OrderSummaryItem
            label="Imposto(INSS)"
            tooltipLabel="INSS incide sob o valor bruto do dev e é fixado em 20% com teto de R$ 1400,00"
            isNegativeValue={true}
            value={formatPrice(inss * -1)}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};