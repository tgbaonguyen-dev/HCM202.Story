import Image from 'next/image';
import type { ReactElement } from 'react';
import type { ArchiveImage } from '@/lib/content';

export function ArchivePhoto({ photo, className, priority }: { photo: ArchiveImage; className: string; priority: boolean }): ReactElement {
  return (
    <figure className={`archive-photo ${className}`}>
      <div className="photo-window">
        <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} priority={priority} sizes="(max-width: 700px) 100vw, 75vw" />
      </div>
      <figcaption>
        <a href={photo.source} target="_blank" rel="noreferrer">Nguồn: Wikimedia Commons · {photo.author}</a>
        <span><a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a> · Hiển thị cắt khung</span>
      </figcaption>
    </figure>
  );
}
