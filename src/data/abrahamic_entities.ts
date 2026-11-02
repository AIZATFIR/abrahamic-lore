export interface TraditionPerspective {
  name: string
  titleOrHonorific?: string
  role: string
  scriptureReferences: string[]
  coreNarrative: string
  keyTheologicalSignificance: string
  notableQuoteOrVerse?: {
    text: string
    source: string
  }
}

export interface ComparisonEntity {
  slug: string
  title: string
  category: 'Prophets & Figures' | 'Sacred Texts & Revelation' | 'Theology & Concepts' | 'History & Practices'
  summary: string
  traditions: {
    judaism: TraditionPerspective
    christianity: TraditionPerspective
    islam: TraditionPerspective
  }
  convergencePoints: string[]
  divergencePoints: string[]
  historicalContext: string
  tags: string[]
  relatedTopicSlugs?: string[]
}

export interface TopicDetail {
  slug: string
  title: string
  category: string
  icon: string
  summary: string
  historicalOverview: string
  perspectives: {
    tradition: 'judaism' | 'christianity' | 'islam'
    headline: string
    content: string
    keyTexts: string[]
    focalFigures: string[]
  }[]
  comparativeTakeaway: string
  relatedComparisonSlugs: string[]
}

export const COMPARISON_ENTITIES: Record<string, ComparisonEntity> = {
  'abraham-traditions': {
    slug: 'abraham-traditions',
    title: 'Abraham / Ibrahim (The Patriarch)',
    category: 'Prophets & Figures',
    summary: 'The archetype of monotheism and fidelity across Judaism, Christianity, and Islam.',
    traditions: {
      judaism: {
        name: 'Avraham Avinu (Our Father Abraham)',
        titleOrHonorific: 'Father of the Jewish People & First Monotheist',
        role: 'The founding patriarch who entered the Brit (Covenant) of circumcision with God (Brit Milah), promising land and progeny through Isaac and Jacob.',
        scriptureReferences: ['Bereshit (Genesis) 12:1-3', 'Genesis 15', 'Genesis 17', 'Genesis 22 (Akedah)'],
        coreNarrative: 'Called from Ur of the Chaldees to Canaan. Tested through ten trials, culminating in the binding of Isaac (Akedah) on Mount Moriah.',
        keyTheologicalSignificance: 'Embodiment of Chessed (loving-kindness) and absolute faith in HaShem, passing the covenant to Isaac.',
        notableQuoteOrVerse: {
          text: 'Go from your country, your people and your father’s household to the land I will show you.',
          source: 'Genesis 12:1'
        }
      },
      christianity: {
        name: 'Father Abraham',
        titleOrHonorific: 'Father of All Who Believe & Prototype of Justification by Faith',
        role: 'Spiritual progenitor whose faith in God’s promise was credited to him as righteousness, anticipating justification in Jesus Christ.',
        scriptureReferences: ['Romans 4:1-12', 'Galatians 3:6-9', 'Hebrews 11:8-19', 'James 2:21-24'],
        coreNarrative: 'Believed God prior to the Law and circumcision; his readiness to offer his only promised son Isaac foreshadows God the Father offering Jesus on the cross.',
        keyTheologicalSignificance: 'Universal fatherhood: Abraham’s true heirs are not determined by lineage or Torah observant circumcision, but by trusting faith in Christ.',
        notableQuoteOrVerse: {
          text: 'Abraham believed God, and it was credited to him as righteousness.',
          source: 'Romans 4:3 / Genesis 15:6'
        }
      },
      islam: {
        name: 'Ibrahim (Khalilullah)',
        titleOrHonorific: 'Friend of Allah & Hanif (Pure Monotheist)',
        role: 'One of the five greatest Messengers (Ulul Azmi) who rejected idol worship, rebuilt the Kaaba with Ismail, and instituted the rites of Hajj.',
        scriptureReferences: ['Surah Al-Baqarah 2:124-135', 'Surah Ibrahim 14', 'Surah Maryam 19:41-50', 'Surah As-Saffat 37:99-113'],
        coreNarrative: 'Debated Mesopotamian idolaters and king Nimrod, survived the fire through Divine miracle, established his son Ismail at the valley of Bakkah (Makkah), and was commanded to sacrifice his son (commonly held as Ismail).',
        keyTheologicalSignificance: 'The pristine archetype of Islam (total submission to God) before later sectarian divisions; neither Jew nor Christian, but an upright Hanif Muslim.',
        notableQuoteOrVerse: {
          text: 'Abraham was neither a Jew nor a Christian, but he was one inclining toward truth, a Muslim.',
          source: 'Quran Surah Ali ‘Imran 3:67'
        }
      }
    },
    convergencePoints: [
      'Universal reverence as the founding monotheist patriarch who rejected idolatry in favor of the One God.',
      'The supreme test of faith involving the commanded sacrifice of his son (Isaac in Jewish/Christian tradition; Ismail in prevailing Islamic tradition).',
      'Bearer of a Divine covenant promising vast progeny and blessings to all families of the earth.'
    ],
    divergencePoints: [
      'Lineage of the covenant: Judaism highlights Isaac and Jacob as the covenantal carriers; Islam honors both Isaac and Ismail, with the final prophet descending from Ismail.',
      'Nature of inheritance: Christianity views Abraham’s covenant as spiritually fulfilled for all believers through Christ, rather than ethnic lineage.',
      'Rites and Geography: In Islam, Ibrahim rebuilt the Kaaba in Mecca with Ismail, forming the liturgical basis for the Hajj pilgrimage.'
    ],
    historicalContext: 'Set around early 2nd millennium BCE in the Ancient Near East (Mesopotamia, Canaan, Egypt, and the Hijaz). Abraham functions as the shared anchor point for Near Eastern and Mediterranean monotheistic civilizations.',
    tags: ['Prophets', 'Monotheism', 'Patriarchs', 'Covenant', 'Sacrifice'],
    relatedTopicSlugs: ['prophets-figures', 'theology-beliefs', 'who-is-abraham', 'shared-stories']
  },

  'moses-musa': {
    slug: 'moses-musa',
    title: 'Moses / Moshe / Musa (The Lawgiver & Deliverer)',
    category: 'Prophets & Figures',
    summary: 'The deliverer of Israel, recipient of the Divine Law at Mount Sinai/Tur, and prophetic archetype.',
    traditions: {
      judaism: {
        name: 'Moshe Rabbenu (Moses Our Teacher)',
        titleOrHonorific: 'Master of All Prophets & Lawgiver of Israel',
        role: 'The primary prophet who spoke to HaShem face-to-face (panim el panim), delivered Israel from Egypt, and mediated the Written and Oral Torah at Sinai.',
        scriptureReferences: ['Shemot (Exodus)', 'Vayikra', 'Bamidbar', 'Devarim (Deuteronomy) 34:10-12'],
        coreNarrative: 'Born into Hebrew slavery, raised in Pharaoh’s house, fled to Midian, encountered God at the Burning Bush, led the Exodus through the Red Sea, and governed Israel 40 years in the wilderness.',
        keyTheologicalSignificance: 'No prophet ever arose in Israel like Moses. The Torah given through him is immutable and forms the perpetual constitution of Jewish life.',
        notableQuoteOrVerse: {
          text: 'Never since has there arisen a prophet in Israel like Moses, whom the Lord knew face to face.',
          source: 'Deuteronomy 34:10'
        }
      },
      christianity: {
        name: 'Moses the Prophet',
        titleOrHonorific: 'Precursor of Christ & Mediator of the Old Covenant',
        role: 'The lawgiver whose dispensation of Torah reveals God’s holiness and exposes human sin, pointing forward to grace and truth brought by Jesus.',
        scriptureReferences: ['John 1:17', 'Matthew 17:1-8 (Transfiguration)', '2 Corinthians 3:7-18', 'Hebrews 3:1-6'],
        coreNarrative: 'Led God’s people out of physical slavery; lifted the bronze serpent in the desert (prefiguring the Crucifixion); appeared with Elijah on Mount of Transfiguration witnessing Jesus.',
        keyTheologicalSignificance: 'The Law was a tutor leading to Christ. Moses was faithful in God’s house as a servant, whereas Christ is faithful as a Son over the house.',
        notableQuoteOrVerse: {
          text: 'For the law was given through Moses; grace and truth came through Jesus Christ.',
          source: 'John 1:17'
        }
      },
      islam: {
        name: 'Musa (Kalimullah)',
        titleOrHonorific: 'He Who Spoke to Allah Directly & Great Ulul Azmi Messenger',
        role: 'The most frequently mentioned prophet in the Quran (over 136 times), sent with signs to Pharaoh and granted the Tawrat (Torah) for Bani Israil.',
        scriptureReferences: ['Surah Al-Qasas 28', 'Surah Ta-Ha 20:9-98', 'Surah Al-A’raf 7:103-162', 'Surah Al-Baqarah 2:47-61'],
        coreNarrative: 'Cast upon the Nile as an infant, raised in Pharaoh’s palace, spoke with Allah directly at Mount Tur (Sinai), split the sea, led Bani Israil, and endured their repeated backsliding.',
        keyTheologicalSignificance: 'A profound model for Prophet Muhammad during persecution; his struggle against tyrannical disbelief (Fir’awn) exemplifies divine justice and perseverance.',
        notableQuoteOrVerse: {
          text: 'And to Moses Allah spoke directly.',
          source: 'Quran Surah An-Nisa 4:164'
        }
      }
    },
    convergencePoints: [
      'Infant preservation from Pharaoh’s decree by maternal faith and Nile basket floating.',
      'Direct vocal revelation at Mount Sinai / Jabal Musa without angelic intermediary.',
      'Miraculous parting of the sea and deliverance of the Israelites from Egyptian bondage.',
      'Reception of sacred stone tablets containing divine moral commandments.'
    ],
    divergencePoints: [
      'Finality of Mosaic Law: In Rabbinic Judaism, the Mosaic Torah cannot be abrogated or superseded; Christianity views Christ as fulfilling the Law’s requirements; Islam views the Tawrat as an authentic early revelation later obscured or requiring renewal by the Quran.',
      'Prophetic rank: In Judaism, Moshe is peerless and unsurpassed; in Islam, Musa is an exalted Ulul Azmi messenger alongside Muhammad, Ibrahim, Nuh, and Isa.'
    ],
    historicalContext: 'Bronze Age Near East (circa 13th-15th century BCE) during Egypt’s New Kingdom dynasty and nomadic migration in the Sinai peninsula.',
    tags: ['Moses', 'Torah', 'Law', 'Exodus', 'Sinai'],
    relatedTopicSlugs: ['sacred-texts', 'prophets-figures', 'religious-history', 'stories-narratives']
  },

  'jesus-isa': {
    slug: 'jesus-isa',
    title: 'Jesus / Yeshua / Isa (Messiah, Word, Prophet)',
    category: 'Prophets & Figures',
    summary: 'The central figure of Christianity and a revered prophet in Islam, reflecting key theological theological divergences.',
    traditions: {
      judaism: {
        name: 'Yeshua of Nazareth',
        titleOrHonorific: 'Historical Jewish Teacher / Non-Messianic Figure',
        role: 'A first-century Galilean Jewish teacher whose messianic claims and posthumous deification were not accepted by mainstream Judaism.',
        scriptureReferences: ['Sanhedrin 43a', 'Mishneh Torah (Hilchot Melachim 11:4)'],
        coreNarrative: 'Lived under Roman occupation in Second Temple Judea. Did not fulfill the biblical prophetic criteria for Mashiach (such as rebuilding the Temple, gathering all Jewish exiles to Israel, and ushering universal world peace).',
        keyTheologicalSignificance: 'Judaism maintains absolute indivisible monotheism (Hashem Echad); any human deification or trinitarian concept is incompatible with Torah monotheism.',
        notableQuoteOrVerse: {
          text: 'Hear, O Israel: The Lord our God, the Lord is one.',
          source: 'Deuteronomy 6:4 (Shema)'
        }
      },
      christianity: {
        name: 'Jesus Christ (Yeshua HaMashiach)',
        titleOrHonorific: 'Son of God, Lord, Incarnate Word (Logos), Savior of Mankind',
        role: 'The second Person of the Holy Trinity, fully God and fully man, whose atoning death and bodily resurrection redeem humanity from sin and death.',
        scriptureReferences: ['Gospel of John 1:1-14', 'Colossians 1:15-20', 'Philippians 2:5-11', '1 Corinthians 15:3-4'],
        coreNarrative: 'Born of the Virgin Mary, conducted healing ministry and proclaimed the Kingdom of God, was crucified under Pontius Pilate, rose on the third day, ascended to heaven, and will return in glory.',
        keyTheologicalSignificance: 'The apex of Divine Revelation. Salvation is through faith in His sacrifice and resurrection, instituting the New Covenant.',
        notableQuoteOrVerse: {
          text: 'I am the way and the truth and the life. No one comes to the Father except through me.',
          source: 'John 14:6'
        }
      },
      islam: {
        name: 'Isa ibn Maryam (Al-Masih)',
        titleOrHonorific: 'The Messiah, Spirit from Allah (Ruhullah), Word from Him (Kalimatullah)',
        role: 'One of the greatest Messengers (Ulul Azmi), born miraculously to the virgin Maryam, gifted with the Injil (Gospel), and destined to return before the Day of Judgment.',
        scriptureReferences: ['Surah Ali ‘Imran 3:45-59', 'Surah Maryam 19:16-36', 'Surah An-Nisa 4:157-159', 'Surah Al-Ma’idah 5:110-117'],
        coreNarrative: 'Spoke from the cradle, cured lepers and gave life to clay birds by God’s permission (Bi-idhnillah). Denied divine status or crucifixion; Allah raised him bodily to Heaven.',
        keyTheologicalSignificance: 'A strictly human messenger of absolute monotheism (Tawhid). To associate him as God’s literal son is considered shirk (polytheistic association). He will return to defeat the false messiah (Dajjal) and restore truth.',
        notableQuoteOrVerse: {
          text: 'Indeed, the Messiah, Jesus, the son of Mary, was but a messenger of Allah and His word which He directed to Mary and a soul from Him.',
          source: 'Quran Surah An-Nisa 4:171'
        }
      }
    },
    convergencePoints: [
      'Christianity and Islam both affirm the miraculous Virgin Birth through Mary / Maryam without human paternity.',
      'Both affirm his title as the Messiah (Mashiach / Al-Masih) and worker of divine miracles (healing the blind, raising the dead by God’s power).',
      'Both anticipate the eschatological Second Coming of Jesus near the end of worldly time.'
    ],
    divergencePoints: [
      'Incarnation and Trinity: Christianity holds Jesus as God incarnate (co-equal with the Father); Judaism and Islam hold absolute, non-incarnational monotheism and reject Jesus’s divinity.',
      'The Crucifixion and Atonement: Central to Christian soteriology; Quran 4:157 explicitly states "they did not kill him, nor did they crucify him, but another was made to resemble him"; Judaism considers his execution an execution under Roman law.',
      'Prophetic versus Divine Role: Islam views him as a revered prophet and servant of Allah, not a divine son or savior from original sin.'
    ],
    historicalContext: '1st century Roman Judea (Herodian Kingdom and Roman province of Iudaea), under emperors Augustus and Tiberius.',
    tags: ['Jesus', 'Isa', 'Messiah', 'Christology', 'Virgin Birth'],
    relatedTopicSlugs: ['theology-beliefs', 'prophets-figures', 'shared-themes', 'sacred-texts']
  },

  'sacred-texts-differ': {
    slug: 'sacred-texts-differ',
    title: 'Sacred Texts & Revelation (Torah, Bible, Quran)',
    category: 'Sacred Texts & Revelation',
    summary: 'The nature of scripture, textual inspiration, transmission, and liturgical authority.',
    traditions: {
      judaism: {
        name: 'The Tanakh & Oral Torah (Torah Sheb’al Peh)',
        titleOrHonorific: 'Torah, Nevi’im, Ketuvim & Talmud',
        role: 'The written revelation received by Moses combined with the oral chain of transmission preserved in Mishnah and Gemara.',
        scriptureReferences: ['Pirkei Avot 1:1', 'Exodus 24:12', 'Deuteronomy 4:2'],
        coreNarrative: 'Moshe received Torah on Sinai and delivered it to Joshua, the Elders, the Prophets, and the Men of the Great Assembly.',
        keyTheologicalSignificance: 'Torah is living dialogue: interpretation through Rabbinic hermeneutics is an active participant in divine will.',
        notableQuoteOrVerse: {
          text: 'Turn it and turn it again, for everything is in it.',
          source: 'Pirkei Avot 5:22'
        }
      },
      christianity: {
        name: 'The Holy Bible (Old & New Testaments)',
        titleOrHonorific: 'The Canon of Scripture (Divinely Inspired Word)',
        role: '66 to 73 books written by human authors inspired by the Holy Spirit (theopneustos), bearing witness to Jesus Christ.',
        scriptureReferences: ['2 Timothy 3:16-17', 'Hebrews 4:12', '2 Peter 1:20-21'],
        coreNarrative: 'Progressive revelation culminating in the Incarnation of the Word (Logos). The New Testament fulfills and illuminates the Hebrew Scriptures.',
        keyTheologicalSignificance: 'The ultimate revelation of God is not ink and paper, but the Person of Jesus Christ; the scriptures are the inspired testimony to Him.',
        notableQuoteOrVerse: {
          text: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.',
          source: '2 Timothy 3:16'
        }
      },
      islam: {
        name: 'The Holy Quran (Al-Qur’an Al-Kareem)',
        titleOrHonorific: 'The Inimitable, Direct Speech of Allah (Kalamullah)',
        role: 'Verbatim revelation recited by the Angel Jibril (Gabriel) to Prophet Muhammad over 23 years, preserved without corruption.',
        scriptureReferences: ['Surah Al-Baqarah 2:2', 'Surah Al-Hijr 15:9', 'Surah Al-Isra 17:88', 'Surah Fussilat 41:41-42'],
        coreNarrative: 'Revealed to an unlettered Prophet in Makkah and Madinah, memorized verbatim by companions, and compiled into the standard Uthmanic codex.',
        keyTheologicalSignificance: 'The final, definitive revelation (Muhaymin) that confirms prior truths while correcting human distortions (Tahrif) of previous scriptures.',
        notableQuoteOrVerse: {
          text: 'Indeed, it is We who sent down the Quran and indeed, We will be its guardian.',
          source: 'Quran Surah Al-Hijr 15:9'
        }
      }
    },
    convergencePoints: [
      'All three recognize that God communicates His will and guidance to humanity through chosen prophets and sacred writings.',
      'Scriptures form the foundational basis for ritual, law, ethics, and community life.',
      'Liturgical chanting and memorization are held in profound esteem (Torah reading cantillation, Quranic tajweed, Christian psalmody).'
    ],
    divergencePoints: [
      'Mode of Revelation: Quran is believed to be the literal, uncreated speech of Allah in Arabic; Christianity views the Bible as divine inspiration operating through human authorial voices; Judaism sees Torah as divine dictation to Moses with human nuance in Nevi’im and Ketuvim.',
      'Primary Word of God: In Christianity, the primary "Word of God" is Jesus Christ Himself (John 1:1); in Islam, the primary "Word of God" is the Quran itself.',
      'Canonicity and Textual History: Multiple Christian canons exist (Protestant 66 books, Catholic 73, Orthodox 76+); the Hebrew Tanakh consists of 24 canonical books; the Quran has a uniform 114 Surahs worldwide.'
    ],
    historicalContext: 'Spans over 1,500 years from Ancient Near East Hebrew manuscripts, Hellenistic Greek koine texts of the Roman Mediterranean, to 7th century CE Arabic oral recitations.',
    tags: ['Scripture', 'Torah', 'Bible', 'Quran', 'Revelation', 'Canon'],
    relatedTopicSlugs: ['sacred-texts', 'three-books', 'theology-beliefs']
  },

  'concept-covenant': {
    slug: 'concept-covenant',
    title: 'The Covenant / Brit / Mithaq',
    category: 'Theology & Concepts',
    summary: 'The sacred binding agreement between God and humanity defining duty, grace, and redemption.',
    traditions: {
      judaism: {
        name: 'The Brit (Eternal Covenant)',
        titleOrHonorific: 'Brit Avot & Brit Sinai',
        role: 'The unique, enduring bond between God and the Children of Israel, consecrated with circumcision and observance of the 613 Mitzvot.',
        scriptureReferences: ['Genesis 17:7', 'Exodus 19:5-6', 'Jeremiah 31:31-33'],
        coreNarrative: 'Unconditional covenant with Abraham, deepened at Sinai with mutual obligations of Torah observance.',
        keyTheologicalSignificance: 'Israel is called to be a kingdom of priests and a holy nation; the covenant is irrevocable across all generations.',
        notableQuoteOrVerse: {
          text: 'I will establish my covenant as an everlasting covenant between me and you and your descendants after you.',
          source: 'Genesis 17:7'
        }
      },
      christianity: {
        name: 'The New Covenant (Novum Testamentum)',
        titleOrHonorific: 'Covenant in the Blood of Christ',
        role: 'The universal covenant prophesied by Jeremiah, inaugurated through the death and resurrection of Jesus Christ, open to Gentiles and Jews alike.',
        scriptureReferences: ['Luke 22:20', 'Hebrews 8:6-13', '1 Corinthians 11:25'],
        coreNarrative: 'Instituted at the Last Supper: "This cup is the new covenant in my blood, which is poured out for you."',
        keyTheologicalSignificance: 'Replaces the ceremonial and judicial requirements of the Sinai Law with internal regeneration by the Holy Spirit through grace.',
        notableQuoteOrVerse: {
          text: 'This cup is the new covenant in my blood, which is poured out for you.',
          source: 'Luke 22:20'
        }
      },
      islam: {
        name: 'Al-Mithaq & ‘Ahd',
        titleOrHonorific: 'The Primordial Covenant & Prophetic Pacts',
        role: 'The primordial testimony (Mithaq) where all human souls testified to Allah’s lordship before creation, reiterated through all prophets.',
        scriptureReferences: ['Surah Al-A’raf 7:172', 'Surah Al-Baqarah 2:40', 'Surah Al-Ahzab 33:7'],
        coreNarrative: 'Before bodily birth, Allah asked humanity: "Am I not your Lord?" All answered: "Yes, we testify." Prophets remind humans of this innate pact.',
        keyTheologicalSignificance: 'Every human possesses an innate moral inclination (Fitrah); subsequent scripture calls humanity back to that original, universal submission.',
        notableQuoteOrVerse: {
          text: 'Am I not your Lord? They said: Yes, we testify.',
          source: 'Quran Surah Al-A’raf 7:172'
        }
      }
    },
    convergencePoints: [
      'God initiates the bond with humanity out of divine mercy and righteousness.',
      'Obligation of fidelity: humans are accountable for keeping trust and ethical standards.',
      'Promise of divine blessing for faithfulness and spiritual correction for transgression.'
    ],
    divergencePoints: [
      'Scope of the covenant: Judaism focuses on a particular national-covenant with the Jewish people alongside universal Noahide laws for humanity; Christianity universalizes the covenant via personal faith in Jesus; Islam holds a universal primordial pact embedded in every human soul.',
      'Ritual signs: In Judaism, the sign of the covenant is circumcision (Brit Milah) and the Shabbat; in Christianity, it is Baptism and Holy Communion (Eucharist); in Islam, it is the Shahadah, Salah, and submission to Sharia.'
    ],
    historicalContext: 'Ancient Near Eastern suzerainty treaties influenced the biblical covenant forms; evolved through classical theology into core definitions of identity.',
    tags: ['Covenant', 'Brit', 'Mithaq', 'Theology', 'Salvation'],
    relatedTopicSlugs: ['theology-beliefs', 'shared-themes', 'stories-narratives']
  },

  'creation-and-fall': {
    slug: 'creation-and-fall',
    title: 'Creation & The Human Origin (Adam & Eve)',
    category: 'Theology & Concepts',
    summary: 'The creation of the cosmos, the formation of humanity, the forbidden fruit, and human purpose.',
    traditions: {
      judaism: {
        name: 'Bereshit & Adam HaRishon',
        titleOrHonorific: 'Creation of Humanity in the Divine Image (Tzelem Elohim)',
        role: 'Humanity created from dust and divine breath; entrusted with cultivating and preserving the garden of Eden.',
        scriptureReferences: ['Genesis 1:26-28', 'Genesis 2:7', 'Genesis 3'],
        coreNarrative: 'Adam and Chavah (Eve) eat from the Tree of Knowledge of Good and Evil, becoming aware of morality and mortality.',
        keyTheologicalSignificance: 'No doctrine of Original Sin carrying inherited guilt; humans possess two inclinations: Yetzer HaTov (good) and Yetzer HaRa (evil).',
        notableQuoteOrVerse: {
          text: 'So God created mankind in his own image, in the image of God he created them.',
          source: 'Genesis 1:27'
        }
      },
      christianity: {
        name: 'Creation & The Fall',
        titleOrHonorific: 'Human Dignity, The Fall, and the Need for Redemption',
        role: 'Created innocent and in communion with God; their disobedience brought mortality and a fallen sinful nature to all descendants.',
        scriptureReferences: ['Genesis 1-3', 'Romans 5:12-19', '1 Corinthians 15:21-22'],
        coreNarrative: 'Tempted by the serpent, Adam and Eve ate the forbidden fruit, causing separation from God and physical/spiritual death.',
        keyTheologicalSignificance: 'The doctrine of the Fall necessitates the sacrifice of Jesus Christ, the "Second Adam", who reverses the curse.',
        notableQuoteOrVerse: {
          text: 'For as in Adam all die, so in Christ all will be made alive.',
          source: '1 Corinthians 15:22'
        }
      },
      islam: {
        name: 'Khalq Adam & Hawwa',
        titleOrHonorific: 'Adam (First Prophet) & Vicegerent (Khalifah) on Earth',
        role: 'Adam was created from clay as Allah’s trustee (Khalifah) on earth; taught all names and honored above angels.',
        scriptureReferences: ['Surah Al-Baqarah 2:30-38', 'Surah Al-A’raf 7:19-25', 'Surah Ta-Ha 20:115-123'],
        coreNarrative: 'Iblis (Satan) refused to bow to Adam out of arrogance. Satan deceived Adam and Hawwa into eating from the forbidden tree, but both repented and Allah completely forgave them before sending them to earth.',
        keyTheologicalSignificance: 'Adam is regarded as the first prophet. Islam rejects inherited Original Sin: every child is born pure on Fitrah; earthly life was always the divine destiny, not a punitive accident.',
        notableQuoteOrVerse: {
          text: 'Then Adam received words from his Lord, and He accepted his repentance.',
          source: 'Quran Surah Al-Baqarah 2:37'
        }
      }
    },
    convergencePoints: [
      'God is the sole deliberate Creator of heaven, earth, and mankind from clay/earth.',
      'The initial human parents are Adam and Eve (Chavah / Hawwa).',
      'The act of eating from the forbidden tree prompted by deception and leading to expulsion from Eden to mortal earth.'
    ],
    divergencePoints: [
      'Original Sin vs. Personal Accountability: Christianity holds that humanity inherits fallen sinful nature requiring divine redemption; Judaism and Islam hold that humans are born morally neutral or pure (Fitrah) and only bear responsibility for their own choices.',
      'Adam’s Status: In Islam, Adam is the first prophet, forgiven by Allah, and free of mortal corruption; in Christianity, Adam is the archetype of fallen man contrasted with Christ.',
      'Satan’s Nature: In Genesis, the tempter is a serpent; in Christian tradition, the serpent is Satan; in Islam, Iblis is a Jinn made from fire who refused divine command.'
    ],
    historicalContext: 'Ancient cosmological narratives contrasting with Babylonian Enuma Elish, elevating human dignity as bearers of divine mandate rather than slave labor for capricious deities.',
    tags: ['Creation', 'Adam', 'Eve', 'Original Sin', 'Fall', 'Fitrah'],
    relatedTopicSlugs: ['creation-origins', 'theology-beliefs', 'shared-stories']
  },

  'shared-figures': {
    slug: 'shared-figures',
    title: 'Shared Figures & Prophetic Lineage',
    category: 'Prophets & Figures',
    summary: 'How Noah, Joseph, David, Solomon, Mary, and John the Baptist are perceived across traditions.',
    traditions: {
      judaism: {
        name: 'Tzadikim, Nevi’im & Kings',
        titleOrHonorific: 'Righteous leaders and fallible human vessels',
        role: 'Figures like King David and King Solomon are deeply human monarchs who sinned, repented, and composed sacred scriptures (Psalms, Proverbs).',
        scriptureReferences: ['Samuel 1 & 2', 'Kings 1 & 2', 'Tehillim (Psalms)'],
        coreNarrative: 'Scripture does not sanitize biblical heroes: David’s transgressions with Bathsheba and Solomon’s foreign wives are frankly recorded for moral instruction.',
        keyTheologicalSignificance: 'Holiness is achieved through repentance and Torah adherence; even the greatest leaders are subject to the Law.',
        notableQuoteOrVerse: {
          text: 'Create in me a pure heart, O God, and renew a steadfast spirit within me.',
          source: 'Psalm 51:10'
        }
      },
      christianity: {
        name: 'Prophets, Kings & Saints',
        titleOrHonorific: 'Typological precursors to Christ and the Church',
        role: 'Old Testament figures prefigure aspects of Jesus Christ: David as the King, Melchizedek as the High Priest, Jonah in the fish as resurrection.',
        scriptureReferences: ['Matthew 12:40-42', 'Luke 1 (Magnificat)', 'Hebrews 11'],
        coreNarrative: 'Mary (Theotokos / Mother of the Lord) is honored for her obedient "Fiat" enabling the Incarnation of God.',
        keyTheologicalSignificance: 'The entire Hebrew lineage points to the fulfillment of salvation history in the Messiah.',
        notableQuoteOrVerse: {
          text: 'My soul glorifies the Lord and my spirit rejoices in God my Savior.',
          source: 'Luke 1:46-47'
        }
      },
      islam: {
        name: 'Al-Anbiya wal-Mursaleen',
        titleOrHonorific: 'Protected Prophets (Ismah) & Maryam the Truthful',
        role: 'All prophets (Dawud, Sulayman, Yusuf, Nuh, Yahya) are sinless/protected (Ma’sum) from major sins and idolatry; Dawud was a prophet-king, Sulayman commanded the wind and jinn.',
        scriptureReferences: ['Surah Al-Anbiya 21', 'Surah Maryam 19', 'Surah Yusuf 12', 'Surah Sad 38'],
        coreNarrative: 'Quran clears biblical figures of moral scandals: Dawud did not commit adultery, Sulayman never apostatized; Maryam (Mary) is honored as the purest woman above all women of the worlds.',
        keyTheologicalSignificance: 'Prophetic integrity is vital: Allah chose the noblest human beings to deliver divine guidance without moral compromise.',
        notableQuoteOrVerse: {
          text: 'And remember when the angels said, O Mary, indeed Allah has chosen you and purified you and chosen you above the women of the worlds.',
          source: 'Quran Surah Ali ‘Imran 3:42'
        }
      }
    },
    convergencePoints: [
      'Shared pantheon of biblical heroes: Noah, Abraham, Lot, Joseph, Moses, Aaron, David, Solomon, Jonah, John the Baptist, and Mary.',
      'Reverence for Mary / Maryam as a pinnacle of chastity, faith, and devotion.',
      'Belief that God guided human history through these champions of righteousness.'
    ],
    divergencePoints: [
      'Infallibility (Ismah): Islamic theology protects all prophets from major sins, rejecting biblical accounts of prophetic moral failure (such as Lot’s daughters, David and Bathsheba, or Aaron and the golden calf).',
      'Kingship vs. Prophethood: In Jewish tradition, David and Solomon are monarchs and poets/sages, but not on par with Moses; in Islam, they are fully commissioned Prophets of Allah.',
      'Mary’s role: Mary has a dedicated Surah in the Quran (Surah 19) and is the only woman mentioned by name in the Quran; Protestant Christians venerate her as faithful servant, Catholics/Orthodox as Mother of God and Queen of Heaven.'
    ],
    historicalContext: 'Cultural synthesis of Semitic memory across the Levant and Arabia, preserved in oral and textual traditions through empires and exile.',
    tags: ['Prophets', 'Mary', 'David', 'Solomon', 'Joseph', 'Noah'],
    relatedTopicSlugs: ['prophets-figures', 'shared-stories', 'stories-narratives']
  },

  'historical-connections': {
    slug: 'historical-connections',
    title: 'Historical Encounters, Coexistence & Schisms',
    category: 'History & Practices',
    summary: 'The historical intersections: from late antiquity Judea, Byzantine and Sasanian lands, Convivencia in Al-Andalus, to modern interfaith dialogues.',
    traditions: {
      judaism: {
        name: 'The Diaspora & Survival (Galut)',
        titleOrHonorific: 'The Covenant People among Empires',
        role: 'Navigating life as a minority under Roman paganism, Christian Christendom, and Islamic Caliphates (the Dhimmi system).',
        scriptureReferences: ['Deuteronomy 28', 'Talmud Bavli', 'Maimonides’ Epistle to Yemen'],
        coreNarrative: 'Flourished intellectually in the Islamic Golden Age (Saadia Gaon, Maimonides) and faced crusades, expulsions, and pogroms in medieval Europe, culminating in the tragedy of the Shoah and rebirth in Israel.',
        keyTheologicalSignificance: 'Maintaining Jewish particularism and Torah fidelity while anticipating ultimate Messianic redemption.',
        notableQuoteOrVerse: {
          text: 'Even if the Messiah should tarry, nevertheless I will wait for him every day.',
          source: 'Maimonides’ 13 Principles of Faith'
        }
      },
      christianity: {
        name: 'From Persecuted Sect to Global Faith',
        titleOrHonorific: 'The Body of Christ & The Great Commission',
        role: 'Began as a Jewish renewal movement in Jerusalem, expanded throughout the Greco-Roman world, becoming the official religion of Rome and shaping Western culture.',
        scriptureReferences: ['Acts 2', 'Acts 15 (Council of Jerusalem)', 'Romans 11'],
        coreNarrative: 'Separation from the synagogue after 70 CE, early ecumenical councils defining doctrine, complex interactions and polemics with Jews and Muslims over Crusades and empires.',
        keyTheologicalSignificance: 'The historical expansion reflects the Gospel spreading to all nations as light to the world.',
        notableQuoteOrVerse: {
          text: 'There is neither Jew nor Greek, slave nor free, male nor female, for you are all one in Christ Jesus.',
          source: 'Galatians 3:28'
        }
      },
      islam: {
        name: 'The Ummah & Civilizational Synthesis',
        titleOrHonorific: 'The Middle Nation (Ummatan Wasata)',
        role: 'Emerged in 7th century Arabia, incorporating Christian and Jewish communities as Ahl al-Kitab (People of the Book) with protected legal status.',
        scriptureReferences: ['Constitution of Medina', 'Surah Al-Baqarah 2:143', 'Surah Al-Ankabut 29:46'],
        coreNarrative: 'Rapid expansion established the Caliphates where Jewish and Christian scholars contributed to medicine, philosophy, and sciences in Baghdad and Córdoba.',
        keyTheologicalSignificance: 'Islam views itself as the restoration of original monotheism, recognizing previous genuine prophetic communities while guiding mankind to final truth.',
        notableQuoteOrVerse: {
          text: 'And do not argue with the People of the Scripture except in a way that is best.',
          source: 'Quran Surah Al-Ankabut 29:46'
        }
      }
    },
    convergencePoints: [
      'Centuries of mutual theological influence, philosophical translation, and philosophical dialogue (e.g. Averroes, Maimonides, and Thomas Aquinas reading one another).',
      'Shared heritage of Jerusalem (Al-Quds / Yerushalayim) as an essential spiritual epicenter.',
      'Common ethical foundation championing human sanctity, charity to widows and orphans, and divine justice.'
    ],
    divergencePoints: [
      'Political ascendancy and minority experiences: For most of two millennia, Christians and Muslims held state power, while Jewish communities survived as dispersed minorities.',
      'Polemical debates over succession: Christianity’s claim to fulfill Judaism vs. Islam’s claim to seal and correct prior revelations.'
    ],
    historicalContext: 'From 1st century Mediterranean to 7th century Arabia, Andalusian Spain, the Ottoman Millet system, and contemporary global relations.',
    tags: ['History', 'Jerusalem', 'Convivencia', 'People of the Book', 'Interfaith'],
    relatedTopicSlugs: ['religious-history', 'sacred-places', 'abrahamic-timeline']
  }
}

