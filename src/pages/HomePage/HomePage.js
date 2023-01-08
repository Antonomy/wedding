import styles from './HomePage.module.scss'
import homepageCover from './images/homepageCover.jpg'

export default function HomePage (props) {
  return (
    <>
      <img className={styles.homepagecover} src={homepageCover} />
    </>
  )
}
