import React, { useEffect } from 'react';
import styled from "styled-components";

import DepositTable from "@components/Deposit";
import useVenmoDeposits from '@hooks/venmo/useDeposits';
import useHdfcDeposits from '@hooks/hdfc/useDeposits';
import useVenmoRegistration from '@hooks/venmo/useRegistration';
import useHdfcRegistration from '@hooks/hdfc/useRegistration';
import useBalances from '@hooks/useBalance';
import usePlatformSettings from '@hooks/usePlatformSettings';
import useMediaQuery from '@hooks/useMediaQuery';


export const Deposit: React.FC = () => {
  /*
   * Contexts
   */

  const currentDeviceSize = useMediaQuery();

  const {
    isRegistered: isRegisteredOnVenmo
  } = useVenmoRegistration();

  const {
    refetchDeposits: refetchVenmoDeposits,
    shouldFetchDeposits: shouldFetchVenmoDeposits,
    refetchDepositIntents: refetchVenmoDepositIntents,
    shouldFetchDepositIntents: shouldFetchVenmoDepositIntents,
  } = useVenmoDeposits();

  const { refetchUsdcBalance, shouldFetchUsdcBalance } = useBalances();

  const {
    refetchDeposits: refetchHdfcDeposits,
    shouldFetchDeposits: shouldFetchHdfcDeposits,
    refetchDepositIntents: refetchHdfcDepositIntents,
    shouldFetchDepositIntents: shouldFetchHdfcDepositIntents,
  } = useHdfcDeposits();

  const {
    isRegistered: isRegisteredOnHdfc
  } = useHdfcRegistration();

  const {
    PaymentPlatform,
    paymentPlatform
  } = usePlatformSettings();

  /*
   * Hooks
   */

  useEffect(() => {
    switch (paymentPlatform) {
      case PaymentPlatform.VENMO:
        if (shouldFetchVenmoDeposits) {
          refetchVenmoDeposits?.();
        }

        if (shouldFetchVenmoDepositIntents) {
          refetchVenmoDepositIntents?.();
        }

        if (shouldFetchUsdcBalance && isRegisteredOnVenmo) {
          refetchUsdcBalance?.();
        }
        break;

      case PaymentPlatform.HDFC:
        if (shouldFetchHdfcDeposits) {
          refetchHdfcDeposits?.();
        }

        if (shouldFetchHdfcDepositIntents) {
          refetchHdfcDepositIntents?.();
        }

        if (shouldFetchUsdcBalance && isRegisteredOnHdfc) {
          refetchUsdcBalance?.();
        }
        break;

      default:
        throw new Error(`Unknown payment platform: ${paymentPlatform}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper $isMobile={currentDeviceSize === 'tablet' || currentDeviceSize === 'mobile'}>
      <Main>
        <DepositTable />
      </Main>
    </PageWrapper>
  );
};

const PageWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 12px 8px;
  padding-bottom: ${props => props.$isMobile ? '7rem' : '4rem'};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

