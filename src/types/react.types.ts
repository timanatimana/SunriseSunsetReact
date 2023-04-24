import { ReactElement, ReactPortal } from "react";

type ReactText = string | number;
type ReactChild = ReactElement | ReactText;

type ReactNodeArray = Array<ReactNode>;
type ReactFragment = ReactNodeArray;
type ReactNode =
  | ReactChild
  | ReactFragment
  | ReactPortal
  | boolean
  | null
  | undefined;

export type Props = {
  children: ReactNode;
};

// source: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/d076add9f29db350a19bd94c37b197729cc02f87/types/react/index.d.ts
