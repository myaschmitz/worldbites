import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  type GeoData,
} from "react-simple-maps";
import type { CompletedCountry } from "../types";

// Maps ISO alpha-3 → ISO numeric (used as geo.id in world-atlas topojson)
const ALPHA3_TO_NUMERIC: Record<string, string> = {
  DZA:"012",AGO:"024",BEN:"204",BWA:"072",BFA:"854",BDI:"108",CMR:"120",CPV:"132",CAF:"140",TCD:"148",
  COM:"174",COG:"178",COD:"180",DJI:"262",EGY:"818",GNQ:"226",ERI:"232",ETH:"231",GAB:"266",GMB:"270",
  GHA:"288",GIN:"324",GNB:"624",CIV:"384",KEN:"404",LSO:"426",LBR:"430",LBY:"434",MDG:"450",MWI:"454",
  MLI:"466",MRT:"478",MUS:"480",MAR:"504",MOZ:"508",NAM:"516",NER:"562",NGA:"566",RWA:"646",SEN:"686",
  SYC:"690",SLE:"694",SOM:"706",ZAF:"710",SSD:"728",SDN:"729",SWZ:"748",TZA:"834",TGO:"768",TUN:"788",
  UGA:"800",ZMB:"894",ZWE:"716",
  AFG:"004",ARM:"051",AZE:"031",BHR:"048",BGD:"050",BTN:"064",BRN:"096",KHM:"116",CHN:"156",CYP:"196",
  GEO:"268",HKG:"344",IND:"356",IDN:"360",IRN:"364",IRQ:"368",ISR:"376",JPN:"392",JOR:"400",KAZ:"398",
  KWT:"414",KGZ:"417",LAO:"418",LBN:"422",MAC:"446",MYS:"458",MDV:"462",MNG:"496",MMR:"104",NPL:"524",
  PRK:"408",OMN:"512",PAK:"586",PSE:"275",PHL:"608",QAT:"634",SAU:"682",SGP:"702",KOR:"410",LKA:"144",
  SYR:"760",TWN:"158",TJK:"762",THA:"764",TLS:"626",TUR:"792",TKM:"795",ARE:"784",UZB:"860",VNM:"704",
  YEM:"887",
  ALB:"008",AUT:"040",BLR:"112",BEL:"056",BIH:"070",BGR:"100",HRV:"191",CZE:"203",DNK:"208",EST:"233",
  FIN:"246",FRA:"250",DEU:"276",GRC:"300",HUN:"348",ISL:"352",IRL:"372",ITA:"380",LVA:"428",LTU:"440",
  LUX:"442",MLT:"470",MDA:"498",MNE:"499",NLD:"528",MKD:"807",NOR:"578",POL:"616",PRT:"620",ROU:"642",
  RUS:"643",SRB:"688",SVK:"703",SVN:"705",ESP:"724",SWE:"752",CHE:"756",UKR:"804",GBR:"826",
  ATG:"028",BHS:"044",BRB:"052",BLZ:"084",CAN:"124",CRI:"188",CUB:"192",DMA:"212",DOM:"214",SLV:"222",
  GRD:"308",GTM:"320",HTI:"332",HND:"340",JAM:"388",MEX:"484",NIC:"558",PAN:"591",PRI:"630",TTO:"780",
  USA:"840",
  ARG:"032",BOL:"068",BRA:"076",CHL:"152",COL:"170",ECU:"218",GUY:"328",PRY:"600",PER:"604",SUR:"740",
  URY:"858",VEN:"862",
  AUS:"036",FJI:"242",KIR:"296",MHL:"584",FSM:"583",NRU:"520",NZL:"554",PLW:"585",PNG:"598",WSM:"882",
  SLB:"090",TON:"776",TUV:"798",VUT:"548",
};

const NUMERIC_TO_ALPHA3: Record<string, string> = Object.fromEntries(
  Object.entries(ALPHA3_TO_NUMERIC).map(([a3, num]) => [num, a3])
);

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  completedCountries: CompletedCountry[];
  currentMapId: string | null;
}

export default function WorldMap({ completedCountries, currentMapId }: WorldMapProps) {
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  const currentNumericId = currentMapId ? (ALPHA3_TO_NUMERIC[currentMapId] ?? null) : null;

  function getGeoInfo(geo: GeoData): { fill: string; hoverFill: string; tooltipText: string } {
    const numericId = String(geo.id);
    const alpha3 = NUMERIC_TO_ALPHA3[numericId];
    const completed = alpha3
      ? completedCountries.find((c) => c.countryId === alpha3)
      : undefined;
    const isCurrent = currentNumericId === numericId;

    let fill = "#334155";
    let hoverFill = "#475569";
    if (isCurrent) { fill = "#f59e0b"; hoverFill = "#fbbf24"; }
    else if (completed) { fill = "#22c55e"; hoverFill = "#4ade80"; }

    const tooltipText = completed
      ? `${geo.properties.name} · Completed ${new Date(completed.completedAt).toLocaleDateString()}`
      : geo.properties.name;

    return { fill, hoverFill, tooltipText };
  }

  return (
    <div className="w-full overflow-hidden rounded-xl bg-slate-900">
      <ComposableMap
        className="w-full"
        projectionConfig={{ scale: 147 }}
      >
        <ZoomableGroup>
          <Geographies geography={GEO_URL}>
            {({ geographies }: { geographies: GeoData[] }) =>
              geographies.map((geo: GeoData) => {
                const { fill, hoverFill, tooltipText } = getGeoInfo(geo);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke="#1e293b"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: hoverFill, outline: "none", cursor: "pointer" },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => setHoveredInfo(tooltipText)}
                    onMouseLeave={() => setHoveredInfo(null)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      <div className="flex items-center gap-4 px-3 pb-2 pt-0.5 text-xs text-slate-400">
        {hoveredInfo ? (
          <span className="flex-1 truncate font-medium text-white">{hoveredInfo}</span>
        ) : (
          <>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-green-500" /> Completed
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-amber-400" /> Current
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-sm bg-slate-600" /> Remaining
            </span>
          </>
        )}
      </div>
    </div>
  );
}
