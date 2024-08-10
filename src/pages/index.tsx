import { DetailsComponent } from '@/components/details';
import { DiscountsComponent } from '@/components/discounts';
import { SwitchComponent } from '@/components/switch';
import { formatPrice } from '@/utils/format-price';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text
} from '@chakra-ui/react';
import Head from 'next/head';
import * as React from 'react';
import { OrderSummaryItem } from '../components/order-summary-item';

type Switchs = {
  dev: boolean;
  acquire: boolean;
  manager: boolean;
};

type Discounts = {
  govermentIssPisConfins: number;
  kunlatek: number;
  inss: number;
} & Irrf;

type Irrf = {
  irrf: number;
  refIrrf: string;
};

type Details = {
  dev: number;
  acquire: number;
  manager: number;
};
export default function Home() {
  const KUNLATEK_FEE = 0.05;
  const GOVERMENT_FEE = 0.0565;
  const INSS_LIMIT = 1400;
  const FOUNDERS = 3;
  const FOUNDERS_PERCENT = 0.7;
  const MANGAER_PERCENT = 0.15;
  const ACQUIRE_PERCENT = 0.15;

  const [switchs, setSwitchs] = React.useState<Switchs>({
    dev: false,
    acquire: false,
    manager: false
  });
  const [details, setDetails] = React.useState<Details>({
    dev: 0,
    acquire: 0,
    manager: 0,
  });

  const [grossInput, setGrossInput] = React.useState<string>('');
  const [showDetails, setShowDetails] = React.useState<boolean>(false);

  const [discounts, setDiscounts] = React.useState<Discounts>({
    govermentIssPisConfins: 0,
    kunlatek: 0,
    inss: 0,
    irrf: 0,
    refIrrf: ''
  });
  const [net, setNet] = React.useState(0);

  const handleSwitchs = (value: boolean, switchType: string) => {
    setSwitchs({ ...switchs, [switchType]: value });
  };

  const handleGrossInput = (value: string) => {
    setGrossInput(value);
  };

  const calculateIrrf = (net: number): Irrf => {
    let irrf = 0;
    let refIrrf = '';
    if (net > 0 && net < 2259.20) {
      irrf = 0;
      refIrrf = 'isento';
    } else if (net > 2259.21 && net < 2826.65) {
      irrf = net * (7.5 / 100) - 158.40;
      refIrrf = '7.5%';
    } else if (net > 2826.66 && net < 3751.05) {
      irrf = net * (15 / 100) - 370.40;
      refIrrf = '15%';
    } else if (net > 3751.06 && net < 4664.68) {
      irrf = net * (22.5 / 100) - 651.73;
      refIrrf = '22.5%';
    } else if (net > 4664.68) {
      irrf = net * (27.5 / 100) - 884.96;
      refIrrf = '27.5%';
    }

    return {
      irrf,
      refIrrf
    };
  };

  React.useEffect(() => {
    const govermentIssPisConfins = Number(grossInput) * GOVERMENT_FEE;
    const grossMinusGovermentFee = Number(grossInput) - govermentIssPisConfins;
    const kunlatek = grossMinusGovermentFee * KUNLATEK_FEE;
    const grossMinusGovermentFeeMinusKunlatekFee = grossMinusGovermentFee - kunlatek;

    let net = 0;

    const _details = {
      dev: (grossMinusGovermentFeeMinusKunlatekFee * FOUNDERS_PERCENT) / FOUNDERS,
      acquire: grossMinusGovermentFeeMinusKunlatekFee * ACQUIRE_PERCENT,
      manager: grossMinusGovermentFeeMinusKunlatekFee * MANGAER_PERCENT,
    };

    Object.keys(switchs).forEach((item: string) => {
      if (switchs[item as keyof Switchs]) {
        net += _details[item as keyof Details];
        setShowDetails(true);
      }
    });

    if (!net) {
      net = grossMinusGovermentFeeMinusKunlatekFee;
      setShowDetails(false);
    }

    const _inssRaw = net * 0.2;
    const inss = _inssRaw < INSS_LIMIT ? _inssRaw : INSS_LIMIT;
    const netMinusInss = net - inss;
    const { irrf, refIrrf } = calculateIrrf(netMinusInss);

    setDiscounts({
      govermentIssPisConfins,
      kunlatek,
      inss,
      irrf,
      refIrrf
    });
    setDetails(_details);
    setNet(netMinusInss - irrf);

  }, [switchs, grossInput]);

  return (
    <>
      <Head>
        <title>Calculadora RapidaX - Kunlatek</title>
      </Head>
      <Stack
        margin="8"
        spacing="8"
        borderWidth="1px"
        bgColor="#012340"
        rounded="lg"
        className="sm:w-[450px] p-4 sm:p-8"
      >
        <Heading
          textAlign="center"
          color="#5ED7F2"
          size="md"
          bgGradient="linear-gradient(135.51deg,#30a1fc,#6ae1ec)"
          bgClip="text"
        >
          CALCULADORA RAPIDA-X
        </Heading>

        <Stack spacing="6">
          <OrderSummaryItem
            label="Valor bruto"
          >
            <InputGroup width={150}>
              <InputLeftElement
                pointerEvents="none"
                color="#FFFFFF"
                fontSize="1.2em"
                // eslint-disable-next-line react/no-children-prop
                children="R$"
              />
              <Input
                color="#FFFFFF"
                placeholder="Valor bruto"
                type="number"
                value={grossInput}
                onChange={({ target }) => handleGrossInput(target.value)}
              />
            </InputGroup>
          </OrderSummaryItem>

          <SwitchComponent title="Você é dev?" handleSwitch={handleSwitchs} isChecked={switchs.dev} type='dev' ></SwitchComponent>

          <SwitchComponent title="Você captou o projeto?" handleSwitch={handleSwitchs} isChecked={switchs.acquire} type='acquire' ></SwitchComponent>

          <SwitchComponent title="Você gerenciará o projeto?" handleSwitch={handleSwitchs} isChecked={switchs.manager} type='manager' ></SwitchComponent>

          <DiscountsComponent inss={discounts.inss} kunlatek={discounts.kunlatek} kunlatekFee={KUNLATEK_FEE} issPisConfins={discounts.govermentIssPisConfins} irrf={discounts.irrf} refIrrf={discounts.refIrrf}></DiscountsComponent>

          {showDetails ? <DetailsComponent dev={details.dev} acquire={details.acquire} manager={details.manager} founders={FOUNDERS}></DetailsComponent> : <></>}

          <Flex justify="space-between">
            <Text fontSize="lg" color="#FFFFFF" fontWeight="semibold">
              Valor líquido
            </Text>
            <Text fontSize="xl" color="#0eed0e" fontWeight="extrabold">
              {formatPrice(net)}
            </Text>
          </Flex>
        </Stack>
      </Stack>
    </>
  );
};