export const testCategorys = [
  {
    id: 1,
    name: 'Русская',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/5357aa74730163.5c3856082c76b.jpg',
  },
  {
    id: 2,
    name: 'Шашлык',
    image:
      'https://i9.photo.2gis.com/images/branch/46/6473924505665422_85e3.jpg',
  },
  {
    id: 3,
    name: 'Азиатская',
    image:
      'https://static.tildacdn.com/tild3362-3661-4563-b862-313066666563/1666016756161112647.jpg',
  },
  {
    id: 4,
    name: 'Итальянская',
    image:
      'https://avatars.mds.yandex.net/get-altay/3966989/2a0000017566c7350bf8dbf8d79fbf7f57c3/XXL_height',
  },
  {
    id: 5,
    name: 'Арабская',
    image:
      'https://avatars.mds.yandex.net/i?id=bdafdb3ce24e623f3b79f58530631870-4032783-images-thumbs&n=13',
  },
  {
    id: 6,
    name: 'Мексиканская',
    image: '',
  },
  {
    id: 7,
    name: 'Французская',
    image: '',
  },
  {
    id: 8,
    name: 'Индийская',
    image: '',
  },
  {
    id: 9,
    name: 'Греческая',
    image: '',
  },
  {
    id: 10,
    name: 'Китайская',
    image: '',
  },
  {
    id: 11,
    name: 'Испанская',
    image: '',
  },
  {
    id: 12,
    name: 'Вьетнамская',
    image: '',
  },
  {
    id: 13,
    name: 'Тайская',
    image: '',
  },
  {
    id: 14,
    name: 'Кавказская',
    image: '',
  },
  {
    id: 15,
    name: 'Португальская',
    image: '',
  },
];

