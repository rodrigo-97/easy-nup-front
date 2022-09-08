import tw from "tailwind-styled-components";
import { ContractStatus } from "../../../../enums/ContractStatus";

type Props = {
  $status: ContractStatus;
};

export const TwTile = tw.div<Props>`
  ${({ $status }: Props) => {
    const baseStyle = "border-l-4 ";
    if ($status === ContractStatus.FINISHED) {
      return baseStyle.concat(
        "border-green-400 bg-green-100 dark:bg-opacity-15"
      );
    }

    if ($status === ContractStatus.IN_PROGRESS) {
      return baseStyle.concat("border-blue-400 bg-blue-100 dark:bg-opacity-15");
    }

    if ($status === ContractStatus.PENDING) {
      return baseStyle.concat(
        "border-orange-400 bg-orange-100 dark:bg-opacity-15"
      );
    }

    if ($status === ContractStatus.CANCELED) {
      return baseStyle.concat("border-red-700 bg-red-100 dark:bg-opacity-15");
    }

    if ($status === ContractStatus.NOT_SUBSCRIBED) {
      return baseStyle.concat(
        "border-purple-400 bg-purple-100 dark:bg-opacity-15"
      );
    }
  }}
  flex
  justify-between
  space-x-10
  mb-3
  p-3
  cursor-pointer
  hover:translate-x-1
  transition-all
  duration-200
  ease-in-out
`;
