export const org = {
  shortName: 'HMTI',
  fullName: 'Himpunan Mahasiswa Teknologi Informasi',
  bootcampName: 'Bootcamp Himpunan Teknologi Informasi 2026',
  tagline: 'Upgrade Skill, Siap Berkarir di Perusahaan Terkenal',
  description:
    'Program pelatihan intensif dari HMTI untuk mahasiswa yang ingin menguasai keterampilan praktis dan siap bersaing di dunia kerja.',
}

export const registrationDeadline = '2026-11-20T23:59:59+07:00'

export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Tentang', href: '#tentang' },
  { label: 'Program', href: '#program' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'FAQ', href: '#faq' },
]

export const about = {
  paragraphs: [
    'Bootcamp Himpunan Teknologi Informasi 2026 hadir untuk menjembatani teori di kelas dengan praktik nyata di dunia kerja. Diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi (HMTI), program ini membekali mahasiswa dengan keterampilan web development yang siap dipakai di industri.',
    'Dengan kurikulum berbasis proyek dan bimbingan mentor berpengalaman, peserta belajar sambil berkarya — membangun portofolio, mengasah kemampuan kolaborasi, dan memperluas jaringan profesional.',
  ],
  points: [
    'Kurikulum praktis berbasis proyek nyata',
    'Didampingi kakak tingkat, alumni, dan dosen',
    'Sertifikat resmi dari HMTI',
    'Komunitas suportif dan peluang networking',
  ],
}

export interface Division {
  icon: 'code' | 'server' | 'palette' | 'brain' | 'cpu'
  title: string
  description: string
  project: string
  skills: string[]
  stack: string[]
  quota: number
  filled: number
}

export const divisions: Division[] = [
  {
    icon: 'code',
    title: 'Frontend',
    description: 'Membangun antarmuka web yang interaktif, responsif, dan nyaman digunakan.',
    project: 'Landing page portofolio interaktif dengan React & Tailwind CSS.',
    skills: ['React', 'Vue', 'Next.js', 'Tailwind CSS', 'Git & GitHub'],
    stack: ['react', 'nextdotjs', 'tailwindcss', 'vite'],
    quota: 20,
    filled: 12,
  },
  {
    icon: 'server',
    title: 'Backend',
    description:
      'Mengelola server, database, dan API. Elysia dan Bun juga mulai muncul di kampus yang mengikuti tren.',
    project: 'REST API manajemen data bootcamp dengan Node.js & database.',
    skills: ['Node.js (Express)', 'Laravel (PHP)', 'Golang', 'Python (Django/FastAPI)', 'Git & GitHub'],
    stack: ['nodedotjs', 'laravel', 'go', 'python'],
    quota: 20,
    filled: 10,
  },
  {
    icon: 'palette',
    title: 'UI/UX Design',
    description: 'Merancang antarmuka dan pengalaman pengguna yang intuitif serta menarik.',
    project: 'Redesign aplikasi mobile HMTI dari riset hingga prototype interaktif di Figma.',
    skills: ['Figma', 'Wireframe', 'Prototyping', 'Design System'],
    stack: ['figma', 'framer'],
    quota: 15,
    filled: 7,
  },
  {
    icon: 'brain',
    title: 'Data & AI',
    description:
      'Analisis data dengan Python, machine learning dasar, hingga pemanfaatan AI untuk produktivitas coding.',
    project: 'Dashboard analisis data peserta bootcamp + chatbot AI sederhana.',
    skills: ['Data Science', 'Machine Learning', 'Prompt Engineering', 'SQL & Visualisasi'],
    stack: ['python', 'tensorflow', 'pandas'],
    quota: 20,
    filled: 14,
  },
  {
    icon: 'cpu',
    title: 'IoT',
    description:
      'Menghubungkan perangkat fisik ke internet menggunakan mikrokontroler, sensor, dan platform cloud.',
    project: 'Sistem monitoring suhu & kelembapan ruangan berbasis ESP32.',
    skills: ['Arduino', 'ESP32', 'Raspberry Pi', 'MQTT', 'Sensor & Aktuator'],
    stack: ['arduino', 'espressif', 'raspberrypi'],
    quota: 15,
    filled: 9,
  },
]

export interface TimelineItem {
  title: string
  date: string
  description: string
}

