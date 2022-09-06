import tw from "tailwind-styled-components";

type InputProps = {
  $hasError?: boolean;
};

export const TwInput = tw.input<InputProps>`
  ${(p: InputProps) =>
    p.$hasError ? "border border-red-700" : "border-gray-700"}
  w-full
  dark:bg-gray-700
  dark:text-gray-200
  dark:placeholder:text-gray-400
  outline-none
  px-4
  h-12
  rounded-lg
  transition-all
  duration-300
  ease-in-out
`;

export const TwInputLabel = tw.div`
  pb-2
`;

export const TwFormGroup = tw.div`

`;

export const TwFormError = tw.p`
  mt-1
  text-red-700
  text-sm
  transition-all
  duration-300
  ease-in-out
`;
