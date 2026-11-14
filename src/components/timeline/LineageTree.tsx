export function LineageTree() {
  const generations = [
    {
      level: 'The Primordial Origin',
      nodes: [
        { name: 'Adam & Hawwa (Eve)', desc: 'The First Ancestors', tradition: 'Universal' },
        { name: 'Noah (Nuh)', desc: 'The Second Father of Humanity after the Deluge', tradition: 'Universal' },
      ],
    },
    {
      level: 'The Abrahamic Pivot',
      nodes: [
        { name: 'Abraham / Ibrahim', desc: 'Friend of God (Khalilullah) / Father of Multitudes', tradition: 'The Patriarch', highlight: true },
      ],
    },
    {
      level: 'The Two Branches',
      nodes: [
        {
          name: 'Ishmael (Ismail)',
          mother: 'Hagar (Hajar)',
          destiny: 'Settlement in Mecca, Arab tribes, Line of Prophet Muhammad ﷺ',
          tradition: 'islam',
          badge: 'Islamic Lineage',
        },
        {
          name: 'Isaac (Yitzhak)',
          mother: 'Sarah',
          destiny: 'Father of Jacob (Israel), 12 Tribes, Kingdom of Judah',
          tradition: 'judaism',
          badge: 'Israelite Lineage',
        },
      ],
    },
    {
      level: 'Subsequent Prophetic Fruits',
      nodes: [
        {
          name: 'The Hebraic & Christian Line',
          ancestor: 'From Isaac → Jacob (Israel)',
          prophets: ['Moses (Lawgiver)', 'David & Solomon (Kings)', 'Jesus / Isa (The Messiah)'],
          tradition: 'judaism-christianity',
        },
        {
          name: 'The Ishmaelite Line',
          ancestor: 'From Ishmael → Adnan → Quraish',
          prophets: ['Muhammad ﷺ (Khatam an-Nabiyyin / Seal of Prophets)'],
          tradition: 'islam',
        },
      ],
    },
  ]

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-8">
      <div className="border-b border-stone-100 pb-4">
        <h3 className="font-serif text-lg font-bold text-stone-900">The Prophetic Lineage Tree</h3>
        <p className="text-xs text-stone-500">How the three sacred streams diverge and interconnect from Abraham</p>
      </div>

      <div className="space-y-8 relative">
        {generations.map((gen, gIdx) => (
          <div key={gIdx} className="space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
              {gen.level}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gen.nodes.map((node: any, nIdx: number) => {
                const isHighlight = node.highlight
                return (
                  <div
                    key={nIdx}
                    className={`rounded-xl border p-4 transition-all ${
                      isHighlight
                        ? 'border-amber-400 bg-amber-50/40 md:col-span-2 text-center'
                        : 'border-stone-200 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="font-serif font-bold text-stone-900 text-sm">{node.name}</h4>
                      {node.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700">
                          {node.badge}
                        </span>
                      )}
                    </div>

                    {node.mother && (
                      <p className="text-[11px] text-stone-500 font-medium">Born of {node.mother}</p>
                    )}

                    {node.desc && (
                      <p className="text-xs text-stone-600 mt-1">{node.desc}</p>
                    )}

                    {node.destiny && (
                      <p className="text-xs text-stone-700 font-medium mt-2 leading-relaxed">
                        {node.destiny}
                      </p>
                    )}

                    {node.prophets && (
                      <div className="mt-3 pt-2 border-t border-stone-200/60">
                        <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide">Key Prophetic Figures:</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {node.prophets.map((p: string, pIdx: number) => (
                            <span key={pIdx} className="text-xs bg-white text-stone-800 px-2.5 py-1 rounded-md border border-stone-200 font-medium">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
