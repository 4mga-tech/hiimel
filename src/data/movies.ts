export interface Review {
  id: number;
  userId: number;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  genre: string[];
  year: number;
  duration: string;
  description: string;
  director: string;
  cast: string[];
  reviews: Review[];
  imdbId?: string,
  poster?: string;
  // IMDB ID for watch link
}

export const movies: Movie[] = [
  {
    id: 1,
    title: 'Хар шөнийн дайралт',
    image: 'https://images.unsplash.com/photo-1761948245185-fc300ad20316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjMyMjQwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.5,
    genre: ['Адал явдал', 'Аймшиг'],
    year: 2024,
    duration: '2ц 15м',
    description: 'Хар шөнийн дайралт нь хүчирхэг баатрын тухай гайхалтай адал явдалт кино юм. Тэрээр өөрийн хотыг хамгаалахын тулд харанхуйтай тэмцэх ёстой.',
    director: 'Бат-Эрдэнэ',
    cast: ['Болд', 'Сараа', 'Дорж'],
    imdbId: 'tt0468569', // The Dark Knight
    reviews: [
      {
        id: 1,
        userId: 1,
        userName: 'Баярсайхан',
        rating: 9,
        comment: 'Гайхалтай кино! Үйл явдал маш хурдан өрнөдөг. Дүр бүтээлүүд нь сонирхолтой, харин зургийн авалт нь гайхалтай байсан.',
        date: '2024-11-10',
        helpful: 45
      },
      {
        id: 2,
        userId: 2,
        userName: 'Туяа',
        rating: 8,
        comment: 'Сайн кино боловч эцэс нь бага зэрэг хурдан байсан. Гэхдээ үзэх нь үнэхээр таатай байлаа.',
        date: '2024-11-12',
        helpful: 23
      },
      {
        id: 3,
        userId: 3,
        userName: 'Ганбат',
        rating: 10,
        comment: 'Би энэ киног маш их таалагдлаа. Найзууддаа санал болгосон. Дахин үзэх болно!',
        date: '2024-11-13',
        helpful: 67
      }
    ]
  },
  {
    id: 2,
    title: 'Мөнхийн аялал',
    image: 'https://images.unsplash.com/photo-1606603696914-a0f46d934b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBmaWxtJTIwcG9zdGVyfGVufDF8fHx8MTc2MzIwOTk4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.9,
    genre: ['Драм', 'Уран зөгнөлт'],
    year: 2023,
    duration: '2ц 45м',
    description: 'Мөнхийн аялал н цаг хугацаа болон сансрын тухай гүн гүнзгий түүх юм. Энэ бол хайр, алдагдал, хүмүүсийн холбооны тухай кино.',
    director: 'Оюунчимэг',
    cast: ['Мөнхбат', 'Алтанцэцэг', 'Эрдэнэ'],
    imdbId: 'tt0816692', // Interstellar
    reviews: [
      {
        id: 4,
        userId: 4,
        userName: 'Нарантуяа',
        rating: 9,
        comment: 'Гүнзгий утга учиртай кино. Үзсэний дараа удаан бодогдов.',
        date: '2024-11-08',
        helpful: 89
      },
      {
        id: 5,
        userId: 5,
        userName: 'Батбаяр',
        rating: 9,
        comment: 'Гайхалтай зураг авалт, сайхан хөгжим, гайхалтай жүжигчид.',
        date: '2024-11-11',
        helpful: 56
      }
    ]
  },
  {
    id: 3,
    title: 'Айдас төгсгөл',
    image: 'https://images.unsplash.com/photo-1762356121454-877acbd554bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc2MzE1MzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.7,
    genre: ['Аймшиг', 'Триллер'],
    year: 2024,
    duration: '1ц 58м',
    description: 'Айдас төгсгөл нь таны зүрхийг цохилох триллер юм. Нууцлаг үйл явдлууд өрнөдөг бөгөөд эцэс хүртэл таныг дэлгэцнээс зайлуулахгүй.',
    director: 'Цэрэнпил',
    cast: ['Одгэрэл', 'Пүрэв', 'Сэргэлэн'],
    imdbId: 'tt1375666', // Inception
    reviews: [
      {
        id: 6,
        userId: 6,
        userName: 'Ганцэцэг',
        rating: 8,
        comment: 'Сэтгэл хөдлөм кино. Зарим хэсэг нь үнэхээр айдас төрүүлсэн.',
        date: '2024-11-09',
        helpful: 34
      },
      {
        id: 7,
        userId: 7,
        userName: 'Болортуяа',
        rating: 9,
        comment: 'Триллер киноны сонирхогчдод санал болгож байна!',
        date: '2024-11-14',
        helpful: 41
      }
    ]
  },
  {
    id: 4,
    title: 'Сүүлчийн баатар',
    image: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHBvc3RlciUyMGVwaWN8ZW58MXx8fHwxNzYzMjI0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 9.1,
    genre: ['Адал явдал', 'Драм'],
    year: 2023,
    duration: '3ц 05м',
    description: 'Сүүлчийн баатар бол эпик масштабтай адал явдалт кино. Тэрээр дэлхийг аврахын тулд бүх зүйлийг эрсдэлд оруулна.',
    director: 'Даваа',
    cast: ['Энхбаяр', 'Номин', 'Цэцэг'],
    imdbId: 'tt0111161', // The Shawshank Redemption
    reviews: [
      {
        id: 8,
        userId: 8,
        userName: 'Хулан',
        rating: 10,
        comment: 'Онцгой кино! Би үүнийг 10 удаа үзэж болно.',
        date: '2024-11-07',
        helpful: 120
      },
      {
        id: 9,
        userId: 9,
        userName: 'Тэмүүлэн',
        rating: 9,
        comment: 'Гайхалтай түүх, гайхалтай жүжигчид. Үнэхээр мэдрэмжтэй кино.',
        date: '2024-11-10',
        helpful: 78
      }
    ]
  },
  {
    id: 5,
    title: 'Сансрын аялал',
    image: 'https://images.unsplash.com/photo-1578374173713-32f6ae6f3971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwZmljdGlvbiUyMG1vdmllfGVufDF8fHx8MTc2MzIyNDYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.3,
    genre: ['Уран зөгнөлт', 'Адал явдал'],
    year: 2024,
    duration: '2ц 30м',
    description: 'Сансрын аялал нь сансрын та��аар гайхалтай дүр зураг үзүүлдэг. Баг нь шинэ гаригуудыг нээхээр явна.',
    director: 'Ариунаа',
    cast: ['Амар', 'Билгүүн', 'Сэлэнгэ'],
    imdbId: 'tt0133093', // The Matrix
    reviews: [
      {
        id: 10,
        userId: 10,
        userName: 'Золжаргал',
        rating: 8,
        comment: 'Сансрын хэсэг нь үнэхээр гайхалтай байсан.',
        date: '2024-11-11',
        helpful: 52
      }
    ]
  },
  {
    id: 6,
    title: 'Хайрын түүх',
    image: 'https://images.unsplash.com/photo-1746980931930-d8e69847d633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc2MzIyNDYwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 7.9,
    genre: ['Романтик', 'Драм'],
    year: 2023,
    duration: '1ц 55м',
    description: 'Хайрын түүх нь хоёр хүний хоорондох гүн гүнзгий холбооны тухай романтик драм юм.',
    director: 'Сарнай',
    cast: ['Нарангэрэл', 'Батсүх', 'Энхтуяа'],
    reviews: [
      {
        id: 11,
        userId: 11,
        userName: 'Чимэг',
        rating: 8,
        comment: 'Романтик кино дуртай хүмүүст маш их таалагдах кино.',
        date: '2024-11-06',
        helpful: 29
      }
    ]
  },
  {
    id: 7,
    title: 'Инээдмийн өдөр',
    image: 'https://images.unsplash.com/photo-1587042285747-583b4d4d73b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBmaWxtJTIwcG9zdGVyfGVufDF8fHx8MTc2MzIyNDYwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.1,
    genre: ['Инээдмийн'],
    year: 2024,
    duration: '1ц 40м',
    description: 'Инээдмийн өдөр нь таныг инээлгэх сайхан инээдмийн кино. Гэр бүлтэй хамт үзэхэд тохиромжтой.',
    director: 'Мөнхтулга',
    cast: ['Баяраа', 'Ууганбаяр', 'Хонгор'],
    reviews: [
      {
        id: 12,
        userId: 12,
        userName: 'Отгонбаяр',
        rating: 8,
        comment: 'Маш их инээлээ. Гэр бүлтэйгээ хамт үзэв.',
        date: '2024-11-12',
        helpful: 38
      }
    ]
  },
  {
    id: 8,
    title: 'Адал явдлын замнал',
    image: 'https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjMxNjEyMDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 8.6,
    genre: ['Адал явдал'],
    year: 2024,
    duration: '2ц 20м',
    description: 'Адал явдлын замнал нь баг хамт олон аялан тэнүүчлэх тухай кино. Тэд олон сорилтуудыг даван туулна.',
    director: 'Зоригт',
    cast: ['Баатар', 'Сэргэлэн', 'Мөнхзул'],
    reviews: [
      {
        id: 13,
        userId: 13,
        userName: 'Ганбаатар',
        rating: 9,
        comment: 'Адал явдлын кино сонирхогчдод зориулсан сайхан кино.',
        date: '2024-11-13',
        helpful: 44
      }
    ]
  }
];

export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

export const getMoviesByGenre = (genre: string): Movie[] => {
  if (genre === 'Бүгд') return movies;
  return movies.filter(movie => movie.genre.includes(genre));
};

export const getTopRatedMovies = (limit: number = 4): Movie[] => {
  return [...movies].sort((a, b) => b.rating - a.rating).slice(0, limit);
};