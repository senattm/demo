import { Product } from '../types/Product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Gece Mavisi Takım Elbise',
    category: 'suits',
    price: 12990.00,
    description: 'İtalyan yünü ile mükemmel işçilikle hazırlanmış modern slim fit takım elbise. Yönetici toplantıları ve resmi etkinlikler için ideal. Elle dikilmiş yakalı ve sedef düğmeli.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gece Mavisi', 'Antrasit'],
    material: '%100 İtalyan Yünü',
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'İpek Gece Elbisesi',
    category: 'dresses',
    price: 24990.00,
    description: 'Lüks ipek charmeuse kumaştan hazırlanmış büyüleyici yere kadar uzanan gece elbisesi. Zarif bir yaka ve çarpıcı açık sırt tasarımına sahiptir. Kırmızı halı hazır.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Zümrüt', 'Bordo', 'Siyah'],
    material: '%100 İpek Charmeuse',
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    name: 'Klasik Oxford Gömlek',
    category: 'shirts',
    price: 3290.00,
    description: 'İnce dokuya sahip zamansız Mısır pamuğu gömlek. Hem iş hem de şık günlük kullanım için idealdir. Fransız manşetli ve hakiki sedef düğmeleri vardır.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Beyaz', 'Açık Mavi', 'Pembe'],
    material: 'Mısır Pamuğu',
    inStock: true,
    featured: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '4',
    name: 'Kaşmir Karışımlı Palto',
    category: 'suits',
    price: 18990.00,
    description: 'Premium kaşmir karışımında sofistike palto. Çentik yakalı, çift sıra düğmeli ve zarafet yayan rafine terziliğe sahiptir.',
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Deve Tüyü', 'Lacivert', 'Siyah'],
    material: '%70 Yün, %30 Kaşmir',
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '5',
    name: 'Kadife Kokteyl Elbisesi',
    category: 'dresses',
    price: 8990.00,
    description: 'Göz alıcı kadifeden diz boyu kokteyl elbisesi. Vücut hatlarını saran üst gövde ve genişleyen etek tasarımına sahiptir. Akşam toplantıları ve özel etkinlikler için mükemmel.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Koyu Mor', 'Orman Yeşili', 'Lacivert'],
    material: 'İpek Kadife',
    inStock: true,
    featured: false,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    id: '6',
    name: 'Keten Yaz Gömleği',
    category: 'shirts',
    price: 2790.00,
    description: 'Rahat kesimli hafif keten gömlek. Sıcak havalarda sofistike bir tarz için mükemmel. Hakiki boynuz düğmeler ve kamp yakalı.',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beyaz', 'Kum', 'Gök Mavisi'],
    material: '%100 Avrupa Keteni',
    inStock: true,
    featured: false,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '7',
    name: 'İtalyan Deri Kemer',
    category: 'accessories',
    price: 1990.00,
    description: 'Toskana\'dan el yapımı deri kemer. Cilalı pirinç toka ve kenar boyama özelliği vardır. Her kıyafete mükemmel son dokunuş.',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583e2?w=800&q=80'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Siyah', 'Konyak', 'Koyu Kahverengi'],
    material: 'Tam Tahıl İtalyan Derisi',
    inStock: true,
    featured: false,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: '8',
    name: 'Merino Yün Balıkçı Yaka',
    category: 'shirts',
    price: 3990.00,
    description: 'Ultra ince merino yün balıkçı yaka. Yumuşak, nefes alabilen ve sıcaklık düzenleyici. Gardırobunuz için çok yönlü bir temel.',
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Siyah', 'Antrasit', 'Krem', 'Lacivert'],
    material: 'Ekstra İnce Merino Yünü',
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
];
