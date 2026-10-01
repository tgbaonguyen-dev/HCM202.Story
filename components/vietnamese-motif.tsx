import Image from 'next/image';
import type { ReactElement } from 'react';
import { dragonMotif, drumMotif, lotusMotif, type ArchiveImage } from '@/lib/content';

export type MotifKind = 'lotus' | 'drum' | 'dragon';

type VietnameseMotifProps = Readonly<{
  kind: MotifKind;
  className: string;
}>;

function getMotif(kind: MotifKind): ArchiveImage {
  const motifs: Readonly<Record<MotifKind, ArchiveImage>> = {
    lotus: lotusMotif,
    drum: drumMotif,
    dragon: dragonMotif,
  };

  return motifs[kind];
}

export function VietnameseMotif({ kind, className }: VietnameseMotifProps): ReactElement {
  const motif: ArchiveImage = getMotif(kind);

  return (
    <span className={`vietnamese-motif vietnamese-motif-${kind} ${className}`} aria-hidden="true">
      <Image src={motif.src} alt="" width={motif.width} height={motif.height} sizes="(max-width: 700px) 55vw, 32vw" unoptimized />
    </span>
  );
}
