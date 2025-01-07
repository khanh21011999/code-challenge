import styled, { keyframes, css } from "styled-components";

const swapTopToBottom = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const swapBottomToTop = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
`;

export const shimmerAnimation = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

export const SwapContainer = styled.div`
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
  border-radius: 24px;
  color: white;
`;

export const Title = styled.h1`
  font-size: 24px;
  color: white;
  margin-bottom: 2rem;
  text-align: center;
`;

export const SwapForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TokenInput = styled.div<{
  $isOutput?: boolean;
  $isSwapping?: boolean;
  $isTop?: boolean;
}>`
  position: relative;
  background: ${(props) =>
    props.$isOutput ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 20px;
  padding: 1rem;
  opacity: ${(props) => (props.$isOutput ? 0.9 : 1)};
  cursor: ${(props) => (props.$isOutput ? "default" : "text")};
  border: ${(props) =>
    props.$isOutput
      ? "1px solid rgba(255, 255, 255, 0.1)"
      : "2px solid rgba(255, 255, 255, 0.3)"};
  box-shadow: ${(props) =>
    props.$isOutput ? "none" : "0 4px 12px rgba(0, 0, 0, 0.1)"};
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${(props) =>
      props.$isOutput
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(255, 255, 255, 0.4)"};
    box-shadow: ${(props) =>
      props.$isOutput ? "none" : "0 4px 16px rgba(0, 0, 0, 0.15)"};
  }

  animation: ${(props) =>
    props.$isSwapping
      ? props.$isTop
        ? css`
            ${swapTopToBottom} 0.5s ease
          `
        : css`
            ${swapBottomToTop} 0.5s ease
          `
      : "none"};
`;

export const Input = styled.input`
  width: calc(100% - 120px);
  min-width: 100px;
  border: none;
  background: none;
  font-size: 40px;
  font-weight: ${(props) => (props.readOnly ? "400" : "600")};
  color: white;
  outline: none;
  padding: 0;
  opacity: ${(props) => (props.readOnly ? 0.7 : 1)};
  cursor: ${(props) => (props.readOnly ? "default" : "text")};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${(props) =>
      props.readOnly ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.6)"};
    font-weight: 400;
  }

  &:focus::placeholder {
    color: ${(props) =>
      props.readOnly ? "rgba(255, 255, 255, 0.4)" : "rgba(255, 255, 255, 0.7)"};
  }
`;

export const TokenSelector = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-50%) scale(1.02);
  }

  &[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }
`;

export const TokenImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

export const TokenSymbol = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

export const SwapIcon = styled.button<{ $isSwapping?: boolean }>`
  width: 48px;
  height: 48px;
  padding: 12px;
  margin: -28px auto;
  background: #1e3a8a;
  border: 2px solid #1e40af;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  z-index: 1;
  color: white;
  transition: all 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.5s ease;
    transform: ${(props) =>
      props.$isSwapping
        ? "translate(-50%, -50%) rotate(180deg)"
        : "translate(-50%, -50%)"};
  }

  &:hover {
    background: #1e40af;
    border-color: #1e4ed8;
    transform: rotate(180deg);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    animation: none;
  }
`;

export const SwapButton = styled.button<{ $isLoading?: boolean }>`
  width: 100%;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: ${(props) => (props.$isLoading ? 0.7 : 1)};

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TokenList = styled.div<{ $isClosing?: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(30, 58, 138, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  animation: ${(props) => (props.$isClosing ? fadeOut : fadeIn)} 0.3s ease;
  transform-origin: top center;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

export const ShimmerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 0;

  &::before {
    content: "";
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(229, 231, 235, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1s infinite linear;
  }

  &::after {
    content: "";
    flex: 1;
    height: 24px;
    border-radius: 4px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 25%,
      rgba(229, 231, 235, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 75%
    );
    background-size: 200% 100%;
    animation: ${shimmerAnimation} 1s infinite linear;
  }
`;

export const TokenOption = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  &:last-child:after {
    display: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background: rgba(255, 255, 255, 0.15);
  }
`;

export const PriceInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  text-align: center;
  margin-top: 16px;
`;

export const ErrorMessage = styled.div`
  color: #ff4d4d;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
`;

export const OutputValue = styled.div<{ $isLoading?: boolean }>`
  width: calc(100% - 120px);
  min-width: 100px;
  font-size: 40px;
  font-weight: 500;
  color: white;
  padding: 0;
  margin: 0;
  transition: all 0.3s ease;
  text-align: left;

  ${(props) =>
    props.$isLoading &&
    css`
      background: linear-gradient(
        90deg,
        rgba(243, 244, 246, 0.1) 25%,
        rgba(229, 231, 235, 0.2) 50%,
        rgba(243, 244, 246, 0.1) 75%
      );
      background-size: 150% 100%;
      animation: ${shimmerAnimation} 1s infinite linear;
      border-radius: 4px;
      color: transparent;
      width: 60%;
    `}
`;

export const OutputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

export const OutputHeader = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
`;

export const OutputContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const OutputAmount = styled.div<{ $isLoading?: boolean }>`
  font-size: 32px;
  font-weight: 700;
  color: white;
  transition: opacity 0.3s ease;
  opacity: ${({ $isLoading }) => ($isLoading ? 0.7 : 1)};

  @keyframes pulse {
    0% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.7;
    }
  }

  animation: ${({ $isLoading }) => ($isLoading ? "pulse 1s infinite" : "none")};
`;
