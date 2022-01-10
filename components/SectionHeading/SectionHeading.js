import styles from './SectionHeading.module.css';

const SectionHeading = ({ title, description }) => {
  return (
    <div className={styles.heading}>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.line}></span>
      {description && <p>{description}</p>}
    </div>
  )
};

export default SectionHeading;