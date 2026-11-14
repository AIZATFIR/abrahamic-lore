interface TimelineEvent {
  year: number
  eraLabel: string
  tradition: 'judaism' | 'christianity' | 'islam' | 'shared'
  title: string
  description: string
  keyFigures: string[]
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: -1800,
    eraLabel: 'c. 1800 BCE',
    tradition: 'shared',
    title: 'The Call & Covenant of Abraham (Ibrahim)',
    description: 'Departure from Ur to Canaan. Foundational monotheistic covenant established.',
    keyFigures: ['Abraham / Ibrahim', 'Sarah', 'Hagar'],
  },
  {
    year: -1700,
    eraLabel: 'c. 1700 BCE',
    tradition: 'shared',
    title: 'The Patriarchal Generation',
    description: 'Isaac and Ishmael; Jacob (Israel) and the 12 tribes settle in Egypt under Joseph (Yusuf).',
    keyFigures: ['Ishmael', 'Isaac', 'Jacob', 'Joseph'],
  },
  {
    year: -1280,
    eraLabel: 'c. 1280 BCE',
    tradition: 'shared',
    title: 'The Exodus & Revelation at Sinai',
    description: 'Moses (Musa) leads the liberation from Pharaoh; reception of the Torah and Ten Commandments.',
    keyFigures: ['Moses / Musa', 'Aaron / Harun'],
  },
  {
    year: -1000,
    eraLabel: 'c. 1000 BCE',
    tradition: 'judaism',
    title: 'United Monarchy & First Temple',
    description: 'King David unites Israel in Jerusalem; Solomon constructs the First Beit HaMikdash.',
    keyFigures: ['David / Dawud', 'Solomon / Sulayman'],
  },
  {
    year: -586,
    eraLabel: '586 BCE',
    tradition: 'judaism',
    title: 'Babylonian Destruction & Exile',
    description: 'Fall of Jerusalem to Nebuchadnezzar; First Temple burned; Torah codification in exile.',
    keyFigures: ['Jeremiah', 'Ezekiel'],
  },
  {
    year: -516,
    eraLabel: '516 BCE',
    tradition: 'judaism',
    title: 'Second Temple Rebuilt',
    description: 'Cyrus the Great permits return; Ezra the Scribe and Nehemiah re-establish covenantal worship.',
    keyFigures: ['Ezra', 'Nehemiah'],
  },
  {
    year: 30,
    eraLabel: 'c. 30 CE',
    tradition: 'christianity',
    title: 'Ministry & Passion of Jesus of Nazareth',
    description: 'Gospel preaching of the Kingdom of God, Crucifixion under Pontius Pilate, and the Resurrection.',
    keyFigures: ['Jesus / Yeshua / Isa', 'The Apostles', 'Mary / Maryam'],
  },
  {
    year: 70,
    eraLabel: '70 CE',
    tradition: 'judaism',
    title: 'Destruction of the Second Temple',
    description: 'Roman legions destroy Jerusalem; transition from sacrificial cult to Rabbinic Judaism & Synagogues.',
    keyFigures: ['Yohanan ben Zakkai', 'Early Rabbis'],
  },
  {
    year: 325,
    eraLabel: '325 CE',
    tradition: 'christianity',
    title: 'Council of Nicaea',
    description: 'First Ecumenical Council; formulation of the Nicene Creed confirming Christological doctrine.',
    keyFigures: ['Constantine', 'Athanasius'],
  },
  {
    year: 610,
    eraLabel: '610 CE',
    tradition: 'islam',
    title: 'The First Revelation at Mount Hira',
    description: 'Archangel Gabriel (Jibril) delivers the first verses of the Qur\'an to Prophet Muhammad ﷺ in Mecca.',
    keyFigures: ['Muhammad ﷺ', 'Gabriel / Jibril', 'Khadijah'],
  },
  {
    year: 622,
    eraLabel: '622 CE',
    tradition: 'islam',
    title: 'The Hijrah to Medina',
    description: 'Emigration of early Muslims from Mecca to Yathrib (Medina); inception of the Islamic lunar calendar (1 AH).',
    keyFigures: ['Muhammad ﷺ', 'Abu Bakr'],
  },
  {
    year: 638,
    eraLabel: '638 CE',
    tradition: 'islam',
    title: 'Opening of Jerusalem (Al-Quds)',
    description: 'Caliph Umar ibn al-Khattab signs pact of religious freedom; sanctuary of Al-Aqsa cleared.',
    keyFigures: ['Umar ibn al-Khattab', 'Patriarch Sophronius'],
  },
]
