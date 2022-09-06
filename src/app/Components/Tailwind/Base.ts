import tw from "tailwind-styled-components";

export const Base = tw.div`
  bg-gray-100
  border-gray-200
  dark:bg-gray-800
  dark:border-gray-600
  dark:text-white
`;

export const Block = tw(Base)`
  w-[200px]
  h-[200px]
`;
