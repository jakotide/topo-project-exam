import { navLinks } from "../Data";
import { LinkItem } from "../LinkItem";

export const Nav = () => {
  return (
    <nav>
      <menu>
        {navLinks.map((data, index) => {
          return <LinkItem key={index} data={{ ...data, index }}></LinkItem>;
        })}
      </menu>
    </nav>
  );
};
