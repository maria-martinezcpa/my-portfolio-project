import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import type { ProjectImage } from '../data'
import { EASE } from '../lib/motion'

// Full-screen photo viewer with keyboard navigation.
export default function Lightbox({
  images,
  index,
  title,
  onClose,
  onIndex,
}: {
  images: ProjectImage[]
  index: number | null
  title: string
  onClose: () => void
  onIndex: (i: number) => void
}) {
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, index, images.length, onClose, onIndex])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-[#0d0d0c] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title}: image ${index + 1} of ${images.length}`}
        >
          <div className="container-x flex items-center justify-between py-6 text-sm">
            <span className="font-display text-xl">{title}</span>
            <span className="tabular-nums opacity-60">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={onClose} className="eyebrow link-line pb-0.5" autoFocus>
              Close
            </button>
          </div>
          <div className="relative flex-1" onClick={onClose}>
            <AnimatePresence mode="wait">
              <motion.img
                key={images[index].src}
                src={images[index].src}
                alt={`${title}, image ${index + 1}`}
                className="absolute inset-0 m-auto max-h-full max-w-full object-contain px-4 pb-6"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.6, ease: EASE }}
                onClick={(e) => {
                  e.stopPropagation()
                  onIndex((index + 1) % images.length)
                }}
                data-cursor="Next"
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
