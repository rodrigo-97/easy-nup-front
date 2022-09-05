import { useEffect, useState } from "react";
import { getContractualizationsCount } from "../../../services/Company";

export function HomePage() {
  const [contractualizationsCount, setContractualizationsCount] = useState(0);

  useEffect(() => {
    getContractualizationsCount().then(({ data }) => {
      setContractualizationsCount(data.count);
    });
  }, []);

  return (
    <div>
      <p className="display-6">Dashboard</p>

      <div className="mt-4">
        <div className="home-tile bg-primary-700 rounded p-4">
          <b>Nº de Contratualizações</b>
          <p className="display-1">{contractualizationsCount}</p>
        </div>
      </div>
    </div>
  );
}
