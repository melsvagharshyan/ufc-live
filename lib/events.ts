// UFC Events Data
export const ufcEvents = [
  {
    id: 1,
    title: 'UFC Fight Night: Tsarukyan vs Hooker',
    date: 'November 22, 2025',
    venue: 'UFC Apex, Las Vegas',
    image: 'https://ufc.com/images/styles/background_image_sm/s3/2025-10/112225-ufc-fight-night-tsarukyan-vs-hooker-EVENT-ART.jpg?h=d1cb525d&itok=GxYvHH7I',
    mainEvent: 'Tsarukyan vs Hooker',
  },
  {
    id: 2,
    title: 'UFC 310',
    date: 'December 7, 2025',
    venue: 'T-Mobile Arena, Las Vegas',
    image: 'https://pbs.twimg.com/media/G6C2RI5WoAAyttB.jpg',
    mainEvent: 'Championship Fight',
  },
  {
    id: 3,
    title: 'UFC Fight Night',
    date: 'December 14, 2025',
    venue: 'UFC Apex, Las Vegas',
    image: 'https://www.combatarena.net/cdn/shop/articles/categorie_di_peso_ufc_1024x.jpg?v=1735835895',
    mainEvent: 'Main Card',
  },
];

export function getUpcomingEvents() {
  const now = new Date();
  return ufcEvents.filter(event => new Date(event.date) >= now);
}

export function getTodayEvent() {
  const today = new Date().toDateString();
  return ufcEvents.find(event => new Date(event.date).toDateString() === today);
}