export const TOPIC_DETAILS: Record<string, TopicDetail> = {
  'sacred-texts': {
    slug: 'sacred-texts',
    title: 'Sacred Texts & Scriptures',
    category: 'Foundations',
    icon: '📖',
    summary: 'The scriptures at the heart of Judaism, Christianity, and Islam — their origins, transmission, authority, and theological roles.',
    historicalOverview: 'From the stone inscriptions and parchment scrolls of the ancient Levant to the koine Greek codices of the early Christian church and the oral rhythmic Arabic recitation standardized in 7th century Medina, scripture defines Abrahamic civilization.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'The Tanakh and Torah Sheb’al Peh (Oral Law)',
        content: 'The Hebrew Bible (Tanakh) is composed of Torah (Instruction/Law), Nevi’im (Prophets), and Ketuvim (Writings). Central is the Torah given to Moses at Mount Sinai. Accompanying it is the Oral Torah, codified in the Mishnah and Talmud, which provides interpretive frameworks and continuous living application.',
        keyTexts: ['Torah (Genesis to Deuteronomy)', 'Talmud Bavli (Babylonian Talmud)', 'Midrash Rabbah'],
        focalFigures: ['Moses', 'Ezra the Scribe', 'Rabbi Yehuda HaNasi', 'Maimonides']
      },
      {
        tradition: 'christianity',
        headline: 'The Holy Bible: Old and New Testaments',
        content: 'Christianity acknowledges the Old Testament (the Hebrew scriptures) and adds the New Testament, recording the life, death, resurrection of Jesus and early church apostolic teachings. Scriptures are divinely inspired (theopneustos), bearing witness to Jesus Christ, who is the primary incarnate Word of God.',
        keyTexts: ['The Four Gospels (Matthew, Mark, Luke, John)', 'Epistles of Paul', 'Book of Psalms', 'Book of Isaiah'],
        focalFigures: ['Jesus of Nazareth', 'Apostle Paul', 'Apostle Peter', 'Saint Jerome']
      },
      {
        tradition: 'islam',
        headline: 'The Quran and the Hadith Traditions',
        content: 'The Holy Quran is the verbatim, uncreated speech of Allah revealed through the Archangel Gabriel to the Prophet Muhammad over 23 years. It acts as the final guardian and confirmation (Muhaymin) of previous scriptures. Alongside the Quran, Hadith literature records the authenticated sayings, actions, and approvals (Sunnah) of the Prophet.',
        keyTexts: ['The Holy Quran (114 Surahs)', 'Sahih al-Bukhari', 'Sahih Muslim', 'Muwatta Imam Malik'],
        focalFigures: ['Prophet Muhammad', 'Archangel Jibril', 'Caliph Uthman ibn Affan', 'Zayd ibn Thabit']
      }
    ],
    comparativeTakeaway: 'While Christianity views the Person of Christ as the Word of God incarnate and the Bible as inspired witness, Islam views the Quran itself as the direct verbatim Word of God in text, and Judaism views the Torah as both a historical covenantal text and an eternal divine blueprint to be dynamically interpreted.',
    relatedComparisonSlugs: ['sacred-texts-differ', 'concept-covenant', 'moses-musa']
  },

  'prophets-figures': {
    slug: 'prophets-figures',
    title: 'Prophets & Founding Figures',
    category: 'People',
    icon: '🕊️',
    summary: 'The messengers, spiritual pioneers, and moral leaders who communicated the Divine Will across millennia.',
    historicalOverview: 'Spanning nomadic tribes in Mesopotamia to royal courts in Egypt and Jerusalem, and finally the trade routes of Arabia, prophets formed the vanguard of ethical monotheism.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Nevi’im: Divine Spokespersons and Moral Conscience',
        content: 'Prophets in Judaism were not mere fortunetellers but individuals possessed by the Spirit of God to rebuke kings, demand social justice, and call the people back to the covenant. Moses is the supreme prophet with whom God spoke face to face; prophecy ceased after the Second Temple era (Malachi).',
        keyTexts: ['Deuteronomy 18', 'Isaiah 1-6', 'Jeremiah 1', 'Amos 5'],
        focalFigures: ['Moshe (Moses)', 'Elijah (Eliyahu)', 'Isaiah (Yeshayahu)', 'Jeremiah (Yirmiyahu)']
      },
      {
        tradition: 'christianity',
        headline: 'Prophets as Precursors and Witnesses to Christ',
        content: 'The prophetic line of Israel is seen as preparing the highway for the Messiah. Prophecies of the suffering servant (Isaiah 53) and Davidic king find fulfillment in Jesus Christ. Jesus is the ultimate Prophet, Priest, and King, with the apostolic church continuing prophetic witness in the Holy Spirit.',
        keyTexts: ['Hebrews 1:1-2', 'Luke 24:25-27', 'Isaiah 53', 'Matthew 3 (John the Baptist)'],
        focalFigures: ['John the Baptist', 'Isaiah', 'Moses', 'Jesus Christ']
      },
      {
        tradition: 'islam',
        headline: 'Nubuwwah and Risalah: The Chain of 124,000 Messengers',
        content: 'Islam teaches that Allah sent prophets to every nation preaching monotheism (Tawhid). There are 25 named prophets in the Quran, headed by the five great messengers of resolve (Ulul Azmi): Nuh, Ibrahim, Musa, Isa, and Muhammad — who seals the prophetic cycle (Khatam an-Nabiyyin). All prophets are morally protected (Ma’sum).',
        keyTexts: ['Surah Al-Anbiya (21)', 'Surah Al-Ahzab 33:40', 'Surah An-Nahl 16:36'],
        focalFigures: ['Muhammad (Seal of Prophets)', 'Ibrahim (Khalilullah)', 'Musa (Kalimullah)', 'Isa (Ruhullah)']
      }
    ],
    comparativeTakeaway: 'All three traditions trace their moral architecture to prophetic leadership, but differ on prophetic infallibility, the status of Jesus, and whether prophecy reached its completion with the Biblical canon, the coming of Christ, or the sealing of Muhammad.',
    relatedComparisonSlugs: ['abraham-traditions', 'moses-musa', 'jesus-isa', 'shared-figures']
  },

  'theology-beliefs': {
    slug: 'theology-beliefs',
    title: 'Theology & Concepts of the Divine',
    category: 'Theology',
    icon: '✡️',
    summary: 'Core doctrines, understanding the nature of God, divine oneness, grace, and redemption.',
    historicalOverview: 'How monotheism transitioned from ancient tribal loyalty to rigorous philosophical formulation in dialogue with Greek philosophy, Christian scholasticism, and Islamic Kalam.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Hashem Echad: Absolute Unity and Incorporeality',
        content: 'God is strictly one, unique, non-physical, eternal, and without parts. Declared daily in the Shema ("Hear O Israel, HaShem is our God, HaShem is One"). God is both transcendent Creator and intimately engaged in the historical destiny of His people.',
        keyTexts: ['Deuteronomy 6:4 (Shema)', 'Maimonides’ Guide for the Perplexed', 'Isaiah 45:5-7'],
        focalFigures: ['Maimonides (Rambam)', 'Saadia Gaon', 'Rashi']
      },
      {
        tradition: 'christianity',
        headline: 'The Holy Trinity: One God in Three Persons',
        content: 'God is one divine essence subsisting in three co-equal, co-eternal Persons: Father, Son, and Holy Spirit. God’s inner nature is an eternal communion of self-giving love (Agape). Through the Incarnation, the Son took human nature to redeem humanity.',
        keyTexts: ['Nicene-Constantinopolitan Creed', 'John 10:30', 'Matthew 28:19', '1 John 4:8'],
        focalFigures: ['Athanasius of Alexandria', 'Augustine of Hippo', 'Thomas Aquinas']
      },
      {
        tradition: 'islam',
        headline: 'Tawhid: Pure and Incomparable Monotheism',
        content: 'Tawhid constitutes the core of Islam: Allah is unique, has no partners, no offspring, and no equals. Divided into Tawhid ar-Rububiyyah (Lordship), Tawhid al-Uluhiyyah (Worship), and Tawhid al-Asma was-Sifat (Names and Attributes). Shirk (associating partners with God) is the unforgivable sin if unrepented.',
        keyTexts: ['Surah Al-Ikhlas 112:1-4', 'Ayat al-Kursi (2:255)', 'Surah Ash-Shura 42:11'],
        focalFigures: ['Imam Al-Ghazali', 'Abu al-Hasan al-Ash’ari', 'Ibn Taymiyyah']
      }
    ],
    comparativeTakeaway: 'The central divergence in Abrahamic theology is Christology and the Trinity: while Christianity views the Trinity as the fullness of monotheistic revelation, Judaism and Islam regard it as a compromise of absolute divine oneness.',
    relatedComparisonSlugs: ['jesus-isa', 'concept-covenant', 'creation-and-fall']
  },

  'creation-origins': {
    slug: 'creation-origins',
    title: 'Creation & Origins',
    category: 'Theology',
    icon: '🌅',
    summary: 'Cosmology, divine order, the origin of humanity, and the relationship between nature and Creator.',
    historicalOverview: 'Biblical and Quranic accounts established a worldview that cosmos is neither random nor divine itself, but an ordered creation of a sovereign God.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Creatio ex Nihilo (Yesh me-Ayin) and Tikkun Olam',
        content: 'God created the heavens and earth purposefully in six days, resting on the Shabbat. Humanity was formed in the Divine image (Tzelem Elohim) and tasked with partnering with God in repairing and elevating creation (Tikkun Olam).',
        keyTexts: ['Genesis 1-2', 'Psalm 104', 'Talmud Sanhedrin 37a'],
        focalFigures: ['Adam', 'Chavah (Eve)', 'Ramban (Nachmanides)']
      },
      {
        tradition: 'christianity',
        headline: 'Creation through the Word and Anticipation of New Creation',
        content: 'All things were made through the Logos (Word/Christ). Creation is fundamentally good, marred by the Fall, and will ultimately be restored in the New Heavens and New Earth through the redemption of Christ.',
        keyTexts: ['Genesis 1', 'John 1:1-3', 'Romans 8:19-23', 'Revelation 21:1'],
        focalFigures: ['Adam', 'Eve', 'Paul the Apostle']
      },
      {
        tradition: 'islam',
        headline: 'Signs in the Cosmos (Ayat) and Human Stewardship',
        content: 'The universe was brought into being by Allah’s command "Kun!" (Be!). Every star, ocean, and biological lifeform is a sign (Ayah) pointing to the Creator. Man was appointed as Khalifah (trustee/steward) upon the earth.',
        keyTexts: ['Surah Al-Anbiya 21:30', 'Surah Fussilat 41:11', 'Surah Ar-Rum 30:20-25'],
        focalFigures: ['Adam', 'Hawwa', 'Iblis']
      }
    ],
    comparativeTakeaway: 'All three traditions celebrate creation as an intentional divine act conferring sacred worth on human life and stewardship over the natural world.',
    relatedComparisonSlugs: ['creation-and-fall', 'concept-covenant', 'abraham-traditions']
  },

  'religious-history': {
    slug: 'religious-history',
    title: 'Religious History & Civilizations',
    category: 'History',
    icon: '🏛️',
    summary: 'The historical development, migrations, empires, and cultural flowering of the Abrahamic faiths.',
    historicalOverview: 'Tracing the journey from Ancient Mesopotamia, the kingdoms of Israel and Judah, Roman persecution and imperial adoption, through Islamic caliphates to the modern era.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Exile, Memory, and Resilience across Diasporas',
        content: 'The destruction of the First Temple by Babylon (586 BCE) and Second Temple by Rome (70 CE) dispersed the Jewish people across the world. Rabbinic Judaism emerged as the vehicle of cultural and religious continuity, with major centers in Babylonia, Sepharad (Spain), and Ashkenaz (Central/Eastern Europe).',
        keyTexts: ['Books of Maccabees', 'Josephus Jewish War', 'Medieval Responsa Literature'],
        focalFigures: ['King David', 'Ezra', 'Bar Kokhba', 'Theodor Herzl']
      },
      {
        tradition: 'christianity',
        headline: 'From Catacombs to Global Christendom',
        content: 'Born as a persecuted movement in 1st century Judea, Christianity spread rapidly through Roman roads and cities. Emperor Constantine legalised it in 313 CE. Historical milestones include the East-West Schism (1054) and the Protestant Reformation (1517), expanding to become the most widespread global religion.',
        keyTexts: ['Eusebius Ecclesiastical History', 'Augustine City of God', 'Creeds of Nicea & Chalcedon'],
        focalFigures: ['Constantine the Great', 'Martin Luther', 'Francis of Assisi', 'Mother Teresa']
      },
      {
        tradition: 'islam',
        headline: 'The Rise of the Caliphates and Golden Age',
        content: 'Following Prophet Muhammad’s migration to Medina (Hijrah, 622 CE), the Muslim community established a vast civilizational sphere stretching from Spain to the borders of China under the Rashidun, Umayyad, and Abbasid caliphates, characterized by monumental advances in science, arts, philosophy, and trade.',
        keyTexts: ['Tarikh al-Tabari', 'Ibn Khaldun’s Muqaddimah', 'Sirah Nabawiyyah'],
        focalFigures: ['Abu Bakr', 'Umar ibn al-Khattab', 'Harun al-Rashid', 'Salahuddin al-Ayyubi']
      }
    ],
    comparativeTakeaway: 'The three traditions have intertwined histories marked by shared intellectual Golden Ages in Andalusia and the Levant, alongside periods of geopolitical rivalry and coexistence.',
    relatedComparisonSlugs: ['historical-connections', 'abraham-traditions', 'sacred-places']
  },

  'traditions-practices': {
    slug: 'traditions-practices',
    title: 'Traditions & Practices',
    category: 'Practice',
    icon: '🕌',
    summary: 'Daily prayers, fasts, dietary laws, festivals, and rites of passage that anchor faith into physical life.',
    historicalOverview: 'Abrahamic faith is deeply incarnate in daily rhythm: sacred time (Shabbat, Sunday, Jumu’ah), sacred food, charity, and rites of solidarity.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Mitzvot, Halakha, and the Rhythm of Sacred Time',
        content: 'Religious life is structured by 613 Mitzvot (commandments) and Halakha (Jewish Law). Core practices include keeping the Shabbat, Kashrut (dietary laws), Tefillah (three daily prayer services), and holy days such as Yom Kippur, Passover (Pesach), and Sukkot.',
        keyTexts: ['Shulchan Aruch', 'Mishnah Berurah', 'Siddur (Prayer Book)'],
        focalFigures: ['Yosef Karo', 'Baal Shem Tov', 'The Vilna Gaon']
      },
      {
        tradition: 'christianity',
        headline: 'Sacraments, Liturgy, and the Christian Year',
        content: 'Christian practice revolves around communal worship on Sunday (Lord’s Day) and the Sacraments/Ordinances, especially Baptism and the Eucharist (Holy Communion). The liturgical calendar guides believers through Advent, Christmas, Lent, Holy Week, Easter, and Pentecost.',
        keyTexts: ['Book of Common Prayer', 'The Roman Missal', 'Eastern Orthodox Divine Liturgy'],
        focalFigures: ['John Chrysostom', 'Benedict of Nursia', 'John Wesley']
      },
      {
        tradition: 'islam',
        headline: 'Arkan al-Islam (The Five Pillars) and Sharia',
        content: 'The five pillars of practice are: Shahadah (creed), Salah (five daily prayers facing Mecca), Zakat (almsgiving), Sawm (fasting throughout Ramadan), and Hajj (pilgrimage to Mecca). These are augmented by Halal dietary observances and moral cultivation (Akhlaq).',
        keyTexts: ['Fiqh al-Sunnah', 'Al-Risala of Ash-Shafi’i', 'Bidayat al-Mujtahid'],
        focalFigures: ['Imam Abu Hanifa', 'Imam Malik', 'Imam Ash-Shafi’i', 'Imam Ahmad ibn Hanbal']
      }
    ],
    comparativeTakeaway: 'Judaism and Islam emphasize orthopraxy (sacred legal practice, dietary laws, ritual purifications), while Christianity places greater emphasis on orthodoxy and sacramental grace, though all three deeply cultivate prayer, fasting, and charity to the vulnerable.',
    relatedComparisonSlugs: ['concept-covenant', 'sacred-texts-differ', 'historical-connections']
  },

  'sacred-places': {
    slug: 'sacred-places',
    title: 'Sacred Places & Geographies',
    category: 'Geography',
    icon: '🕍',
    summary: 'The holy cities, sanctuaries, and shrines that anchor Abrahamic religious memory and pilgrimage.',
    historicalOverview: 'Sacred geography links heaven and earth: Mount Moriah, Mount Sinai, the Jordan River, Rome, and the valley of Mecca have drawn millions of pilgrims across centuries.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Jerusalem (Yerushalayim) and the Kotel',
        content: 'Jerusalem and Mount Moriah (the Temple Mount) are the spiritual heart of Judaism. Facing the Western Wall (Kotel) connects every prayer to the historic Holy of Holies. Other sacred cities in the Land of Israel include Hebron (Machpelah), Safed, and Tiberias.',
        keyTexts: ['Psalm 137', 'Lamentations', 'Maimonides Hilchot Beit HaBechirah'],
        focalFigures: ['King Solomon', 'King David', 'Rabbi Yehuda HaLevi']
      },
      {
        tradition: 'christianity',
        headline: 'The Holy Sepulchre, Bethlehem, and Rome',
        content: 'Jerusalem is venerated as the site of Jesus’s crucifixion, burial, and resurrection (Church of the Holy Sepulchre). Bethlehem marks His birth, Nazareth His youth, and the Sea of Galilee His ministry. Rome is revered as the martyrdom place of Peter and Paul.',
        keyTexts: ['Acts of the Apostles', 'Pilgrim Travelogues (Egeria)'],
        focalFigures: ['Saint Helena', 'Saint Peter', 'Saint Francis']
      },
      {
        tradition: 'islam',
        headline: 'The Three Harams: Makkah, Madinah, and Al-Quds',
        content: 'The three most sacred sanctuaries in Islam are Masjid al-Haram in Mecca (housing the Kaaba, the Qiblah of prayers), Al-Masjid an-Nabawi in Medina (the Prophet’s city and resting place), and Al-Masjid al-Aqsa in Jerusalem (site of the Isra and Mi’raj heavenly ascension).',
        keyTexts: ['Surah Al-Isra 17:1', 'Surah Al-Baqarah 2:144', 'Hadith of the Three Mosques'],
        focalFigures: ['Prophet Ibrahim', 'Prophet Muhammad', 'Caliph Umar ibn al-Khattab']
      }
    ],
    comparativeTakeaway: 'Jerusalem is the singular city holy to all three traditions: the site of the Jewish Temples, the location of Christ’s passion and resurrection, and the third holiest site and ascension gateway of Islam.',
    relatedComparisonSlugs: ['historical-connections', 'abraham-traditions', 'moses-musa']
  },

  'stories-narratives': {
    slug: 'stories-narratives',
    title: 'Stories & Narratives',
    category: 'Narrative',
    icon: '📜',
    summary: 'The great dramatic narratives shared across scriptures: Noah’s Ark, Joseph and his brothers, Exodus, and Jonah.',
    historicalOverview: 'Narratives serve as the primary carrier of moral meaning and existential truth across Hebrew, Christian, and Islamic cultures.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'The Covenantal Story of Family and Peoplehood',
        content: 'Stories are told with raw realism, highlighting human vulnerability and divine redemption. The Exodus from Egypt is retold every year at Passover as a perpetual liberation narrative that shapes Jewish self-understanding.',
        keyTexts: ['Genesis', 'Exodus', 'Passover Haggadah', 'Book of Jonah'],
        focalFigures: ['Noah (Noach)', 'Joseph (Yosef)', 'Jonah (Yonah)']
      },
      {
        tradition: 'christianity',
        headline: 'Typological Narratives of Salvation History',
        content: 'Old Testament narratives are read as figures and shadows that anticipate the life, sacrifice, and victory of Jesus Christ. Jonah’s three days in the whale prefigure Christ’s three days in the tomb; the Passover lamb prefigures the Lamb of God.',
        keyTexts: ['Gospels', '1 Corinthians 10:1-11', 'Hebrews 11'],
        focalFigures: ['Noah', 'Jonah', 'Joseph', 'Jesus']
      },
      {
        tradition: 'islam',
        headline: 'Ahsan al-Qasas: Moral Parables and Guidance',
        content: 'Stories in the Quran are described as "the best of narratives" (Ahsan al-Qasas), intended as didactic admonitions (Ibrah) and proofs of monotheism. Joseph’s story is told in a single continuous chapter (Surah Yusuf) exemplifying patience and trust in Allah’s decree.',
        keyTexts: ['Surah Yusuf (12)', 'Surah Hud (11)', 'Surah Yunus (10)', 'Surah Al-Kahf (18)'],
        focalFigures: ['Yusuf (Joseph)', 'Nuh (Noah)', 'Yunus (Jonah)', 'Ayyub (Job)']
      }
    ],
    comparativeTakeaway: 'The same narratives echo across traditions with subtle, profound shifts: Judaism emphasizes historical covenantal memory; Christianity emphasizes typological fulfillment; Islam emphasizes moral guidance and prophetic vindication.',
    relatedComparisonSlugs: ['shared-figures', 'moses-musa', 'creation-and-fall']
  },

  'shared-themes': {
    slug: 'shared-themes',
    title: 'Differences & Shared Themes',
    category: 'Comparative',
    icon: '🔗',
    summary: 'An analytical overview of what unites Judaism, Christianity, and Islam, and where theological paths diverge.',
    historicalOverview: 'Centuries of polemics and scholarly dialogue have highlighted common ethical monotheistic foundations alongside distinct theological paradigms.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Ethical Monotheism, Law, and Particularity',
        content: 'Emphasizes an ongoing covenant with Israel to sanctify earthly life through Mitzvot, while welcoming non-Jews who uphold the basic ethical Noahide laws.',
        keyTexts: ['Micah 6:8', 'Pirkei Avot', 'Maimonides Hilchot Melachim'],
        focalFigures: ['Hillel the Elder', 'Maimonides']
      },
      {
        tradition: 'christianity',
        headline: 'Incarnational Grace, Atonement, and Universal Mission',
        content: 'Emphasizes God’s ultimate self-disclosure in the person of Jesus Christ, salvation by grace through faith, and reconciliation with God across all nations.',
        keyTexts: ['John 3:16', 'Romans 12', '1 Corinthians 13'],
        focalFigures: ['Apostle Paul', 'Augustine']
      },
      {
        tradition: 'islam',
        headline: 'Tawhid, Primordial Fitrah, and Divine Guidance',
        content: 'Emphasizes pure submission to the One Creator without intermediary, affirming human moral capability (Fitrah) guided by explicit divine law (Sharia).',
        keyTexts: ['Surah Al-Baqarah 2:285-286', 'The Hadith of Jibril', 'Surah Al-Hujurat 49:13'],
        focalFigures: ['Prophet Muhammad', 'Ali ibn Abi Talib']
      }
    ],
    comparativeTakeaway: 'All three traditions share a common heritage rooted in the God of Abraham, commitment to moral justice, prayer, and charity, while maintaining distinct self-understandings regarding salvation, incarnation, and sacred law.',
    relatedComparisonSlugs: ['concept-covenant', 'jesus-isa', 'abraham-traditions']
  },

  'who-is-abraham': {
    slug: 'who-is-abraham',
    title: 'Who Is Abraham?',
    category: 'Foundations',
    icon: '🕊️',
    summary: 'The founding patriarch who rejected idolatry, entered into a covenant with the Creator, and became the father of nations.',
    historicalOverview: 'Journeying from Ur in Mesopotamia through Haran, Canaan, and Egypt, Abraham’s walk of faith is the foundational archetype for Judaism, Christianity, and Islam.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Avraham: The First Jew and Father of the Covenant',
        content: 'Abraham smashed his father’s idols, recognized the single Creator through reason, and accepted the covenant of circumcision (Brit Milah), bequeathing the divine promise to Isaac and Jacob.',
        keyTexts: ['Genesis 12-22', 'Midrash Bereishit Rabbah'],
        focalFigures: ['Avraham', 'Sarah', 'Yitzchak (Isaac)']
      },
      {
        tradition: 'christianity',
        headline: 'Abraham: Father of Faith for All Nations',
        content: 'Abraham believed God’s promise before circumcision, making him the spiritual father of all who believe in Christ. His sacrifice of Isaac anticipates God the Father’s gift of His Son on the Cross.',
        keyTexts: ['Romans 4', 'Galatians 3', 'Hebrews 11'],
        focalFigures: ['Abraham', 'Isaac', 'Paul']
      },
      {
        tradition: 'islam',
        headline: 'Ibrahim: Khalilullah and Builder of the Kaaba',
        content: 'Prophet Ibrahim is the pristine Hanif who submitted completely to Allah. With his firstborn son Ismail, he purified and raised the foundations of the ancient House of Allah (Kaaba) in Mecca.',
        keyTexts: ['Surah Ibrahim (14)', 'Surah Al-Baqarah 2:125-130', 'Surah As-Saffat 37:100-111'],
        focalFigures: ['Ibrahim', 'Ismail (Ishmael)', 'Hajar (Hagar)']
      }
    ],
    comparativeTakeaway: 'Abraham stands as the unifying ancestral figure whose radical fidelity to the One God birthed the three great western monotheistic religions.',
    relatedComparisonSlugs: ['abraham-traditions', 'concept-covenant', 'moses-musa']
  },

  'three-books': {
    slug: 'three-books',
    title: 'Three Sacred Books',
    category: 'Foundations',
    icon: '📖',
    summary: 'A primer on the Torah, Bible, and Quran — how they were composed, preserved, and revered.',
    historicalOverview: 'The evolution of scripture across three millennia: parchment scrolls kept in arks, codices bound in monasteries, and melodic recitation preserved by memory and standardized text.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'The Sefer Torah: The Hand-Inscribed Scroll',
        content: 'Inscribed by a specialized scribe (Sofer) on kosher parchment without vowels or punctuation, the Torah scroll is kept in the Holy Ark (Aron Kodesh) and read weekly in synagogues.',
        keyTexts: ['Torah Scrolls', 'Masoretic Text'],
        focalFigures: ['Ezra', 'The Masoretes']
      },
      {
        tradition: 'christianity',
        headline: 'The Holy Bible: Canonical Scriptures of the Church',
        content: 'Comprising Old Testament Hebrew scriptures translated into Greek (Septuagint) and Latin (Vulgate), joined with the 27 Greek books of the New Testament.',
        keyTexts: ['Septuagint', 'Jerome’s Vulgate', 'King James Version'],
        focalFigures: ['Jerome', 'Athanasius', 'Gutenberg']
      },
      {
        tradition: 'islam',
        headline: 'The Mushaf: The Written Quran',
        content: 'The Quran exists primarily as spoken divine recitation (Qira’at) memorized in full by millions (Huffaz) and preserved identically in written codices (Mushaf).',
        keyTexts: ['Uthmanic Codex', 'Warsh and Hafs recitations'],
        focalFigures: ['Zayd ibn Thabit', 'Uthman ibn Affan']
      }
    ],
    comparativeTakeaway: 'The three books reflect distinct modes of holiness: a meticulously scribed parchment covenant scroll, an inspired apostolic library of salvation, and an inimitable recited direct divine speech.',
    relatedComparisonSlugs: ['sacred-texts-differ', 'sacred-texts', 'concept-covenant']
  },

  'abrahamic-timeline': {
    slug: 'abrahamic-timeline',
    title: 'An Abrahamic Timeline',
    category: 'History',
    icon: '🏛️',
    summary: 'From Abraham to Muhammad: the sequential chronology of revelation, kingdoms, exiles, and foundations.',
    historicalOverview: 'A sweeping panorama: Bronze Age patriarchal wandering (c. 1800 BCE), Exodus and Sinai (c. 13th c. BCE), Davidic Kingdom (c. 1000 BCE), Babylonian Exile (586 BCE), Second Temple & Jesus (1st c. CE), and the Hijrah of Muhammad (622 CE).',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'The Chain of Tradition (Mesoret)',
        content: 'Chronology rooted in Seder Olam: Patriarchs → Egyptian Bondage → Exodus & Sinai → Judges → Kings & First Temple → Babylonian Captivity → Second Temple → Rabbinic dispersion.',
        keyTexts: ['Seder Olam Rabbah', 'Pirkei Avot 1:1'],
        focalFigures: ['Abraham', 'Moses', 'David', 'Ezra', 'Hillel']
      },
      {
        tradition: 'christianity',
        headline: 'Salvation History (Heilsgeschichte)',
        content: 'History divided between the Old Dispensation of Law/Prophets and the "Fullness of Time" with Christ’s Incarnation, continuing through the Church Age to the Second Coming.',
        keyTexts: ['Galatians 4:4', 'Acts of the Apostles'],
        focalFigures: ['Abraham', 'Moses', 'David', 'Jesus Christ', 'Apostles']
      },
      {
        tradition: 'islam',
        headline: 'The Cycle of Messengers Culminating in the Hijrah',
        content: 'Continuous sequence from Adam through Ibrahim, Musa, and Isa, culminating in Prophet Muhammad’s mission in 610 CE and the Hijrah to Medina in 622 CE, which begins the Islamic calendar.',
        keyTexts: ['Quran Surah Al-Baqarah', 'Sirat Ibn Hisham'],
        focalFigures: ['Adam', 'Ibrahim', 'Musa', 'Isa', 'Muhammad']
      }
    ],
    comparativeTakeaway: 'All three traditions view human history not as a cyclical illusion, but as a linear, morally purposeful arena where God reveals His will and brings about redemption.',
    relatedComparisonSlugs: ['historical-connections', 'prophets-figures', 'religious-history']
  },

  'shared-stories': {
    slug: 'shared-stories',
    title: 'Stories Told in All Three',
    category: 'Narrative',
    icon: '📜',
    summary: 'Comparative analysis of universal episodes: The Flood of Noah, the Sacrifice, the Exodus, and the Queen of Sheba.',
    historicalOverview: 'Common narrative memories circulating in the ancient Semitic cradle, reinterpreted to address the theological questions of each community.',
    perspectives: [
      {
        tradition: 'judaism',
        headline: 'Historical Memory and Ethical Struggle',
        content: 'Stories emphasize the resilience and moral accountability of God’s covenantal partners, without hiding their human frailties.',
        keyTexts: ['Genesis', 'Exodus', 'Talmudic Aggadah'],
        focalFigures: ['Noach', 'Yosef', 'Moshe', 'Yonah']
      },
      {
        tradition: 'christianity',
        headline: 'Foreshadowing of the Gospel and Spiritual Life',
        content: 'Stories serve as types and allegories illustrating grace, redemption, the sacraments, and the triumph of the cross.',
        keyTexts: ['1 Corinthians 10', '1 Peter 3:20-21 (Noah & Baptism)'],
        focalFigures: ['Noah', 'Isaac', 'Moses', 'Jonah']
      },
      {
        tradition: 'islam',
        headline: 'Exemplars of Tawhid, Sabr (Patience), and Divine Vindication',
        content: 'The stories spotlight how righteous messengers called their people to monotheism, endured persecution with patience, and were ultimately vindicated by Allah.',
        keyTexts: ['Surah Al-Anbiya', 'Surah Al-Qasas', 'Surah As-Saffat'],
        focalFigures: ['Nuh', 'Ibrahim', 'Musa', 'Yusuf']
      }
    ],
    comparativeTakeaway: 'The shared storybook of the Abrahamic world reveals striking harmony on core values of obedience, humility, and trust in God, with nuances mirroring their distinctive theological convictions.',
    relatedComparisonSlugs: ['shared-figures', 'abraham-traditions', 'creation-and-fall']
  }
}
