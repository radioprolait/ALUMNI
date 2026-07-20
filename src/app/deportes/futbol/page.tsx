import styles from "../page.module.css";
import InstagramFeed from "@/components/InstagramFeed";
import HeroSlider from "@/components/HeroSlider";

export default function FutbolPage() {
  const sliderImages = [
    '/images/futbol-gallery/1.png',
    '/images/futbol-gallery/2.png',
    '/images/futbol-gallery/3.png'
  ];

  return (
    <div className={styles.page}>
      <HeroSlider 
        images={sliderImages} 
        title="Fútbol" 
        subtitle="Nuestra pasión más grande. Segunda División y todo el semillero de Inferiores." 
      />

      <div className={styles.content}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Segunda División</h3>
            <p>
              El orgullo de Alumni Orense. Competimos domingo a domingo dejando todo en la cancha, con el apoyo incondicional de nuestra gente.
            </p>
          </div>
          <div className={styles.infoCard}>
            <h3>Divisiones Inferiores</h3>
            <p>
              Nuestro semillero es el futuro del club. Formamos a los más chicos con valores de respeto, trabajo en equipo y amor por la camiseta.
            </p>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Novedades del Fútbol</h2>
        <InstagramFeed accounts={["alumniorenseoficial", "inferioresalumni"]} />
      </div>
    </div>
  );
}
