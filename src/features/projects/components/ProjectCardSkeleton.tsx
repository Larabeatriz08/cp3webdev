import GlassCard from '../../../components/GlassCard'

export default function ProjectCardSkeleton() {
  return (
    <GlassCard className="flex h-56 flex-col motion-safe:animate-pulse" aria-hidden="true">
      <div className="h-6 w-2/3 rounded bg-line" />
      <div className="mt-4 h-4 w-full rounded bg-line" />
      <div className="mt-2 h-4 w-5/6 rounded bg-line" />
      <div className="mt-2 h-4 w-2/3 rounded bg-line" />
      <div className="mt-auto flex items-center justify-between">
        <div className="h-6 w-20 rounded-full bg-line" />
        <div className="h-4 w-24 rounded bg-line" />
      </div>
    </GlassCard>
  )
}
