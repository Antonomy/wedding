import styles from './EventInfoPage.module.scss'
import homepageCover from '../HomePage/images/homepageCover.jpg'

export default function EventInfoPage (props) {
  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
      </style>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Qwigley&display=swap');
      </style>
      <img className={styles.eventinfocover} src={homepageCover} />
      <div className={styles.detailscontainer}>
        <text className={styles.message}>Come Celebrate our Wedding</text><br />
        <text className={styles.name1}>Kylie</text><br />
        <text className={styles.and}>-and-</text><br />
        <text className={styles.name2}>Mark</text><br />
        <text className={styles.date}>Date: 1/1/2023</text><br />
        <text className={styles.ceremony}>Ceremony: 4:00PM</text><br />
        <text className={styles.reception}>Reception: 6:00PM</text><br />
        <text className={styles.afterparty}>Afterparty: 10:00PM</text><br />
      </div>
    </>
  )
}
