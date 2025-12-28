import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.png';
import img8 from '../assets/img8.png';
import img9 from '../assets/img9.png';
import img10 from '../assets/img10.png';
import img11 from '../assets/img11.png';
import img12 from '../assets/img12.png';

// Основные товары
export const products = [
  { 
    id: 1, 
    name: "Wireless Bluetooth Headphones", 
    price: 300, 
    image: img6, 
    label: "NEW",
    category: "техника",
    brand: "Sony",
    functionality: "аудио"
  },
  { 
    id: 2, 
    name: "Smart Watch Series 5", 
    price: 336, 
    image: img2, 
    label: "NEW",
    category: "техника", 
    brand: "Apple",
    functionality: "умные устройства"
  },
  { 
    id: 3, 
    name: "Laptop Pro 15 inch", 
    price: 370, 
    image: img3, 
    label: "NEW",
    category: "техника", 
    brand: "Apple",
    functionality: "компьютеры"
  },
  { 
    id: 4, 
    name: "Wireless Gaming Mouse", 
    price: 338, 
    image: img4, 
    label: "NEW",
    category: "техника", 
    brand: "Logitech",
    functionality: "игровые аксессуары"
  },
  { 
    id: 5, 
    name: "Mechanical Keyboard RGB", 
    price: 318, 
    image: img5, 
    label: "NEW",
    category: "техника", 
    brand: "Razer",
    functionality: "игровые аксессуары"
  },
  { 
    id: 6, 
    name: "4K Action Camera", 
    price: 366, 
    image: img6, 
    label: "NEW",
    category: "техника", 
    brand: "GoPro",
    functionality: "фото/видео"
  },
  { 
    id: 7, 
    name: "Portable Speaker", 
    price: 350, 
    image: img7, 
    label: "NEW",
    category: "техника", 
    brand: "JBL",
    functionality: "аудио"
  },
  { 
    id: 8, 
    name: "Tablet Air 2024", 
    price: 368, 
    image: img8, 
    label: "NEW",
    category: "техника", 
    brand: "Apple",
    functionality: "компьютеры"
  },
  { 
    id: 9, 
    name: "Noise Cancelling Earbuds", 
    price: 337, 
    image: img9, 
    label: "NEW",
    category: "техника", 
    brand: "Sony",
    functionality: "аудио"
  },
  { 
    id: 10, 
    name: "Gaming Monitor 27 inch", 
    price: 388, 
    image: img10, 
    label: "NEW",
    category: "техника", 
    brand: "Samsung",
    functionality: "игровые аксессуары"
  },
  { 
    id: 11, 
    name: "Smartphone X Pro", 
    price: 365, 
    image: img11, 
    label: "NEW",
    category: "техника", 
    brand: "Apple",
    functionality: "умные устройства"
  },
  { 
    id: 12, 
    name: "Fitness Tracker Band", 
    price: 320, 
    image: img12, 
    label: "NEW",
    category: "техника", 
    brand: "Xiaomi",
    functionality: "умные устройства"
  }
];

// Дополнительные товары
export const additionalProducts = [
  { 
    id: 13, 
    name: "Робот-пылесос", 
    price: 250, 
    image: img2, 
    label: "TOP",
    category: "дом/уборка", 
    brand: "Xiaomi",
    functionality: "уборка"
  },
  { 
    id: 14, 
    name: "Умный термос", 
    price: 180, 
    image: img3, 
    label: "NEW",
    category: "увлечение", 
    brand: "Stanley",
    functionality: "туризм"
  },
  { 
    id: 15, 
    name: "Беспроводной пылесос", 
    price: 320, 
    image: img4, 
    label: "HOT",
    category: "дом/уборка", 
    brand: "Dyson",
    functionality: "уборка"
  },
  { 
    id: 16, 
    name: "Электрическая зубная щетка", 
    price: 150, 
    image: img5, 
    label: "NEW",
    category: "дом/уборка", 
    brand: "Oral-B",
    functionality: "гигиена"
  },
  { 
    id: 17, 
    name: "Велосипед горный", 
    price: 450, 
    image: img6, 
    label: "BEST",
    category: "увлечение", 
    brand: "Trek",
    functionality: "спорт"
  },
  { 
    id: 18, 
    name: "Набор для йоги", 
    price: 120, 
    image: img7, 
    label: "NEW",
    category: "увлечение", 
    brand: "Nike",
    functionality: "спорт"
  },
  { 
    id: 19, 
    name: "Умная лампа", 
    price: 90, 
    image: img8, 
    label: "HOT",
    category: "дом/уборка", 
    brand: "Xiaomi",
    functionality: "освещение"
  },
  { 
    id: 20, 
    name: "Мольберт художника", 
    price: 280, 
    image: img9, 
    label: "TOP",
    category: "увлечение", 
    brand: "Brustro",
    functionality: "творчество"
  },
  { 
    id: 21, 
    name: "Кофеварка автоматическая", 
    price: 380, 
    image: img10, 
    label: "NEW",
    category: "дом/уборка", 
    brand: "Delonghi",
    functionality: "кухня"
  },
  { 
    id: 22, 
    name: "Дрон с камерой", 
    price: 520, 
    image: img11, 
    label: "HOT",
    category: "увлечение", 
    brand: "DJI",
    functionality: "фото/видео"
  },
  { 
    id: 23, 
    name: "Умная мультиварка", 
    price: 290, 
    image: img12, 
    label: "NEW",
    category: "дом/уборка", 
    brand: "Redmond",
    functionality: "кухня"
  },
  { 
    id: 24, 
    name: "Скейтборд электрический", 
    price: 410,
    image: img2, 
    label: "TOP",
    category: "увлечение", 
    brand: "Xiaomi",
    functionality: "транспорт"
  }
];

// Объединенный массив всех товаров
export const allProducts = [...products, ...additionalProducts];

// Массив уникальных категорий для фильтрации
export const categories = ["все", "техника", "увлечение", "дом/уборка"];

// Массив уникальных брендов для фильтрации
export const brands = [
  "все", 
  "Apple", 
  "Sony", 
  "Logitech", 
  "Razer", 
  "GoPro", 
  "JBL", 
  "Samsung", 
  "Xiaomi",
  "Dyson",
  "Oral-B",
  "Trek",
  "Nike",
  "Brustro",
  "Delonghi",
  "DJI",
  "Redmond",
  "Stanley"
];

// Массив функциональностей для фильтрации
export const functionalities = [
  "все",
  "аудио",
  "умные устройства", 
  "компьютеры",
  "игровые аксессуары",
  "фото/видео",
  "уборка",
  "гигиена",
  "спорт",
  "освещение",
  "творчество",
  "кухня",
  "транспорт",
  "туризм"
];

// Если нужен единый экспорт для удобства
export default {
  products,
  additionalProducts,
  allProducts,
  categories,
  brands,
  functionalities
};