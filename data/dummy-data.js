import Banner from '../models/banner';
import Owner from '../models/owner';
import Product from '../models/product';
import Shortcut from '../models/shortcut';
const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Red Shirt',
    'https://cdn.pixabay.com/photo/2016/10/02/22/17/red-t-shirt-1710578_1280.jpg',
    10000,
    20,
    true,
    110,
    100,
    10,
    9,
    5,
    true,
    {
      condition:'baru',
      minOrder:1,
      group:'Baju Pria',
      detail:'A red t-shirt, perfect for days with non-red weather.',
    }
  ),
  new Product(
    'p2',
    'u1',
    'Blue Carpet',
    'https://images.pexels.com/photos/6292/blue-pattern-texture-macro.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    20000,
    10,
    true,
    150,
    110,
    200,
    20,
    2.5,
    true,
    {
      condition:'baru',
      minOrder:1,
      group:'Karpet',
      detail:'Fits your red shirt perfectly. To stand on. Not to wear it.',
    }
  ),
  new Product(
    'p3',
    'u2',
    'Coffee Mug',
    'https://images.pexels.com/photos/160834/coffee-cup-and-saucer-black-coffee-loose-coffee-beans-160834.jpeg?cs=srgb&dl=bean-beans-black-coffee-160834.jpg&fm=jpg',
    150000,
    20,
    false,
    1500,
    1000,
    29,
    34,
    4.5,
    false,
    {
      condition:'bekas',
      minOrder:1,
      group:'Gelas,Cangkir',
      detail:'Can also be used for tea!',
    }
  ),
  new Product(
    'p4',
    'u3',
    'The Book - Limited Edition',
    'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?cs=srgb&dl=blur-blurred-book-pages-46274.jpg&fm=jpg',
    15000,
    0,
    false,
    250,
    250,
    37,
    87,
    4,
    true,
    {
      condition:'baru',
      minOrder:1,
      group:'Ilmu Pengetahuan',
      detail:"What the content is? Why would that matter? It's a limited edition!",
    }
  ),
  new Product(
    'p5',
    'u3',
    'PowerBook',
    'https://get.pxhere.com/photo/laptop-computer-macbook-mac-screen-water-board-keyboard-technology-air-mouse-photo-airport-aircraft-tablet-aviation-office-black-monitor-keys-graphic-hardware-image-pc-exhibition-multimedia-calculator-vector-water-cooling-floppy-disk-phased-out-desktop-computer-netbook-personal-computer-computer-monitor-electronic-device-computer-hardware-display-device-448748.jpg',
    220000,
    50,
    true,
    20,
    10,
    98,
    12,
    1.5,
    false,
    {
      condition:'bekas',
      minOrder:1,
      group:'Ilmu Pengetahuan',
      detail:'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    }
  ),
  new Product(
    'p6',
    'u1',
    'Pen & Paper',
    'https://cdn.pixabay.com/photo/2015/10/03/02/14/pen-969298_1280.jpg',
    50000,
    5,
    false,
    1000,
    510,
    34,
    78,
    4.5,
    true,
    {
      condition:'baru',
      minOrder:1,
      group:'Buku Sekolah',
      detail:"Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    }
  )
];
const OWNERS = [
  new Owner(
    'BChqqMLfFEeEzcQrfAT4hvnzzCw2',
    'Lacoste',
    'https://cdn.imgbin.com/11/14/14/imgbin-logo-brand-crocodile-lacoste-clothing-crocodile-nJuEEYBfBKRVziR0AFrML8rrn.jpg',
    'Bandung Barat',
    8,
    ['cod','instans','nextday'],
    '2022-04-04 08:00:00',
    4.5
  ),
  new Owner(
    'u2',
    'Puma',
    'https://e7.pngegg.com/pngimages/230/164/png-clipart-puma-logo-brand-clothing-others-miscellaneous-text.png',
    'Jakarta Pusat',
    10,
    ['cod','instans','JNE','sicepat'],
    '2022-04-04 09:10:00',
    4.9
  ),
  new Owner(
    'u3',
    'New Balance',
    'https://www.freepnglogos.com/uploads/new-balance-png-logo/womens-stylish-shoes-new-balance-png-logo-1.png',
    'Kalimantan',
    1,
    ['cod','instans','JNE','Ninja','Sicepat'],
    '2022-04-01 12:12:00',
    2.3
  )
];
const SHORTCUTS = [
  new Shortcut(
    'official_store',
    'https://cdn-icons-png.flaticon.com/512/2039/2039006.png',
    'Official Store'
  ),
  new Shortcut(
    'all_products',
    'https://swanseacomputerrepairs.com/wp-content/uploads/2014/10/Misc-Box.png',
    'Semua Produk'
  ),
  new Shortcut(
    'daily_products',
    'https://cdn-icons-png.flaticon.com/512/3050/3050158.png',
    'Kebutuhan Harian'
  ),
  new Shortcut(
    'health_products',
    'https://www.nicepng.com/png/detail/259-2591928_medicare-supplement-icon-health-and-life.png',
    'Kesehatan'
  ),
  new Shortcut(
    'topup',
    'https://assets.materialup.com/uploads/b89ba62f-4690-4e68-9131-df62f9413659/preview.jpg',
    'Top-Up & Tagihan'
  ),
  new Shortcut(
    'sport',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM68kcp-IednVX4CB7XIiO5386fRYuXfx0VQ&usqp=CAUr',
    'Olahraga'
  ),
  new Shortcut(
    'travel',
    'https://www.logopik.com/wp-content/uploads/edd/2018/10/Travel-Icon-Vector-Download-Logo.png',
    'Travel & Entertaiment'
  ),
  new Shortcut(
    'fashion',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFyuhx4oQGnBe1CBcbNGtbPIwMt3aYI_dOGw&usqp=CAU',
    'Fashion'
  ),
];


const BANNERS = [
  new Banner(
    'banner_gopay',
    'https://lelogama.go-jek.com/cache/b8/0b/b80bb4651793f6e61b826393ca8b8989.jpg'
  ),
  new Banner(
    'banner_ramadhan',
    'https://www.jogjahost.co.id/images/slider/2018/mei/ramadhan/banner.jpg',
  ),
  new Banner(
    'banner_bca',
    'https://img.pilihkartu.com/Promo/promo-bca-jakmall.jpg'
  ),
];


const COINS = {
  money : 19200000,
  points : 15000
}
const HEADERS = {
  mail : '75',
  notif : '1000',
  cart : '15',
}
export {
  PRODUCTS,
  OWNERS,
  SHORTCUTS,
  BANNERS,
  COINS,
  HEADERS
};
