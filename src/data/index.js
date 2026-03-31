import suzuki from "../assets/suzuki.png";
import hyundai from "../assets/hyundai.png";
import tata from "../assets/tata.png";
import honda from "../assets/honda.png";
import toyota from "../assets/toyota.png";
import kia from "../assets/kia.png";
import mahindra from "../assets/mahindra.png";
import bmw from "../assets/bmw.png";
import mercedes from "../assets/mercedes.png";
import volkswagen from "../assets/volkswagen.png";    

export const BASE_PRICE = 3500;

export const brands = [
  { id: 'suzuki', name: 'Maruti Suzuki', icon: suzuki },
  { id: 'hyundai', name: 'Hyundai', icon: hyundai },
  { id: 'tata', name: 'Tata', icon: tata },
  { id: 'honda', name: 'Honda', icon: honda },
  { id: 'toyota', name: 'Toyota', icon: toyota },
  { id: 'kia', name: 'Kia', icon: kia },
  { id: 'mahindra', name: 'Mahindra', icon: mahindra },
  { id: 'bmw', name: 'BMW', icon: bmw },
  { id: 'mercedes', name: 'Mercedes', icon: mercedes },
  { id: 'volkswagen', name: 'Volkswagen', icon: volkswagen },
];

export const models = {
  suzuki: [
    { id: 'swift', name: 'Swift', year: '2019–2024', seats: '5 Seats' },
    { id: 'baleno', name: 'Baleno', year: '2019–2024', seats: '5 Seats' },
    { id: 'brezza', name: 'Brezza', year: '2021–2024', seats: '5 Seats' },
    { id: 'ertiga', name: 'Ertiga', year: '2018–2024', seats: '7 Seats' },
  ],
  hyundai: [
    { id: 'creta', name: 'Creta', year: '2020–2024', seats: '5 Seats' },
    { id: 'i20', name: 'i20', year: '2020–2024', seats: '5 Seats' },
    { id: 'venue', name: 'Venue', year: '2019–2024', seats: '5 Seats' },
    { id: 'tucson', name: 'Tucson', year: '2022–2024', seats: '5 Seats' },
  ],
  tata: [
    { id: 'nexon', name: 'Nexon', year: '2020–2024', seats: '5 Seats' },
    { id: 'harrier', name: 'Harrier', year: '2019–2024', seats: '5 Seats' },
    { id: 'safari', name: 'Safari', year: '2021–2024', seats: '7 Seats' },
    { id: 'punch', name: 'Punch', year: '2021–2024', seats: '5 Seats' },
  ],
  honda: [
    { id: 'city', name: 'City', year: '2020–2024', seats: '5 Seats' },
    { id: 'amaze', name: 'Amaze', year: '2021–2024', seats: '5 Seats' },
    { id: 'hrv', name: 'HR-V', year: '2022–2024', seats: '5 Seats' },
  ],
  toyota: [
    { id: 'fortuner', name: 'Fortuner', year: '2021–2024', seats: '7 Seats' },
    { id: 'innova', name: 'Innova HyCross', year: '2022–2024', seats: '7 Seats' },
    { id: 'glanza', name: 'Glanza', year: '2022–2024', seats: '5 Seats' },
  ],
  kia: [
    { id: 'seltos', name: 'Seltos', year: '2020–2024', seats: '5 Seats' },
    { id: 'sonet', name: 'Sonet', year: '2020–2024', seats: '5 Seats' },
    { id: 'carnival', name: 'Carnival', year: '2022–2024', seats: '8 Seats' },
  ],
  mahindra: [
    { id: 'scorpio', name: 'Scorpio-N', year: '2022–2024', seats: '7 Seats' },
    { id: 'xuv700', name: 'XUV700', year: '2021–2024', seats: '7 Seats' },
    { id: 'thar', name: 'Thar', year: '2020–2024', seats: '4 Seats' },
  ],
  bmw: [
    { id: '3series', name: '3 Series', year: '2019–2024', seats: '5 Seats' },
    { id: '5series', name: '5 Series', year: '2020–2024', seats: '5 Seats' },
    { id: 'x5', name: 'X5', year: '2019–2024', seats: '5 Seats' },
  ],
  mercedes: [
    { id: 'cclass', name: 'C-Class', year: '2020–2024', seats: '5 Seats' },
    { id: 'eclass', name: 'E-Class', year: '2020–2024', seats: '5 Seats' },
    { id: 'gle', name: 'GLE', year: '2020–2024', seats: '5 Seats' },
  ],
  volkswagen: [
    { id: 'polo', name: 'Polo', year: '2020–2024', seats: '5 Seats' },
    { id: 'virtus', name: 'Virtus', year: '2021–2024', seats: '5 Seats' },
    { id: 'taigun', name: 'Taigun', year: '2021–2024', seats: '5 Seats' },
  ],
};


export const colors = [
  { id: 'midnight', name: 'Midnight Black', hex: '#0a0a0a', price: 0 },
  { id: 'pearl', name: 'Pearl White', hex: '#f5f0e8', price: 500 },
  { id: 'oxblood', name: 'Oxblood Red', hex: '#6b1a1a', price: 800 },
  { id: 'navy', name: 'Deep Navy', hex: '#0d2137', price: 600 },
  { id: 'tobacco', name: 'Tobacco Brown', hex: '#5a3a1a', price: 700 },
  { id: 'graphite', name: 'Graphite Grey', hex: '#2e2e2e', price: 400 },
  { id: 'racing', name: 'Racing Orange', hex: '#e05a00', price: 900 },
  { id: 'olive', name: 'Olive Green', hex: '#3a4a2a', price: 600 },
  { id: 'slate', name: 'Slate Blue', hex: '#2a3a4a', price: 600 },
  { id: 'champagne', name: 'Champagne', hex: '#c8b87a', price: 1000 },
];

export const patterns = [
  { id: 'plain', name: 'Plain', icon: '▪️', price: 0 },
  { id: 'diamond', name: 'Diamond', icon: '💎', price: 1200 },
  { id: 'honeycomb', name: 'Honeycomb', icon: '🍯', price: 1500 },
  { id: 'racing', name: 'Racing Stripe', icon: '⚡', price: 1000 },
  { id: 'perforated', name: 'Perforated', icon: '🔵', price: 800 },
  { id: 'custom', name: 'Custom Stitch', icon: '✦', price: 2000 },
];

export const materials = [
  { id: 'italian', name: 'Italian Leather', color: '#c89b2c' },
  { id: 'midnight', name: 'Midnight Alcantara', color: '#1e2a5a' },
  { id: 'carbon', name: 'Carbon Sport', color: '#3a3a3a' },
  { id: 'crimson', name: 'Royal Crimson', color: '#7a1a1a' },
  { id: 'white', name: 'Arctic White', color: '#e8e4dc' },
  { id: 'green', name: 'Emerald Racing', color: '#0f5132' },
];


export const TIME_SLOTS = [
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '2:00 PM – 4:00 PM',
  '4:00 PM – 6:00 PM',
];
