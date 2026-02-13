import svgPaths from "./svg-g0rj4622yz";

function Camada() {
  return (
    <div className="absolute inset-[4.54%_2.52%]" data-name="Camada 1">
      <div className="absolute inset-[-5%_-2.65%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 703.19 389.95">
          <g id="Camada 1">
            <path d={svgPaths.p3d1bf00} fill="var(--fill-0, #D7F20D)" id="Vector" stroke="var(--stroke-0, #D7F20D)" strokeMiterlimit="10" strokeWidth="35.43" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Ativo() {
  return (
    <div className="h-[389.95px] overflow-clip relative w-[703.21px]" data-name="Ativo 38 2">
      <Camada />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-[calc(50%+0.29px)] size-[772.981px] top-[calc(50%+0.24px)]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "21.65625" } as React.CSSProperties}>
        <div className="flex-none rotate-135">
          <Ativo />
        </div>
      </div>
    </div>
  );
}