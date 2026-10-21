// Mendeteksi perangkat yang cukup kuat untuk menjalankan animasi GSAP:
// layar lebar (laptop/desktop), pointer presisi (mouse/trackpad), dan CPU memadai.
// Di HP/tablet lemah, animasi memakai CSS ringan supaya tetap cepat.
export const isPowerfulDevice =
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: fine)').matches &&
  window.matchMedia('(min-width: 1024px)').matches &&
  (navigator.hardwareConcurrency ?? 8) >= 4