export const timeline: TimelineItem[] = [
  {
    title: 'Pendaftaran',
    date: '1 – 20 November 2026',
    description: 'Isi formulir pendaftaran dan pilih peminatan favoritmu.',
  },
  {
    title: 'Seleksi',
    date: '21 – 25 November 2026',
    description: 'Seleksi administrasi dan wawancara singkat bersama panitia.',
  },
  {
    title: 'Pengumuman',
    date: '26 November 2026',
    description: 'Pengumuman peserta yang lolos seleksi melalui media sosial HMTI.',
  },
  {
    title: 'Pelaksanaan',
    date: '1 Desember 2026 – 20 Januari 2027',
    description: 'Pembelajaran intensif, mentoring, dan pengerjaan proyek akhir.',
  },
  {
    title: 'Penutupan',
    date: '25 Januari 2027',
    description: 'Presentasi proyek akhir, apresiasi peserta terbaik, dan pembagian sertifikat.',
  },
]

export interface Mentor {
  name: string
  role: string
  expertise: string
}

export const mentors: Mentor[] = [
  {
    name: 'Ahmad Fauzi',
    role: 'Alumni Teknologi Informasi',
    expertise: 'Frontend Engineer',
  },
  {
    name: 'Siti Nurhaliza',
    role: 'Kakak Tingkat',
    expertise: 'UI/UX Designer',
  },
  {
    name: 'Budi Santoso',
    role: 'Dosen Teknologi Informasi',
    expertise: 'Pemrograman Web',
  },
  {
    name: 'Dewi Anggraini',
    role: 'Alumni Teknologi Informasi',
    expertise: 'Data Analyst',
  },
]

export interface FaqItem {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: 'Apakah bootcamp ini berbayar?',
    answer: 'Tidak. Bootcamp ini gratis untuk mahasiswa. Peserta terpilih hanya perlu berkomitmen mengikuti seluruh rangkaian kegiatan.',
  },
  {
    question: 'Siapa saja yang boleh mendaftar?',
    answer: 'Seluruh mahasiswa aktif di lingkungan kampus boleh mendaftar, baik anggota HMTI maupun bukan.',
  },
  {
    question: 'Apakah kegiatan dilakukan online atau offline?',
    answer: 'Kegiatan dilakukan secara hybrid. Sesi materi dilakukan online, sedangkan sesi praktik dan mentoring dilakukan offline di kampus.',
  },
  {
    question: 'Apakah saya harus bisa coding terlebih dahulu?',
    answer: 'Tidak. Program dirancang untuk pemula dan akan dimulai dari materi dasar.',
  },
  {
    question: 'Apakah ada sertifikat?',
    answer: 'Ya. Peserta yang menyelesaikan program akan mendapatkan sertifikat resmi dari HMTI.',
  },
]

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Materinya padat tapi mudah dipahami. Setelah bootcamp, saya langsung bisa membuat website portofolio sendiri.',
    name: 'Rizky Pratama',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Mentornya suportif dan proyek akhirnya benar-benar membuat saya lebih percaya diri saat melamar magang.',
    name: 'Aulia Rahma',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Bukan cuma belajar materi, tapi juga dapat teman dan jaringan baru. Pengalaman yang sangat berharga!',
    name: 'Fajar Nugroho',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Materi public speaking-nya langsung dipraktikkan. Sekarang saya jauh lebih percaya diri presentasi di depan kelas.',
    name: 'Nadia Safitri',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Dari nol sampai bisa deploy website sendiri. Kurikulumnya tersusun rapi dan mentornya sabar banget.',
    name: 'Yoga Saputra',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Belajar data science terasa menyenangkan karena banyak studi kasus nyata, bukan cuma teori.',
    name: 'Intan Permata',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Belajarnya terstruktur dari dasar, cocok buat yang baru mulai. Mentornya juga gampang diajak diskusi.',
    name: 'Deni Setiawan',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Dapat banyak insight soal desain yang user-friendly. Portofolio saya jadi lebih menarik setelah ikut bootcamp ini.',
    name: 'Muhammad Rizal Prasetyo',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Materinya aplikatif, langsung praktik olah data. Sangat membantu untuk tugas kuliah dan lomba.',
    name: 'Titp Fawwas',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Awalnya gugup, tapi setelah latihan terus di bootcamp jadi jauh lebih percaya diri.',
    name: 'Yeriko',
    role: 'Mahasiswa semester 5',
  },
  {
    quote:
      'Proyek akhirnya seru dan menantang. Hasilnya bisa langsung saya pakai di CV.',
    name: 'Ramadan Fatir',
    role: 'Mahasiswa semester 5',
  },
]

export const contact = {
  email: 'hmti.unipi@gmail.com',
  instagram: 'https://www.instagram.com/hmti_unipi?mdxt=dDlkemY1N2w2bnAw',
  instagramLabel: '@hmti_unipi',
  tiktok: 'https://www.tiktok.com/@hmti_unipi_?_r=1&_t=ZS-9AdOteft4A0',
  tiktokLabel: '@hmti_unipi_',
}

