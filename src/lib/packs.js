// Canonical pack catalogue for Gifta Breadfruit Bars.
// Every price is the price of the whole pack: one companion pack (6 bars) or one carton.
// A companion pack is the base unit — cartons are multiples of it.

export const PACKS = [
  {
    id: 1,
    name: "COMPANION PACK",
    audience: "For one",
    icon: "BriefcaseBusiness",
    contents: "6 Gifta Short Bars",
    companionPacks: 1,
    bars: 6,
    price: 1500,
    oldPrice: null,
    image: "/products/product1.jpeg",
    imageWidth: 803,
    imageHeight: 1280,
    fit: "contain",
    summary:
      "The simplest unit — portable for the office tea break, flights, travels, meetings and conferences.",
    description:
      "The simplest unit of Gifta Breadfruit Bars — six short bars in one portable pack. Made for the office tea break and a companion on flights, long distant travels and visits, meetings and conferences.",
  },
  {
    id: 2,
    name: "FAMILY PACK",
    audience: "For the household",
    icon: "Users",
    contents: "1 carton · 10 Companion Packs · 60 Bars",
    companionPacks: 10,
    bars: 60,
    price: 13000,
    oldPrice: 15000,
    image: "/products/family_pack.jpeg",
    imageWidth: 571,
    imageHeight: 900,
    fit: "contain",
    featured: true,
    summary:
      "For children's school lunch packs, family breakfast and executive meetings.",
    description:
      "One carton of Family Gifta Breadfruit Bars, holding 10 Companion packs. Good for children's school lunch packs, family breakfast and executive meetings.",
  },
  {
    id: 3,
    name: "GEZELLIG PACK",
    audience: "For the team",
    icon: "Gift",
    contents: "1 carton · 30 Companion Packs · 180 Bars",
    companionPacks: 30,
    bars: 180,
    price: 33000,
    oldPrice: 45000,
    image: "/products/gezellig.jpeg",
    imageWidth: 1024,
    imageHeight: 1024,
    fit: "contain",
    summary:
      "For planned small group celebrations, gifts to staff, office guests and colleagues.",
    description:
      "One carton of Gezellig Gifta Breadfruit Bars, holding 30 Companion packs. Good for planned small group celebrations, gifts to staff and office guests and colleagues.",
  },
  {
    id: 4,
    name: "EVENTS PACK",
    audience: "For the occasion",
    icon: "PartyPopper",
    contents: "1 carton · 50 Companion Packs · 300 Bars",
    companionPacks: 50,
    bars: 300,
    price: 50000,
    oldPrice: 75000,
    image: "/products/product3.jpeg",
    imageWidth: 1080,
    imageHeight: 771,
    fit: "cover",
    imagePosition: "object-bottom",
    summary:
      "For indoor and outdoor occasions, chops, prestigious events, party executives and church communions.",
    description:
      "One carton of Events Gifta Breadfruit Bars, holding 50 Companion packs. Good for immediate indoor and outdoor occasions as part of small chops, special prestigious events, political party and other union executives, church fasting and other congregational communions.",
  },
  {
    id: 5,
    name: "CUSTOMIZED PACK",
    audience: "Your branding",
    icon: "PencilRuler",
    contents: "Special carton · your logo, picture or event",
    companionPacks: null,
    bars: null,
    price: null,
    oldPrice: null,
    isCustom: true,
    image: null,
    summary:
      "Your logo, picture or event on a special carton, at negotiated prices.",
    description:
      "A special carton of Gifta Breadfruit Bars designed with the customer's logo, picture or event. For political party candidates, business gurus and companies, transporters and airlines, at negotiated prices.",
  },
];

export const getPack = (id) =>
  PACKS.find((pack) => pack.id === Number(id)) || PACKS[0];

// What one bar costs inside a pack — the clearest way to compare packs.
export const pricePerBar = (pack) =>
  pack && pack.bars ? pack.price / pack.bars : null;

export const savingOn = (pack) =>
  pack && pack.oldPrice ? pack.oldPrice - pack.price : 0;
