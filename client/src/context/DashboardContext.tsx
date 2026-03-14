/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react';

const DashboardContext = createContext({
  setIsBlurred: (_val: boolean | ((val: boolean) => boolean)) => {},
  isHidden: false,
  setIsHidden: (_val: boolean | ((val: boolean) => boolean)) => {},
  isBlurred: false,
});

export default DashboardContext;
