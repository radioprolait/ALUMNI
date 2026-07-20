import styles from "../page.module.css";
import InstagramFeed from "@/components/InstagramFeed";
import HeroSlider from "@/components/HeroSlider";

export default function PelotaPaletaPage() {
  const sliderImages = [
    '/images/paleta-gallery/1.png',
    '/images/paleta-gallery/2.png',
    '/images/paleta-gallery/3.png'
  ];

  return (
    <div className={styles.page}>
      <HeroSlider 
        images={sliderImages} 
        title="Pelota Paleta" 
        subtitle="Deporte, tradición y el trinquete más emblemático de la zona." 
      />

      <div className={styles.content}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>El Trinquete</h3>
            <p>
              El corazón histórico del club. Nuestro trinquete es un emblema de Orense, donde generaciones enteras han disfrutado de este hermoso deporte.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Competencias</h3>
            <p>
              Participamos en torneos provinciales y organizamos encuentros que reúnen a los mejores pelotaris de la región.
            </p>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Novedades de Pelota Paleta</h2>
        <InstagramFeed accounts={["paleta_alumni"]} />
      </div>
    </div>
  );
}
