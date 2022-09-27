import tw from "tailwind-styled-components";

type MobileSidenavProps = {
  $isOpen: boolean
}

type MobileSidenavBackdropProps = {
  $isOpen: boolean
}

export const SideNav = tw.div`
bg-white
border-gray-200
dark:bg-gray-900
dark:border-gray-700
dark:text-white
  w-64
  overflow-y-auto
  py-4
  px-3
  min-h-[100vh]
  fixed
  hidden
  lg:block
`;

export const MobileSidenavBackdrop = tw.div<MobileSidenavBackdropProps>`
  bg-black
  h-screen
  w-full
  fixed
  top-0
  transition-all
  ease-in-out
  duration-500
  z-10

  ${({ $isOpen }: MobileSidenavProps) => {
    if ($isOpen) return `
      block
      bg-opacity-80
    `

    return `
      invisible
      bg-opacity-0
      z-10
    `
  }}
`

export const MobileSidenav = tw.aside<MobileSidenavProps>`
  bg-white
  dark:bg-gray-900
  fixed
  w-[350px]
  h-screen
  transition-all
  ease-in-out
  duration-500
  z-20
  left-0
  p-4

  ${({ $isOpen }: MobileSidenavProps) => {
    if ($isOpen) return `
      block
      translate-x-0
    `

    return `
      -translate-x-full
      invisible
    `
  }}
`
