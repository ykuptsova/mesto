const norwayLofoten = new URL(
  '../images/places/norway-lofoten.jpeg',
  import.meta.url,
)
const austriaTirol = new URL(
  '../images/places/austria-tirol.jpeg',
  import.meta.url,
)
const germanyNeuschwanstein = new URL(
  '../images/places/germany-neuschwanstein.jpg',
  import.meta.url,
)
const finlandLapland = new URL(
  '../images/places/finland-lapland.jpg',
  import.meta.url,
)
const switzerlandZermatt = new URL(
  '../images/places/switzerland-zermatt.jpg',
  import.meta.url,
)
const turkeyCappadocia = new URL(
  '../images/places/turkey-cappadocia.jpg',
  import.meta.url,
)

const initialCards = [
  {
    name: 'Норвегия, Лофотены',
    link: norwayLofoten,
    alt: 'Маленькие жёлтые домики на фоне гор',
  },
  {
    name: 'Австрия, Тироль',
    link: austriaTirol,
    alt: 'Фото Альп в облаках',
  },
  {
    name: 'Германия, Нойшванштайн',
    link: germanyNeuschwanstein,
    alt: 'Фото замка Нойшванштайн с Германии',
  },
  {
    name: 'Финляндия, Лапландия',
    link: finlandLapland,
    alt: 'Северное сияние',
  },
  {
    name: 'Швейцария, Церматт',
    link: switzerlandZermatt,
    alt: 'Фото домиков на фоне горы',
  },
  {
    name: 'Турция, Каппадокия',
    link: turkeyCappadocia,
    alt: 'Фестиваль воздушных шаров',
  },
]

export default initialCards
