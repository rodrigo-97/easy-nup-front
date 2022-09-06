import { useEffect, useState } from "react";
import { getContractualizationsCount } from "../../../services/Company";
import { Tile } from "../../Components/Tailwind/Tile";

export function HomePage() {
  const [contractualizationsCount, setContractualizationsCount] = useState(0);

  useEffect(() => {
    getContractualizationsCount().then(({ data }) => {
      setContractualizationsCount(data.count);
    });
  }, []);

  return (
    <div>
      <p className="text-4xl font-bold mb-10">Dashboard</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <Tile>
          <p className="text-lg truncate">Contratualizações</p>
          <p className="font-bold text-3xl">{contractualizationsCount}</p>
        </Tile>
        <Tile>
          <p className="text-lg truncate">Contratualizações</p>
          <p className="font-bold text-3xl">{contractualizationsCount}</p>
        </Tile>
        <Tile>
          <p className="text-lg truncate">Contratualizações</p>
          <p className="font-bold text-3xl">{contractualizationsCount}</p>
        </Tile>
        <Tile>
          <p className="text-lg truncate">Contratualizações</p>
          <p className="font-bold text-3xl">{contractualizationsCount}</p>
        </Tile>
      </div>
    </div>
  );
}
