import React, { useReducer, useRef } from "react";
import styled from 'styled-components';
import { X, ChevronDown } from 'react-feather';
import Link from '@mui/material/Link';

import { ThemedText } from '@theme/text';
import { colors } from '@theme/colors';
import { Overlay } from '@components/modals/Overlay';
import { PlatformRow } from '@components/modals/PlatformRow';
import { paymentPlatforms, paymentPlatformInfo, PaymentPlatformType } from '@helpers/types';
import { useOnClickOutside } from '@hooks/useOnClickOutside';
import { ZKP2P_SURVEY_FORM_LINK } from "../../helpers/docUrls";
import usePlatformSettings from "@hooks/usePlatformSettings";


export const PlatformSelector: React.FC = () => {
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)

  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)

  /*
   * Contexts
   */

  const { paymentPlatform, setPaymentPlatform, setCurrencyIndex } = usePlatformSettings();

  /*
   * Handlers
   */

  const handleOverlayClick = () => {
    toggleOpen();
  };

  const handleSelectPlatform = (platform: PaymentPlatformType) => {
    if (setPaymentPlatform && setCurrencyIndex) {
      setPaymentPlatform(platform);
      setCurrencyIndex(0);

      toggleOpen();
    }
  };

  /*
   * Component
   */

  return (
    <Wrapper ref={ref}>
      <CurrencyContainer onClick={toggleOpen}>
        <CurrencyLogoAndNameContainer>
          <CurrencyNameContainer>
            <CurrencyHeader>
              {'Platform'}
            </CurrencyHeader>
            <CurrencyNameLabel>
              {paymentPlatformInfo[paymentPlatform as PaymentPlatformType].platformName}
            </CurrencyNameLabel>
          </CurrencyNameContainer>
        </CurrencyLogoAndNameContainer>

        <StyledChevronDown/>
      </CurrencyContainer>

      {isOpen && (
        <ModalAndOverlayContainer>
          <Overlay onClick={handleOverlayClick}/>

          <ModalContainer>
            <TableHeader>
              <ThemedText.SubHeader style={{ textAlign: 'left' }}>
                Select a Platform
              </ThemedText.SubHeader>

              <button
                onClick={handleOverlayClick}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <StyledX/>
              </button>
            </TableHeader>

            <HorizontalDivider/>

            <Table>
              {paymentPlatforms.map((platform, index) => (
                <PlatformRow
                  key={`${index}`}
                  platformName={paymentPlatformInfo[platform].platformName}
                  isSelected={paymentPlatform === platform}
                  onRowClick={() => handleSelectPlatform(platform)}
                />
              ))}
            </Table>

            <HorizontalDivider/>

            <TableFooter>
              Let us know which networks you are interested in seeing ZKP2P add support
              for. <Link href={ ZKP2P_SURVEY_FORM_LINK } target="_blank">
                Give feedback ↗
              </Link>
            </TableFooter>
          </ModalContainer>
        </ModalAndOverlayContainer>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CurrencyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 188px;
  border-radius: 16px;
  border: 1px solid ${colors.defaultBorderColor};
  justify-content: space-between;
  align-items: center;
  background: ${colors.selectorColor};
  padding: 1.1rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${colors.selectorHover};
    border: 1px solid ${colors.selectorHoverBorder};
  }
`;

const CurrencyLogoAndNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  justify-content: flex-start;
`;

const CurrencyNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  justify-content: center;
  text-align: left;
`;

const CurrencyHeader = styled.div`
  font-size: 14px;
  color: #CED4DA;
`;

const CurrencyNameLabel = styled.div`
  font-size: 16px;
  color: #FFF;
`;

const StyledChevronDown = styled(ChevronDown)`
  width: 20px;
  height: 20px;
  color: #FFF;
`;

const ModalAndOverlayContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  align-items: flex-start;
  top: 0;
  left: 0;
  z-index: 10;
`;

const ModalContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: ${colors.container};
  color: #FFF;
  align-items: center;
  z-index: 20;
  
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const TableHeader = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 16px 20px;
`;

const HorizontalDivider = styled.div`
  width: 100%;
  border-top: 1px solid ${colors.defaultBorderColor};
`;

const StyledX = styled(X)`
  color: #FFF;
`;

const Table = styled.div`
  width: 100%;
  color: #616161;
  height: 284px;

  overflow-y: auto;
  scrollbar-width: thin;
`;

const TableFooter = styled.div`
  padding: 20px;
  font-size: 14px;
  text-align: left;
  line-height: 1.5;
`;
