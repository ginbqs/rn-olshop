import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Red Shirt',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    'A red t-shirt, perfect for days with non-red weather.',
    10000,
    20,
    1,
    'Kalimantan',
    110,
    100,
    5,
    1
  ),
  new Product(
    'p2',
    'u1',
    'Blue Carpet',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'Fits your red shirt perfectly. To stand on. Not to wear it.',
    20000,
    10,
    1,
    'Jawa Timur',
    150,
    110,
    2.5,
    1
  ),
  new Product(
    'p3',
    'u2',
    'Coffee Mug',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    'Can also be used for tea!',
    150000,
    20,
    0,
    'Jakarta Pusat',
    1500,
    1000,
    4.5,
    0
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Limited Edition',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    15000,
    0,
    1,
    'Kota Bandung',
    250,
    250,
    4,
    1
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    220000,
    50,
    1,
    'Jakart Timur',
    20,
    10,
    1.5,
    0
  ),
  new Product(
    'p6',
    'u1',
    'Pen & Paper',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    50000,
    5,
    0,
    'Bandung Barat',
    1000,
    510,
    4.5,
    1
  )
];
const dataIcon = [
  {image : 'https://findicons.com/files/icons/767/wp_woothemes_ultimate/128/sale.png',name:'ini mata'},
  {image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSMo6EF_sjXis24PAY9QzWRplQjoBxX9J8w&usqp=CAU',name:'ini icon copy'},
  {image : 'https://cdn3.vectorstock.com/i/1000x1000/20/97/discount-icon-vector-10472097.jpg',name:'ini bukan dajal'},
  {image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTvM5XzWSI-O2AD_s2MeoGLxai3jPANSMUlQ&usqp=CAU',name:'ini icon pindah'},
  {image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLoNrTtcvGnc43hmZ1ErRiiMUZYilJ7QhOLA&usqp=CAU',name:'ini icon kimia'}];
const dataImage = ['https://englishforsma.com/wp-content/uploads/2016/08/fischer-2739115_640.jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEpOB50Gf-839DMNoHRlYYBAWP0TN73RHsGg&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnu6obVk9X7KpF7ddIVK0Xukk7GK5uWC1GA&usqp=CAU'];
const dataFlashSale = [
  {
      image : 'https://englishforsma.com/wp-content/uploads/2016/08/fischer-2739115_640.jpg',
      name : 'Data',
      price : 10000,
      stok: 10,
      sale:10,
      rating:0.5,
      discount:10,
      address:'Bandung City, West Java · Near PT. Infokes Indonesia',
      laris:1
  },
  {
      image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEpOB50Gf-839DMNoHRlYYBAWP0TN73RHsGg&usqp=CAU',
      name : 'Baso tahu',
      price : 1000,
      stok: 100,
      discount:90,
      address:'Bandung City, West Java · Near PT. Infokes Indonesia',
      rating:3.5,
      sale:10,
      laris:2
  },
  {
      image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnu6obVk9X7KpF7ddIVK0Xukk7GK5uWC1GA&usqp=CAU',
      name : 'Seblak',
      price : 10000,
      discount:0,
      stok: 1000,
      address:'Bandung City, West Java · Near PT. Infokes Indonesia',
      sale:10,
      rating:5,
      laris:3
  }
]
const dataMyMoney = {
  money : 19200000,
  point : 15000
}
const dataNotif = {
  mail : '75',
  notif : '99+',
  cart : '15',
}
export {
  PRODUCTS,
  dataIcon,
  dataImage,
  dataFlashSale,
  dataMyMoney,
  dataNotif
};
