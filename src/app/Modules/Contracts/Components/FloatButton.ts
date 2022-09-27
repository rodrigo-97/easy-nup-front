import tw from "tailwind-styled-components";

export const TwFloatButton = tw.button`
  absolute
  top-0
  right-0
  -mt-3
  -mr-2
  z-10
  hidden
  group-hover:block
  bg-red-400
  dark:bg-red-500
  px-1
  w-6
  h-6
  text-xs
  text-white
  rounded-full
  transition-all
  duration-500
  ease-in-out
`;
