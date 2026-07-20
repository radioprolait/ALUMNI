import styles from "../page.module.css";
import InstagramFeed from "@/components/InstagramFeed";
import HeroSlider from "@/components/HeroSlider";

export default function BasquetPage() {
  const sliderImages = [
    '/images/basquet-gallery/1.png',
    '/images/basquet-gallery/2.png',
    '/images/basquet-gallery/3.png'
  ];

  return (
    <div className={styles.page}>
      <HeroSlider 
        images={sliderImages} 
        title="Básquet" 
        subtitle="Primera División e Inferiores. Pasión y dedicación en cada cuarto." 
      />

      <div className={styles.content}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Primera División</h3>
            <p>
              Nuestro equipo mayor compite en los torneos más exigentes de la región, llevando los colores del Club Alumni a lo más alto en cada estadio.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Inferiores</h3>
            <p>
              Formamos jugadores desde temprana edad. Transmitimos valores de compañerismo, esfuerzo y disciplina que los acompañarán dentro y fuera de la cancha.
            </p>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Novedades del Básquet</h2>
        <InstagramFeed accounts={["alumni_basquet"]} />
      </div>
    </div>
  );
}
