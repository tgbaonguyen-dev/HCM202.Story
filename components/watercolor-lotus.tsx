import Image from 'next/image';
import type { ReactElement } from 'react';

type WatercolorLotusProps = Readonly<{
  className: string;
}>;

export function WatercolorLotus({ className }: WatercolorLotusProps): ReactElement {
  return <span className={`watercolor-lotus ${className}`} aria-hidden="true"><Image src="/images/motifs/lotus-watercolor-square.jpg" alt="" fill sizes="(max-width: 700px) 86vw, 720px" /></span>;
}