export const testRestaurants = [
  {
    id: 1,
    name: 'Республика кошек',
    description:
      'Место, где можно не только выпить чашечку кофе или чая, но и пообщаться с кошками. Здесь живут около 20 кошек разных пород, включая мейн-кунов, ориенталов и сфинксов. Каждая кошка имеет свою историю и характер.',
    rating: 4.4,
    address: 'ул. Якубовича, 10, Санкт-Петербург',
    prices: 'выше среднего',
    cuisine_type: ['Греческая', 'Вьетнамская', 'Кавказская'],
    photo_links:
      'https://avatars.mds.yandex.net/get-altay/1879929/2a0000016df4fb660b7bc35625235bf6f8be/XXL_height',
  },
  {
    id: 2,
    name: 'Грузинский ресторан Чача Хинкали',
    description:
      'Грузинский ресторан «Чача Хинкали» — это место, где вы можете насладиться аутентичной грузинской кухней и почувствовать настоящее гостеприимство. В ресторане царит уютная и гостеприимная атмосфера, которая создаётся благодаря тёплому интерьеру и приветливому персоналу.',
    rating: 5.0,
    address: 'Комендантский просп., 44, корп. 2, Санкт-Петербург',
    prices: 'выше среднего',
    cuisine_type: ['Греческая', 'Вьетнамская'],
    photo_links:
      'https://avatars.mds.yandex.net/get-altay/11385005/2a00000191cd53f761c89e01d022f45579fc/XXL_height',
  },
  {
    id: 3,
    name: 'Сибирская кухня',
    cuisine_type: ['Греческая', 'Вьетнамская'],
    rating: 5.0,
    address: 'ул. Ленина, 22, Санкт-Петербург',
    photo_links:
      'https://avatars.mds.yandex.net/get-altay/12800836/2a00000190223ea64029cde23808814cb413/orig',
    prices: 'дорого',
    description:
      'Настоящие сибирские блюда с использованием свежих местных продуктов.',
  },
  {
    id: 4,
    name: 'Вкусное время',
    cuisine_type: ['Греческая', 'Вьетнамская'],
    rating: 4.8,
    address: 'ул. Баумана, 50, Санкт-Петербург',
    photo_links:
      'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    prices: 'средне',
    description: 'Изысканная русская кухня в современном исполнении.',
  },
  {
    id: 5,
    name: 'Домашняя еда',
    cuisine_type: ['Греческая', 'Вьетнамская'],
    rating: 4.8,
    address: 'ул. Вайнера, 15, Санкт-Петербург',
    photo_links:
      'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    prices: 'средне',
    description: 'Здесь готовят по домашним рецептам с душой.',
  },
  {
    id: 6,
    name: 'Пельменная',
    cuisine_type: ['Греческая', 'Вьетнамская'],
    rating: 4.3,
    address: 'ул. Большая Садовая, 30, Санкт-Петербург',
    photo_links:
      'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    prices: 'дешево',
    description: 'Здесь вы сможете попробовать пельмени ручной работы.',
  },
  /*{
    id: 7,
    name: 'Кухня бабушки',
    category: [testCategorys[1], testCategorys[2]],
    rating: 4.6,
    address: 'ул. Красноармейская, 10',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дорого',
    description: 'Теплые и уютные блюда из детства.',
  },
  {
    id: 8,
    name: 'К столу!',
    category: [testCategorys[1], testCategorys[2]],
    rating: 4.7,
    address: 'ул. 50 лет СССР, 12',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дешево',
    description: 'Классические рецепты в интерьере в стиле русской деревни.',
  },
  {
    id: 9,
    name: 'Русский двор',
    category: [testCategorys[1], testCategorys[2]],
    rating: 4.9,
    address: 'ул. Плехановская, 5',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дорого',
    description: 'Уникальные блюда и стилизованная атмосфера.',
  },
  {
    id: 10,
    name: 'Золотой самовар',
    category: [testCategorys[2], testCategorys[4]],
    rating: 4.4,
    address: 'ул. Пушкина, 28',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дорого',
    description: 'Блюда домашней кухни и старинные рецепты.',
  },
  {
    id: 11,
    name: 'Terrassa',
    category: [testCategorys[2], testCategorys[4]],
    rating: 4.7,
    address: ' Санкт-Петербург, Казанская улица, 3',
    image:
      'https://avatars.mds.yandex.net/i?id=4e33329a2eada4a2d764261007d1be18_l-6298174-images-thumbs&n=13',
    price: 'дорого',
    description: 'Блюда домашней кухни и старинные рецепты.',
  },
  {
    id: 12,
    name: 'Terrassa',
    category: [testCategorys[2], testCategorys[4]],
    rating: 5,
    address: ' Санкт-Петербург, Казанская улица, 3',
    image:
      'https://avatars.mds.yandex.net/i?id=4e33329a2eada4a2d764261007d1be18_l-6298174-images-thumbs&n=13',
    price: 'дорого',
    description: 'Блюда домашней кухни и старинные рецепты.',
  },
  {
    id: 13,
    name: 'Terrassa',
    category: [testCategorys[2], testCategorys[4]],
    rating: 5,
    address: ' Санкт-Петербург, Казанская улица, 3',
    image:
      'https://avatars.mds.yandex.net/i?id=4e33329a2eada4a2d764261007d1be18_l-6298174-images-thumbs&n=13',
    price: 'дорого',
    description: 'Блюда домашней кухни и старинные рецепты.',
  },
  {
    id: 14,
    name: 'Terrassa',
    category: [testCategorys[2], testCategorys[4]],
    rating: 5,
    address: ' Санкт-Петербург, Казанская улица, 3',
    image:
      'https://avatars.mds.yandex.net/i?id=4e33329a2eada4a2d764261007d1be18_l-6298174-images-thumbs&n=13',
    price: 'дорого',
    description: 'Блюда домашней кухни и старинные рецепты.',
  },*/
];

/*export const testUsers = [
  {
    email: 'user1@example.com',
    name: 'Alice Johnson',
    image: 'https://example.com/images/alice.jpg',
    password: '1234',
    liked: [],
    recommended: []
  },
  {
    email: 'user2@example.com',
    name: 'Bob Smith',
    image: 'https://example.com/images/bob.jpg',
    liked: [],
    recommended: []
  },
  {
    email: 'user3@example.com',
    name: 'Charlie Brown',
    image: 'https://example.com/images/charlie.jpg',
    liked: [],
    recommended: []
  },
  {
    email: 'user4@example.com',
    name: 'Diana Prince',
    image: 'https://example.com/images/diana.jpg',
    liked: [],
    recommended: []
  },
  {
    email: 'user5@example.com',
    name: 'Ethan Hunt',
    liked: [],
    recommended: []
  }
];
*/

export const testUsers = [
  {
    id: 1,
    name: 'Тестовый Пользователь 1',
    email: 'testuser1@example.com',
    image: '/public/images/user.png',
    liked: [
      testRestaurants[0],
      testRestaurants[2],
      testRestaurants[4],
      testRestaurants[5],
    ],
    recommended: [testRestaurants[1], testRestaurants[3], testRestaurants[5]],
  },
  {
    id: 2,
    name: 'Тестовый Пользователь 2',
    email: 'testuser2@example.com',
    image: 'url_to_image_2.jpg',
  },
  // добавьте больше пользователей по мере необходимости
];
