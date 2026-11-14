import { TIMELINE_EVENTS } from '@/data/timeline_events'

export function ComparativeTimeline() {
  const events = TIMELINE_EVENTS

  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white p-6 shadow-xs">
      <div className="min-w-[720px] space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">Synchronized Historical Timeline</h3>
            <p className="text-xs text-stone-500">Comparative parallel track from Patriarchal Antiquity to Classical Islam</p>
          </div>
          <div className="flex gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span> Judaism</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span> Christianity</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span> Islam</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-stone-700"></span> Shared Genesis</span>
          </div>
        </div>

        {/* Timeline Table / Track */}
        <div className="relative border-l-2 border-stone-200 ml-4 pl-6 space-y-8">
          {events.map((evt, idx) => {
            const badgeClass =
              evt.tradition === 'judaism'
                ? 'bg-blue-50 border-blue-200 text-blue-800'
                : evt.tradition === 'christianity'
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : evt.tradition === 'islam'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-stone-100 border-stone-300 text-stone-800'

            const dotClass =
              evt.tradition === 'judaism'
                ? 'bg-blue-600'
                : evt.tradition === 'christianity'
                ? 'bg-amber-600'
                : evt.tradition === 'islam'
                ? 'bg-emerald-600'
                : 'bg-stone-800'

            return (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className={`absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white ${dotClass} shadow-xs`} />

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-stone-500">{evt.eraLabel}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeClass} uppercase tracking-wider`}>
                      {evt.tradition}
                    </span>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-stone-900 text-base">{evt.title}</h4>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-3xl">{evt.description}</p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {evt.keyFigures.map((fig, fIdx) => (
                    <span key={fIdx} className="text-[11px] bg-stone-50 text-stone-600 px-2 py-0.5 rounded border border-stone-200/60 font-medium">
                      {fig}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
