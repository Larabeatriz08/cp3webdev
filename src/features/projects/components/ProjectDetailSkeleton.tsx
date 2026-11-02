import GlassCard from '../../../components/GlassCard'

export default function ProjectDetailSkeleton() {
  return (
    <>
      <p role="status" className="sr-only">
        Carregando projeto…
      </p>
      <GlassCard className="motion-safe:animate-pulse" aria-hidden="true">
        <div className="h-10 w-2/3 rounded bg-line" />
        <div className="mt-6 h-4 w-full rounded bg-line" />
        <div className="mt-2 h-4 w-5/6 rounded bg-line" />
        <div className="mt-6 flex gap-3">
          <div className="h-7 w-24 rounded-full bg-line" />
          <div className="h-7 w-20 rounded-full bg-line" />
        </div>
        <div className="mt-8 flex gap-3">
          <div className="h-10 w-36 rounded-lg bg-line" />
          <div className="h-10 w-28 rounded-lg bg-line" />
        </div>
      </GlassCard>
    </>
  )
}
