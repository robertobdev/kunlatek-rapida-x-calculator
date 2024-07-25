import { formatPrice } from '@/utils/format-price';
import {
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Switch,
  Text
} from '@chakra-ui/react';
import * as React from 'react';
import { OrderSummaryItem } from '../components/order-summary-item';
interface CalculateGrossValues {
  _kunlatek: number;
  _devGross: number;
  _managerGross: number;
  _acquireGross: number;
  _inss: number;
  _net: number;
  _issPisCofins: number;
  _isDev: boolean;
  _isAcquire: boolean;
  _isManager: boolean;
}
export default function Home() {
  const [totalGrossValue, setTotalGrossValue] = React.useState('');
  const [kunlatek, setKunlatek] = React.useState(0);
  const [devGross, setDevGross] = React.useState(0);
  const [managerGross, setManagerGross] = React.useState(0);
  const [acquireGross, setAcquireGross] = React.useState(0);
  const [inss, setInss] = React.useState(0);
  const [issPisCofins, setIssPisCofins] = React.useState(0);
  const [net, setNet] = React.useState(0);
  const [isDev, setIsDev] = React.useState(false);
  const [isManager, setIsManager] = React.useState(false);
  const [isAcquire, setIsAcquire] = React.useState(false);
  const KunlatekFee = 0.05;
  const GovermentFee = 0.0565;
  const InssLimit = 1400;
  const Founders = 3;
  const FoundersPercent = 0.7;
  const ManagerPercent = 0.15;
  const AcquirePercent = 0.15;

  const handleGrossValue = (value: string | boolean, switchType: any = null) => {
    if (!switchType) {
      setTotalGrossValue(value as string);
    }
    const { _kunlatek, _devGross, _issPisCofins, _inss, _net, _acquireGross, _managerGross, _isDev, _isAcquire, _isManager } =
      calculateGrossValue(Number(value), switchType);
    setKunlatek(_kunlatek * -1);
    setDevGross(_devGross);
    setInss(_inss * -1);
    setIssPisCofins(_issPisCofins * -1);
    setNet(_net);
    setAcquireGross(_acquireGross);
    setManagerGross(_managerGross);
    setIsDev(_isDev);
    setIsAcquire(_isAcquire);
    setIsManager(_isManager);
  };

  const calculateGrossValue = (value: any, switchType: any = null): CalculateGrossValues => {
    let _userGross = 0;
    let _isDev = isDev;
    let _isAcquire = isAcquire;
    let _isManager = isManager;
    const totalGrossFuncValue = switchType ? totalGrossValue : value;
    const _totalGrossValue = Number(totalGrossFuncValue) * (1 - GovermentFee);
    const _kunlatek = _totalGrossValue * KunlatekFee;
    const _devGross = ((_totalGrossValue - _kunlatek) * FoundersPercent) / Founders;
    const _managerGross = (_totalGrossValue - _kunlatek) * ManagerPercent;
    const _acquireGross = (_totalGrossValue - _kunlatek) * AcquirePercent;
    switch (switchType) {
      case 'dev':
        _isDev = value;

        break;
      case 'acquire':
        _isAcquire = value;
        break;
      case 'manager':
        _isManager = value;
        break;
      default:
        break;
    }
    if (_isDev) {
      _userGross += _devGross;
    }
    if (_isAcquire) {
      _userGross += _acquireGross;
    }
    if (_isManager) {
      _userGross += _managerGross;
    }

    const _inssRaw = _userGross * 0.2;
    const _inss = _inssRaw < InssLimit ? _inssRaw : InssLimit;

    return {
      _kunlatek,
      _devGross,
      _managerGross,
      _acquireGross,
      _issPisCofins: value - _totalGrossValue,
      _inss,
      _net: _userGross - _inss,
      _isDev,
      _isAcquire,
      _isManager
    };
  };

  return (
    <Stack
      margin="8"
      spacing="8"
      borderWidth="1px"
      bgColor="#012340"
      rounded="lg"
      className="sm:w-[450px] p-4 sm:p-8"
    // width="450px"
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
              value={totalGrossValue}
              onChange={({ target }) => handleGrossValue(target.value)}
            />
          </InputGroup>
        </OrderSummaryItem>
        <OrderSummaryItem
          label="Você é dev?"
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
              isChecked={isDev}
              onChange={({ target }) => handleGrossValue(target.checked, 'dev')}
            />
          </InputGroup>
        </OrderSummaryItem>
        <OrderSummaryItem
          label="Você captou o projeto?"
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
              isChecked={isAcquire}
              onChange={({ target }) => handleGrossValue(target.checked, 'acquire')}
            />
          </InputGroup>
        </OrderSummaryItem>
        <OrderSummaryItem
          label="Você gerenciará o projeto?"
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
              isChecked={isManager}
              onChange={({ target }) => handleGrossValue(target.checked, 'manager')}
            />
          </InputGroup>
        </OrderSummaryItem>
        <OrderSummaryItem
          tooltipLabel="ISS + PIS + COFINS incide sob o valor bruto e é fixado em 5,65%"
          label="Imposto(ISS+PIS+COFINS)"
          isNegativeValue={true}
          value={formatPrice(issPisCofins)}
        />
        <OrderSummaryItem
          label="Kunlatek"
          tooltipLabel={'Kunlatek incide sob o valor bruto - Impostos(Iss PIS e COFINS) e é fixado em ' + KunlatekFee * 100 + '%'}
          isNegativeValue={true}
          value={formatPrice(kunlatek)}
        />
        <OrderSummaryItem label="Valor por dev"
          tooltipLabel={`Valor total: ${formatPrice(devGross * Founders)} para 3 devs`} value={formatPrice(devGross)} />
        <OrderSummaryItem label="Valor gerenciamento" tooltipLabel='Valor Bruto' value={formatPrice(managerGross)} />
        <OrderSummaryItem label="Valor captação" tooltipLabel='Valor Bruto' value={formatPrice(acquireGross)} />

        <OrderSummaryItem
          label="Imposto(INSS)"
          tooltipLabel="INSS incide sob o valor bruto do dev e é fixado em 20% com teto de R$ 1400,00"
          isNegativeValue={true}
          value={formatPrice(inss)}
        />

        <Flex justify="space-between">
          <Text fontSize="lg" color="#FFFFFF" fontWeight="semibold">
            Valor líquido
          </Text>
          <Text fontSize="xl" color="#FFFFFF" fontWeight="extrabold">
            {formatPrice(net)}
          </Text>
        </Flex>
      </Stack>
    </Stack>
  );
};