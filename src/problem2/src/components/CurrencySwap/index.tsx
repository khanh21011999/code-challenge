import React, { useState, useEffect, useRef } from "react";
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
  ShimmerDiv,
  NoResults,
  ErrorMessage,
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
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [closingDropdown, setClosingDropdown] = useState<"from" | "to" | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredTokens, setFilteredTokens] = useState<TokenData>({});
  const fromTokenRef = useRef<HTMLDivElement>(null);
  const toTokenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromTokenRef.current &&
        !fromTokenRef.current.contains(event.target as Node) &&
        showFromTokens
      ) {
        setClosingDropdown("from");
        setTimeout(() => {
          setShowFromTokens(false);
          setClosingDropdown(null);
        }, 300);
      }
      if (
        toTokenRef.current &&
        !toTokenRef.current.contains(event.target as Node) &&
        showToTokens
      ) {
        setClosingDropdown("to");
        setTimeout(() => {
          setShowToTokens(false);
          setClosingDropdown(null);
        }, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFromTokens, showToTokens]);

  const formatNumber = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num) || num === 0) return "0.0";
    const [whole, decimal] = num.toString().split(".");
    if (!decimal) return whole;
    return `${whole}.${decimal.slice(0, 8)}`;
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      setIsSearching(true);
      setFilteredTokens({});

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const filtered = Object.entries(tokens).reduce(
        (acc, [currency, data]) => {
          if (currency.toLowerCase().includes(searchQuery.toLowerCase())) {
            acc[currency] = data;
          }
          return acc;
        },
        {} as TokenData
      );

      setFilteredTokens(filtered);
      setIsSearching(false);
    };

    const debounceTimeout = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        setFilteredTokens(tokens);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, tokens]);

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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const rate = tokens[toToken].price / tokens[fromToken].price;
    if (rate && amount) {
      const result = formatNumber((parseFloat(amount) * rate).toString());
      setOutputAmount(result);
    }

    setIsSwapping(false);
  };

  const [error, setError] = useState<string>("");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);

      if (value === "") {
        setError("");
        setOutputAmount("0.0");
        return;
      }

      const num = parseFloat(value);
      if (num > 10000) {
        setError("Maximum value is 10000");
        return;
      }

      if (value.includes(".")) {
        const [, decimal] = value.split(".");
        if (decimal && decimal.length > 8) {
          setError("Maximum 8 decimal places allowed");
          return;
        }
      }
      setError("");
    }
  };

  const switchTokens = async () => {
    if (isSwapping || showFromTokens || showToTokens) return;

    setIsSwapping(true);
    setSwapAnimation(true);

    await new Promise((resolve) => setTimeout(resolve, 250));

    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    const currentAmount = amount;

    await new Promise((resolve) => setTimeout(resolve, 250));

    const rate = tokens[toToken].price / tokens[fromToken].price;
    if (rate && currentAmount) {
      const result = formatNumber(
        (parseFloat(currentAmount) * rate).toString()
      );
      setOutputAmount(result);
    }

    setSwapAnimation(false);
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

  const ShimmerLoadingOption = () => (
    <>
      {[1, 2, 3, 4].map((index) => (
        <TokenOption key={index} as="div" style={{ cursor: "default" }}>
          <ShimmerDiv />
        </TokenOption>
      ))}
    </>
  );

  return (
    <SwapContainer>
      <Title>Swap Currencies</Title>
      <SwapForm onSubmit={handleSwap}>
        <TokenInput
          ref={fromTokenRef}
          $isSwapping={swapAnimation}
          $isTop
          $hasError={!!error}
        >
          <Input
            type="text"
            placeholder="0.0"
            value={amount}
            onChange={handleAmountChange}
          />
          <TokenSelector
            onClick={(e) => {
              e.preventDefault();
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
              <Input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  fontSize: "16px",
                  margin: "8px",
                  width: "calc(100% - 16px)",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "8px",
                }}
                onClick={(e) => e.stopPropagation()}
              />
              {isSearching ? (
                <ShimmerLoadingOption />
              ) : Object.keys(filteredTokens).length === 0 ? (
                <NoResults>No tokens found</NoResults>
              ) : (
                Object.entries(filteredTokens).map(([currency]) => {
                  return (
                    <TokenOption
                      key={currency}
                      onClick={() => {
                        const rate =
                          tokens[currency].price / tokens[toToken].price;
                        const result = amount
                          ? formatNumber((parseFloat(amount) * rate).toString())
                          : "0.0";
                        setFromToken(currency);
                        setOutputAmount(result);
                        setClosingDropdown("from");
                        setTimeout(() => {
                          setShowFromTokens(false);
                          setClosingDropdown(null);
                        }, 300);
                      }}
                    >
                      <TokenImage
                        src={getTokenImage(currency)}
                        alt={currency}
                      />
                      <TokenSymbol>{currency}</TokenSymbol>
                    </TokenOption>
                  );
                })
              )}
            </TokenList>
          )}
        </TokenInput>

        <SwapIcon
          onClick={switchTokens}
          type="button"
          disabled={isSwapping || !!error}
          $isSwapping={swapAnimation}
        >
          <MdSwapVert size={32} />
        </SwapIcon>

        <TokenInput ref={toTokenRef} $isOutput>
          <OutputValue $isLoading={isSwapping}>{outputAmount}</OutputValue>
          <TokenSelector
            onClick={(e) => {
              e.preventDefault();
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
              <Input
                type="text"
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  fontSize: "16px",
                  margin: "8px",
                  width: "calc(100% - 16px)",
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  padding: "8px",
                }}
                onClick={(e) => e.stopPropagation()}
              />
              {isSearching ? (
                <ShimmerLoadingOption />
              ) : Object.keys(filteredTokens).length === 0 ? (
                <NoResults>No tokens found</NoResults>
              ) : (
                Object.entries(filteredTokens).map(([currency]) => {
                  return (
                    <TokenOption
                      key={currency}
                      onClick={() => {
                        const rate =
                          tokens[fromToken].price / tokens[currency].price;
                        const result = amount
                          ? formatNumber((parseFloat(amount) * rate).toString())
                          : "0.0";
                        setToToken(currency);
                        setOutputAmount(result);
                        setClosingDropdown("to");
                        setTimeout(() => {
                          setShowToTokens(false);
                          setClosingDropdown(null);
                        }, 300);
                      }}
                    >
                      <TokenImage
                        src={getTokenImage(currency)}
                        alt={currency}
                      />
                      <TokenSymbol>{currency}</TokenSymbol>
                    </TokenOption>
                  );
                })
              )}
            </TokenList>
          )}
        </TokenInput>

        {fromToken && toToken && (
          <PriceInfo>
            1 {fromToken} = {calculateExchangeRate()} {toToken}
          </PriceInfo>
        )}

        <ErrorMessage $isVisible={!!error}>{error}</ErrorMessage>
        <SwapButton
          type="submit"
          $isLoading={isSwapping}
          disabled={Boolean(error) || amount === "" || isSwapping}
        >
          {isSwapping ? "Converting..." : "Convert"}
        </SwapButton>
      </SwapForm>
    </SwapContainer>
  );
};

export default CurrencySwap;
