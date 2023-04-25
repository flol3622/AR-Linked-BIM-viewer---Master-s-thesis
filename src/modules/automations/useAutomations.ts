import { Viewer } from "@xeokit/xeokit-sdk";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { autoMode, query } from "~/atoms";
import GeoSPARQLauto from "./GeoSPARQL";

export default function useAutomations(
  viewer: React.MutableRefObject<Viewer | undefined>
): void {
  const mode = useRecoilValue(autoMode);
  const setQuery = useSetRecoilState(query);

  useEffect(() => {
    let automation: NodeJS.Timer | undefined;

    switch (mode) {
      case "GEO":
        automation = GeoSPARQLauto(viewer, setQuery);
        break;
      case "BOT":
        // BOTauto(viewer, setQuery);
        break;
      default:
        console.log("manual mode");
    }

    return () => {
      if (automation) clearInterval(automation);
    };
  }, [mode]);
}

export {};
