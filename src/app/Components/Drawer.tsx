import { useUser } from "../../contexts/UserContext";
import { ClientSideOptions } from "./ClientSideOptions";
import { CompanySideOptions } from "./CompanySideOptions";

type Props = {
  setIsOpen: Function;
  isOpen: boolean;
  toggleDrawer: Function;
};

export function Drawer({ setIsOpen, isOpen, toggleDrawer }: Props) {
  const { isCompany } = useUser();

  return (
    <main
      className={
        " fixed overflow-hidden z-20 bg-gray-900 bg-opacity-75 backdrop-blur-sm inset-0 transform ease-in-out" +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-2/3 max-w-lg right-0 absolute bg-white dark:bg-gray-900 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="p-4 font-bold text-lg">EasyNup</header>
          {isCompany ? (
            <CompanySideOptions toggleDrawer={toggleDrawer} />
          ) : (
            <ClientSideOptions toggleDrawer={toggleDrawer} />
          )}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
