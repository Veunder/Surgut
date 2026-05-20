import { useEffect, useState } from 'react'

export default function SurgutCityPortal() {
  const heroImages = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1400&auto=format&fit=crop'
  ]

  const attractions = [
    {
      title: 'Старый Сургут',
      image:
        'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
      text:
        'Главная историческая площадка города с деревянными домами, ремесленными мастерскими и атмосферой старой Сибири. Здесь проходят народные гуляния, фестивали и мастер-классы.'
    },
    {
      title: 'Югорский вантовый мост',
      image:
        'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop',
      text:
        'Один из символов Сургута и инженерное достижение Сибири. С моста открываются впечатляющие виды на Обь, особенно вечером во время подсветки.'
    },
    {
      title: 'Парк «За Саймой»',
      image:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
      text:
        'Лесной парк внутри города с велосипедными дорожками, лыжными трассами и местами отдыха. Любимое место сургутян летом и зимой.'
    },
    {
      title: 'Храм Преображения Господня',
      image:
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop',
      text:
        'Одна из главных архитектурных достопримечательностей города. Храм выделяется величественной архитектурой и богатым внутренним убранством.'
    }
  ]

  const celebrities = [
    {
      name: 'Елена Крыгина',
      role: 'Визажист и блогер',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=900&auto=format&fit=crop'
    },
    {
      name: 'Елена Терлеева',
      role: 'Певица и композитор',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=900&auto=format&fit=crop'
    },
    {
      name: 'Ксения Клименко',
      role: 'Гимнастка',
      image:
        'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=900&auto=format&fit=crop'
    },
    {
      name: 'Фарман Салманов',
      role: 'Первооткрыватель сибирской нефти',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=900&auto=format&fit=crop'
    }
  ]

  const culture = [
    {
      title: 'Вороний день',
      text:
        'Традиционный праздник ханты и манси, символизирующий приход весны. В этот день устраивают народные гуляния, повязывают ленточки на берёзы и проводят обряды обновления.'
    },
    {
      title: 'Медвежьи игрища',
      text:
        'Один из главных обрядов народа ханты. Включает песни, танцы и сценические действия, посвящённые медведю как защитнику и покровителю.'
    },
    {
      title: 'Северная кухня',
      text:
        'Сургут славится блюдами из муксуна и нельмы: строганиной, сугудаем и пельменями с северной рыбой.'
    }
  ]

  const [heroIndex, setHeroIndex] = useState(0)
  const [activeAttraction, setActiveAttraction] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const nextAttraction = () => {
    setActiveAttraction((prev) => (prev + 1) % attractions.length)
  }

  const prevAttraction = () => {
    setActiveAttraction((prev) => (prev - 1 + attractions.length) % attractions.length)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-500 text-xl font-bold text-black shadow-lg">
              🦫
            </div>

            <div>
              <h1 className="text-3xl font-black tracking-wide">СУРГУТ</h1>
              <p className="text-sm text-zinc-400">Нефтяное сердце Сибири</p>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-zinc-700 shadow-lg">
            <div className="h-5 w-16 bg-blue-700"></div>
            <div className="h-5 w-16 bg-green-600"></div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-4 uppercase tracking-[0.3em] text-yellow-400">
            Настоящая Сибирь
          </p>

          <h2 className="mb-6 text-5xl font-black leading-tight">
            Город нефти,
            <br />
            северной природы
            <br />
            и сильных людей
          </h2>

          <p className="mb-6 text-lg leading-8 text-zinc-300">
            Сургут — крупнейший индустриальный центр Югры, основанный в 1594 году. Город вырос
            из небольшого северного поселения в энергетическое сердце России после открытия
            месторождений нефти и газа в XX веке.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="text-3xl font-bold text-yellow-400">1594</h3>
              <p className="mt-2 text-zinc-400">Год основания</p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
              <h3 className="text-3xl font-bold text-yellow-400">Нефть</h3>
              <p className="mt-2 text-zinc-400">Основа экономики</p>
            </div>
          </div>
        </div>

        <div className="relative h-[500px] overflow-hidden rounded-[2rem] border border-zinc-800 shadow-2xl">
          {heroImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={`Сургут ${index + 1}`}
              className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
                heroIndex === index ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-zinc-700 bg-black/50 p-5 backdrop-blur-md">
            <h3 className="mb-2 text-2xl font-bold">Северный мегаполис</h3>
            <p className="text-zinc-300">
              Сургут сочетает современную архитектуру, нефтегазовую промышленность и природу
              тайги.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-4 uppercase tracking-[0.2em] text-yellow-400">История</p>
            <h2 className="mb-4 text-4xl font-black">От острога до нефтяной столицы</h2>

            <p className="max-w-4xl leading-8 text-zinc-400">
              Сургут был основан по указу Фёдора Иоанновича для укрепления власти России в
              Сибири. Настоящий перелом произошёл в 1960-х годах после открытия нефтяных
              месторождений.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-zinc-800 bg-black p-6">
              <h3 className="mb-4 text-2xl font-bold">Основание</h3>
              <p className="leading-7 text-zinc-400">
                Город основан воеводами Фёдором Барятинским и Владимиром Оничковым.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black p-6">
              <h3 className="mb-4 text-2xl font-bold">Нефтяной бум</h3>
              <p className="leading-7 text-zinc-400">
                Массовая добыча нефти и газа полностью изменила судьбу Сургута.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-black p-6">
              <h3 className="mb-4 text-2xl font-bold">Современность</h3>
              <p className="leading-7 text-zinc-400">
                Сегодня Сургут — один из важнейших энергетических центров России.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-4 uppercase tracking-[0.2em] text-yellow-400">
              Достопримечательности
            </p>
            <h2 className="text-4xl font-black">Главные места Сургута</h2>
          </div>

          <div className="flex gap-3">
            <button
              onClick={prevAttraction}
              className="h-14 w-14 rounded-full border border-zinc-700 bg-zinc-900 text-2xl transition hover:bg-zinc-800"
            >
              ←
            </button>

            <button
              onClick={nextAttraction}
              className="h-14 w-14 rounded-full bg-yellow-400 text-2xl font-bold text-black transition hover:scale-105"
            >
              →
            </button>
          </div>
        </div>

        <div
          className="grid gap-10 lg:grid-cols-2 lg:items-center"
          onWheel={(e) => {
            if (e.deltaY > 0) {
              nextAttraction()
            } else {
              prevAttraction()
            }
          }}
        >
          <div className="relative h-[500px] overflow-hidden rounded-[2rem] border border-zinc-800 shadow-2xl">
            <img
              src={attractions[activeAttraction].image}
              alt={attractions[activeAttraction].title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="mb-6 text-5xl font-black">
              {attractions[activeAttraction].title}
            </h3>

            <p className="mb-8 text-lg leading-9 text-zinc-300">
              {attractions[activeAttraction].text}
            </p>

            <div className="flex flex-wrap gap-3">
              {attractions.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActiveAttraction(index)}
                  className={`rounded-full border px-5 py-3 transition ${
                    activeAttraction === index
                      ? 'border-yellow-400 bg-yellow-400 text-black'
                      : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="mb-4 uppercase tracking-[0.2em] text-yellow-400">Культура</p>
            <h2 className="text-4xl font-black">Традиции и северный дух</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {culture.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-zinc-800 bg-black p-8 transition hover:-translate-y-2"
              >
                <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                <p className="leading-8 text-zinc-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12">
          <p className="mb-4 uppercase tracking-[0.2em] text-yellow-400">Знаменитости</p>
          <h2 className="text-4xl font-black">Люди, связанные с Сургутом</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {celebrities.map((person) => (
            <div
              key={person.name}
              className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-900 transition hover:-translate-y-2"
            >
              <img
                src={person.image}
                alt={person.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="mb-2 text-2xl font-bold">{person.name}</h3>
                <p className="text-zinc-400">{person.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-zinc-800 bg-black">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 md:flex-row">
          <div>
            <h2 className="mb-3 text-3xl font-black">СУРГУТ</h2>
            <p className="max-w-md leading-7 text-zinc-500">
              Город сильных людей, северной природы и энергетического будущего России.
            </p>
          </div>

          <div className="text-zinc-500">
            <p>Основан в 1594 году</p>
            <p>Ханты-Мансийский автономный округ — Югра</p>
            <p>«Здесь начинается настоящая Сибирь»</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
