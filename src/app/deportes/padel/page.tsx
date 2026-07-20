import styles from "../page.module.css";
import InstagramFeed from "@/components/InstagramFeed";
import HeroSlider from "@/components/HeroSlider";

export default function PadelPage() {
  const sliderImages = [
    '/images/padel-gallery/1.png',
    '/images/padel-gallery/2.png',
    '/images/padel-gallery/3.png'
  ];

  return (
    <div className={styles.page}>
      <HeroSlider 
        images={sliderImages} 
        title="Pádel" 
        subtitle="Un deporte en constante crecimiento. Clases, torneos y canchas de primer nivel." 
      />

      <div className={styles.content}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Instalaciones</h3>
            <p>
              Contamos con canchas de blindex y césped sintético. Un entorno ideal para jugar con amigos o competir en nuestros torneos internos y zonales.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Clases y Turnos</h3>
            <p>
              Ofrecemos escuela de pádel para niños y adultos. Además, los socios tienen beneficios exclusivos al momento de reservar turnos.
            </p>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Novedades del Pádel</h2>
        <InstagramFeed accounts={["alumniorense_padel"]} />
      </div>
    </div>
  );
}
