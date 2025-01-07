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
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #1e5631 0%, #2d8a4e 100%);
  border-radius: 24px;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
    props.$isOutput ? "rgba(26, 188, 156, 0.1)" : "rgba(26, 188, 156, 0.25)"};
  border-radius: 20px;
  padding: 1.2rem;
  cursor: ${(props) => (props.$isOutput ? "default" : "text")};
  border: 2px solid ${(props) =>
    props.$isOutput ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.2)"};
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  &:hover {
    border-color: ${(props) =>
      props.$isOutput ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.3)"};
    background: ${(props) =>
      props.$isOutput ? "rgba(26, 188, 156, 0.1)" : "rgba(26, 188, 156, 0.3)"};
  }

  &:focus-within {
    border-color: rgba(26, 188, 156, 0.5);
    box-shadow: 0 0 0 2px rgba(26, 188, 156, 0.2);
  }
`;

export const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  font-size: 40px;
  font-weight: ${(props) => (props.readOnly ? "400" : "600")};
  outline: none;
  padding: 8px 0;
  opacity: ${(props) => (props.readOnly ? 0.7 : 1)};
  cursor: ${(props) => (props.readOnly ? "default" : "text")};
  min-width: 0;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 400;
  }

  &:focus::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const TokenSelector = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(26, 188, 156, 0.2);
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  flex-shrink: 0;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: rgba(26, 188, 156, 0.3);
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
  background: #1abc9c;
  border: 2px solid #16a085;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  z-index: 1;
  color: white;
  transition: all 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

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
    background: #16a085;
    border-color: #1abc9c;
    transform: rotate(180deg);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
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
  background: #1abc9c;
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
    background: #16a085;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  background: #1e5631;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin-top: 8px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
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
  background: #1e5631;
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
    background: rgba(26, 188, 156, 0.1);
  }

  &:last-child:after {
    display: none;
  }

  &:hover {
    background: #2d8a4e;
  }

  &:active {
    background: #246e3f;
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
  background: rgba(26, 188, 156, 0.1);
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
