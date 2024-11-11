export const testCategorys = [
  {
    id: 1,
    name: 'Русская',
    image:
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/5357aa74730163.5c3856082c76b.jpg'
  },
  {
    id: 2,
    name: 'Шашлык',
    image:
      'https://i9.photo.2gis.com/images/branch/46/6473924505665422_85e3.jpg'
  },
  {
    id: 3,
    name: 'Азиатская',
    image:
      'https://static.tildacdn.com/tild3362-3661-4563-b862-313066666563/1666016756161112647.jpg'
  },
  {
    id: 4,
    name: 'Итальянская',
    image:
      'https://avatars.mds.yandex.net/get-altay/3966989/2a0000017566c7350bf8dbf8d79fbf7f57c3/XXL_height'
  },
  {
    id: 5,
    name: 'Арабская',
    image:
      'https://avatars.mds.yandex.net/i?id=bdafdb3ce24e623f3b79f58530631870-4032783-images-thumbs&n=13'
  },
  {
    id: 6,
    name: 'Мексиканская',
    image: ''
  },
  {
    id: 7,
    name: 'Французская',
    image: ''
  },
  {
    id: 8,
    name: 'Индийская',
    image: ''
  },
  {
    id: 9,
    name: 'Греческая',
    image: ''
  },
  {
    id: 10,
    name: 'Китайская',
    image: ''
  },
  {
    id: 11,
    name: 'Испанская',
    image: ''
  },
  {
    id: 12,
    name: 'Вьетнамская',
    image: ''
  },
  {
    id: 13,
    name: 'Тайская',
    image: ''
  },
  {
    id: 14,
    name: 'Кавказская',
    image: ''
  },
  {
    id: 15,
    name: 'Португальская',
    image: ''
  }
];

export const testRestaurants = [
  {
    id: 1,
    name: 'Русская столовая',
    category: [
      testCategorys[0],
      testCategorys[1],
      testCategorys[2],
      testCategorys[3]
    ],
    rating: 4.5,
    address: 'ул. Тверская, 15',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дешево',
    description:
      'Авторская русская кухня с использованием натуральных продуктов.'
  },
  {
    id: 2,
    name: 'Царская охота',
    category: [
      testCategorys[1],
      testCategorys[3],
      testCategorys[4],
      testCategorys[5],
      testCategorys[6]
    ],
    rating: 4.0,
    address: 'пр. Невский, 100',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дорого',
    description: 'Традиционные блюда русской кухни в уютной обстановке.'
  },
  {
    id: 3,
    name: 'Сибирская кухня',
    category: [
      testCategorys[1],
      testCategorys[2],
      testCategorys[7],
      testCategorys[8],
      ,
      testCategorys[9]
    ],
    rating: 5.0,
    address: 'ул. Ленина, 22',
    image:
      'https://avatars.mds.yandex.net/get-altay/12800836/2a00000190223ea64029cde23808814cb413/orig',
    price: 'дорого',
    description:
      'Настоящие сибирские блюда с использованием свежих местных продуктов.'
  },
  {
    id: 4,
    name: 'Вкусное время',
    category: [
      testCategorys[0],
      testCategorys[4],
      testCategorys[10],
      testCategorys[11],
      testCategorys[12]
    ],
    rating: 4.8,
    address: 'ул. Баумана, 50',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'средне',
    description: 'Изысканная русская кухня в современном исполнении.'
  },
  {
    id: 5,
    name: 'Домашняя еда',
    category: [
      testCategorys[1],
      testCategorys[2],
      testCategorys[13],
      testCategorys[14]
    ],
    rating: 4.8,
    address: 'ул. Вайнера, 15',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'средне',
    description: 'Здесь готовят по домашним рецептам с душой.'
  },
  {
    id: 6,
    name: 'Пельменная',
    category: [testCategorys[1], testCategorys[2]],
    rating: 4.3,
    address: 'ул. Большая Садовая, 30',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дешево',
    description: 'Здесь вы сможете попробовать пельмени ручной работы.'
  },
  {
    id: 7,
    name: 'Кухня бабушки',
    category: [testCategorys[1], testCategorys[2]],
    rating: 4.6,
    address: 'ул. Красноармейская, 10',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дорого',
    description: 'Теплые и уютные блюда из детства.'
  },
  {
    id: 8,
    name: 'К столу!',
    category: [testCategorys[1], testCategorys[2]],
    rating: 4.7,
    address: 'ул. 50 лет СССР, 12',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дешево',
    description: 'Классические рецепты в интерьере в стиле русской деревни.'
  },
  {
    id: 9,
    name: 'Русский двор',
    category: [testCategorys[1], testCategorys[2]],
    rating: 4.9,
    address: 'ул. Плехановская, 5',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дорого',
    description: 'Уникальные блюда и стилизованная атмосфера.'
  },
  {
    id: 10,
    name: 'Золотой самовар',
    category: [testCategorys[2], testCategorys[4]],
    rating: 4.4,
    address: 'ул. Пушкина, 28',
    image: 'https://college.spbstu.ru/userfiles/images/news/scale_1200.jpg',
    price: 'дорого',
    description: 'Блюда домашней кухни и старинные рецепты.'
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
    description: 'Блюда домашней кухни и старинные рецепты.'
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
    description: 'Блюда домашней кухни и старинные рецепты.'
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
    description: 'Блюда домашней кухни и старинные рецепты.'
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
    description: 'Блюда домашней кухни и старинные рецепты.'
  }
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
      testRestaurants[5]
    ],
    recommended: [testRestaurants[1], testRestaurants[3], testRestaurants[5]]
  },
  {
    id: 2,
    name: 'Тестовый Пользователь 2',
    email: 'testuser2@example.com',
    image: 'url_to_image_2.jpg'
  }
  // добавьте больше пользователей по мере необходимости
];
