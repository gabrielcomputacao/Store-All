import Image from 'next/image';

export function LoaderSvg() {
  return (
    <Image src="/icons/tube-spinner.svg" alt="Logo" width={150} height={150} />
  );
}
