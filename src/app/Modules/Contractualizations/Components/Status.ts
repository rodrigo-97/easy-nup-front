import tw from "tailwind-styled-components";
import { ContractStatus } from "../../../../enums/ContractStatus";

type Props = {
  $status: ContractStatus;
};

export const TwStatus = tw.p<Props>`
  ${({ $status }: Props) => {
    if ($status === ContractStatus.FINISHED) {
      return "text-green-400";
    }

    if ($status === ContractStatus.IN_PROGRESS) {
      return "text-blue-400";
    }

    if ($status === ContractStatus.PENDING) {
      return "text-orange-400";
    }
  }}
  inline-flex
  items-center
  text-base
  font-semibold
`;