export interface Announcement {
  title: string
  date: string
  isoDate: string
  category: string
  content: string
  link?: {
    label: string
    to: string
  }
}

export const announcements: Announcement[] = [
  {
    title: 'Pendaftaran Resmi Dibuka',
    date: '1 November 2026',
    isoDate: '2026-11-01',
    category: 'Pendaftaran',
    content:
      'Pendaftaran Bootcamp Himpunan Teknologi Informasi 2026 resmi dibuka. Segera daftar dan pilih peminatan favoritmu sebelum kuota terpenuhi.',
    link: { label: 'Daftar Sekarang', to: '/daftar' },
  },
  {
    title: 'Seleksi Wawancara Dimulai',
    date: '21 November 2026',
    isoDate: '2026-11-21',
    category: 'Seleksi',
    content:
      'Bagi pendaftar yang lolos seleksi administrasi, jadwal wawancara akan dikirim melalui WhatsApp. Pastikan nomor yang didaftarkan aktif.',
  },
  {
    title: 'Pengumuman Peserta Lolos',
    date: '26 November 2026',
    isoDate: '2026-11-26',
    category: 'Pengumuman',
    content:
      'Pengumuman peserta yang lolos seleksi dapat dilihat di halaman Cek Status dengan memasukkan NIM, serta melalui media sosial resmi HMTI.',
    link: { label: 'Cek Status', to: '/cek-status' },
  },
  {
    title: 'Technical Meeting & Kick-off',
    date: '1 Desember 2026',
    isoDate: '2026-12-01',
    category: 'Kegiatan',
    content:
      'Technical meeting dan kick-off bootcamp akan dilaksanakan di kampus. Peserta wajib hadir untuk mendapat arahan awal dan pembagian kelompok.',
  },
]

export type RegistrationStatus = 'lolos' | 'tidak-lolos' | 'proses'

export interface RegistrationRecord {
  nim: string
  name: string
  peminatan: string
  status: RegistrationStatus
}

export const registrationRecords: RegistrationRecord[] = [
  { nim: '2024001', name: 'Rizky Pratama', peminatan: 'Frontend', status: 'lolos' },
  { nim: '2024002', name: 'Aulia Rahma', peminatan: 'UI/UX Design', status: 'lolos' },
  { nim: '2024003', name: 'Fajar Nugroho', peminatan: 'Data & AI', status: 'proses' },
  { nim: '2024004', name: 'Deni Setiawan', peminatan: 'Backend', status: 'tidak-lolos' },
]

export interface GalleryItem {
  title: string
  gradient: string
  image?: string
}

export const gallery: GalleryItem[] = [
  {
    title: 'Sesi Pembelajaran',
    gradient: 'from-navy-600 to-navy-900',
    image: 'https://picsum.photos/seed/hmti-class/800/450',
  },
  {
    title: 'Praktik & Mentoring',
    gradient: 'from-accent-500 to-navy-700',
    image: 'https://picsum.photos/seed/hmti-mentoring/800/450',
  },
  {
    title: 'Diskusi Kelompok',
    gradient: 'from-navy-800 to-navy-950',
    image: 'https://picsum.photos/seed/hmti-diskusi/800/450',
  },
  {
    title: 'Proyek Akhir',
    gradient: 'from-accent-400 to-navy-600',
    image: 'https://picsum.photos/seed/hmti-proyek/800/450',
  },
  {
    title: 'Penutupan & Sertifikat',
    gradient: 'from-navy-700 to-accent-600',
    image: 'https://picsum.photos/seed/hmti-penutupan/800/450',
  },
  {
    title: 'Networking Peserta',
    gradient: 'from-accent-600 to-navy-900',
    image: 'https://picsum.photos/seed/hmti-networking/800/450',
  },
]

export interface MerchandiseItem {
  title: string
  description: string
  gradient: string
  icon: 'keychain' | 'sticker'
}

export const merchandise: MerchandiseItem[] = [
  {
    title: 'Keychain HMTI',
    description: 'Gantungan kunci khas HMTI Bootcamp 2026 untuk menemani keseharianmu.',
    gradient: 'from-accent-500 to-navy-700',
    icon: 'keychain',
  },
  {
    title: 'Sticker Pack',
    description: 'Koleksi stiker eksklusif dengan desain ikonik HMTI Bootcamp 2026.',
    gradient: 'from-navy-700 to-accent-600',
    icon: 'sticker',
  },
]
