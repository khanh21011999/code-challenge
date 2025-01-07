import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdSwapVert, MdKeyboardArrowDown } from "react-icons/md";
import {
  SwapContainer,
  Title,
  SwapForm,
  TokenInput,
  Input,
  TokenSelector,
  TokenImage,
  TokenSymbol,
  SwapButton,
  SwapIcon,
  TokenList,
  TokenOption,
  PriceInfo,
  OutputValue,
} from "./styles";

interface Token {
  currency: string;
  price: number;
  date: string;
}

interface TokenData {
  [key: string]: {
    price: number;
    date: string;
  };
}

const CurrencySwap: React.FC = () => {
  const [fromToken, setFromToken] = useState<string>("");
  const [toToken, setToToken] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [outputAmount, setOutputAmount] = useState<string>("0.0");
  const [tokens, setTokens] = useState<TokenData>({});
  const [showFromTokens, setShowFromTokens] = useState<boolean>(false);
  const [showToTokens, setShowToTokens] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [outputLoading, setOutputLoading] = useState(false);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [closingDropdown, setClosingDropdown] = useState<"from" | "to" | null>(
    null
  );

  const formatNumber = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num === 0) return "0.0";
    return num.toFixed(3);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    if (Object.keys(tokens).length > 0) {
      const firstToken = Object.keys(tokens)[0];
      const secondToken = Object.keys(tokens)[1] || firstToken;
      if (!fromToken) setFromToken(firstToken);
      if (!toToken) setToToken(secondToken);
    }
  }, [tokens]);

  const fetchTokens = async () => {
    try {
      const { data } = await axios.get<Token[]>(
        "https://interview.switcheo.com/prices.json"
      );

      const tokenMap: TokenData = {};
      data.forEach((token) => {
        if (
          !tokenMap[token.currency] ||
          new Date(token.date) > new Date(tokenMap[token.currency].date)
        ) {
          tokenMap[token.currency] = {
            price: token.price,
            date: token.date,
          };
        }
      });
      setTokens(tokenMap);
    } catch (err) {
      console.error("Failed to fetch token prices:", err);
    }
  };

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSwapping(true);
    setOutputLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const rate = calculateExchangeRate();
    if (rate && amount) {
      const result = formatNumber(
        (parseFloat(amount) * parseFloat(rate)).toString()
      );
      setOutputAmount(result);
    }

    setIsSwapping(false);
    setOutputLoading(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      let formattedValue = value;
      const parts = value.split(".");

      if (parts[0].length > 5) {
        parts[0] = parts[0].slice(0, 5);
      }

      const num = parseInt(parts[0]);
      if (num > 10000) {
        parts[0] = "10000";
      }

      if (parts.length > 1) {
        formattedValue = parts[0] + "." + parts[1].slice(0, 6);
      } else {
        formattedValue = parts[0];
      }

      setAmount(formattedValue);
    }
  };

  const switchTokens = async () => {
    if (isSwapping) return;

    setOutputLoading(true);
    setIsSwapping(true);
    setSwapAnimation(true);

    await new Promise((resolve) => setTimeout(resolve, 250));

    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setAmount(outputAmount);

    await new Promise((resolve) => setTimeout(resolve, 250));

    const rate = calculateExchangeRate();
    if (rate && outputAmount) {
      const result = formatNumber(
        (parseFloat(outputAmount) * parseFloat(rate)).toString()
      );
      setOutputAmount(result);
    }

    setSwapAnimation(false);
    setOutputLoading(false);
    setIsSwapping(false);
  };

  const getTokenImage = (currency: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  };

  const calculateExchangeRate = () => {
    if (!fromToken || !toToken || !tokens[fromToken] || !tokens[toToken])
      return null;
    return formatNumber(
      (tokens[toToken].price / tokens[fromToken].price).toString()
    );
  };

  return (
    <SwapContainer>
      <Title>Swap Currencies</Title>
      <SwapForm onSubmit={handleSwap}>
        <TokenInput $isSwapping={swapAnimation} $isTop>
          <Input
            type="text"
            placeholder="0.0"
            value={amount}
            onChange={handleAmountChange}
          />
          <TokenSelector
            onClick={() => {
              if (showToTokens) {
                setClosingDropdown("to");
                setTimeout(() => {
                  setShowToTokens(false);
                  setClosingDropdown(null);
                }, 300);
              }
              if (showFromTokens) {
                setClosingDropdown("from");
                setTimeout(() => {
                  setShowFromTokens(false);
                  setClosingDropdown(null);
                }, 300);
              } else {
                setShowFromTokens(true);
              }
            }}
            aria-expanded={showFromTokens}
          >
            <TokenImage src={getTokenImage(fromToken)} alt={fromToken} />
            <MdKeyboardArrowDown size={24} color="white" />
          </TokenSelector>
          {(showFromTokens || closingDropdown === "from") && (
            <TokenList $isClosing={closingDropdown === "from"}>
              {Object.entries(tokens).map(([currency]) => (
                <TokenOption
                  key={currency}
                  onClick={() => {
                    setFromToken(currency);
                    setClosingDropdown("from");
                    setTimeout(() => {
                      setShowFromTokens(false);
                      setClosingDropdown(null);
                    }, 300);
                  }}
                >
                  <TokenImage src={getTokenImage(currency)} alt={currency} />
                  <TokenSymbol>{currency}</TokenSymbol>
                </TokenOption>
              ))}
            </TokenList>
          )}
        </TokenInput>

        <SwapIcon
          onClick={switchTokens}
          type="button"
          disabled={isSwapping}
          $isSwapping={swapAnimation}
        >
          <MdSwapVert size={32} />
        </SwapIcon>

        <TokenInput $isOutput $isSwapping={swapAnimation}>
          <OutputValue $isLoading={outputLoading}>{outputAmount}</OutputValue>
          <TokenSelector
            onClick={() => {
              if (showFromTokens) {
                setClosingDropdown("from");
                setTimeout(() => {
                  setShowFromTokens(false);
                  setClosingDropdown(null);
                }, 300);
              }
              if (showToTokens) {
                setClosingDropdown("to");
                setTimeout(() => {
                  setShowToTokens(false);
                  setClosingDropdown(null);
                }, 300);
              } else {
                setShowToTokens(true);
              }
            }}
            aria-expanded={showToTokens}
          >
            <TokenImage src={getTokenImage(toToken)} alt={toToken} />
            <MdKeyboardArrowDown size={24} color="white" />
          </TokenSelector>
          {(showToTokens || closingDropdown === "to") && (
            <TokenList $isClosing={closingDropdown === "to"}>
              {Object.entries(tokens).map(([currency]) => (
                <TokenOption
                  key={currency}
                  onClick={() => {
                    setToToken(currency);
                    setClosingDropdown("to");
                    setTimeout(() => {
                      setShowToTokens(false);
                      setClosingDropdown(null);
                    }, 300);
                  }}
                >
                  <TokenImage src={getTokenImage(currency)} alt={currency} />
                  <TokenSymbol>{currency}</TokenSymbol>
                </TokenOption>
              ))}
            </TokenList>
          )}
        </TokenInput>

        {fromToken && toToken && (
          <PriceInfo>
            1 {fromToken} = {calculateExchangeRate()} {toToken}
          </PriceInfo>
        )}

        <SwapButton type="submit" $isLoading={isSwapping}>
          {isSwapping ? "Swapping..." : "Swap"}
        </SwapButton>
      </SwapForm>
    </SwapContainer>
  );
};

export default CurrencySwap;
