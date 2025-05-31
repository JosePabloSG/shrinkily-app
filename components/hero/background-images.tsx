import Image from "next/image"

export function BackgroundImages() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Image
        src="/images/blob-scene-desktop.svg"
        alt=""
        fill
        priority
        className="hidden md:block object-cover"
        sizes="100vw"
      />
      <Image
        src="/images/blob-scene-mobile.svg"
        alt=""
        fill
        priority
        className="md:hidden object-cover"
        sizes="100vw"
      />
    </div>
  )
}
