import ContentLoader from 'react-content-loader';
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <ContentLoader
    className={styles.loader}
    viewBox="0 0 400 160"
    height={160}
    width={400}
    backgroundColor="#087ef4"
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
  )
}

export default Loader;