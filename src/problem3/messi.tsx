// import useMemo and things

/**
 * Known Issues and Improvements in Original Code
 * --------------------------------------------
 *
 * 1. Type Safety Issues:
 *    - Improper typing of 'blockchain' parameter as 'any' in getPriority
 *    - Missing type definitions for BoxProps and related imports
 *    - Reference to undefined 'lhsPriority' in filter function
 *
 * 2. Performance Optimization:
 *    - Unnecessary dependency on 'prices' in useMemo causing extra renders
 *    - Multiple calls to getPriority during sort comparisons
 *    - Unoptimized chaining of array methods (.filter().sort())
 *
 * 3. Logic Errors:
 *    - Inverted filter condition (returns true for balances <= 0)
 *    - Incorrect use of undefined 'lhsPriority' instead of 'balancePriority'
 *
 * 4. Component Structure:
 *    - Unused 'formattedBalances' calculation
 *    - Missing memoization for derived state transformations
 *
 *
 * All these issues have been addressed in the current implementation below.
 */

interface Blockchain {
  blockchain: "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";
}

interface WalletBalance extends Blockchain {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: Blockchain["blockchain"]): number => {
    const priorities: Record<Blockchain["blockchain"], number> = {
      Osmosis: 100,
      Ethereum: 50,
      Arbitrum: 30,
      Zilliqa: 20,
      Neo: 20,
    };
    return priorities[blockchain] ?? -99;
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .map((balance: WalletBalance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
        priority: getPriority(balance.blockchain),
      }))
      .sort((lhs, rhs) => rhs.priority - lhs.priority);
  }, [balances]); // removed prices from dependencies

  const rows = useMemo(
    () =>
      sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }),
    [sortedBalances, prices]
  );

  return <div {...rest}>{rows}</div>;
};
