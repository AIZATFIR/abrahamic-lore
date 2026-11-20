import type { CSSProperties } from 'react'

/**
 * Custom icon set. The SVG files live in /public/assets/icons/<name>.svg.
 * Every icon is documented in /ICONS.md — update it whenever you add,
 * remove, or redraw an icon.
 */
export const ICON_NAMES = [
  'book',
  'dove',
  'sunrise',
  'columns',
  'star-of-david',
  'cross',
  'crescent',
  'mosque',
  'synagogue',
  'scroll',
  'link',
  'scales',
  'handshake',
  'lightning',
  'check',
  'x',
] as const

export type IconName = (typeof ICON_NAMES)[number]

interface IconProps {
  name: IconName
  /** Tailwind size/colour classes. Icons take the current text colour. */
  className?: string
  /** Accessible label. Omit for decorative icons (hidden from screen readers). */
  label?: string
}

export default function Icon({ name, className = 'h-6 w-6', label }: IconProps) {
  const url = `url(/assets/icons/${name}.svg)`
  // The SVG is used as a mask so the icon inherits `currentColor`.
  const style: CSSProperties = {
    maskImage: url,
    WebkitMaskImage: url,
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    backgroundColor: 'currentColor',
  }

  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block shrink-0 align-middle ${className}`}
      style={style}
    />
  )
}
