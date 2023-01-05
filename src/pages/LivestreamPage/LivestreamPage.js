import styles from './LivestreamPage.module.scss';

export default function LivestreamPage(props) {
    return (
        <div className={styles.videocontainer}>
            <iframe className={styles.video} src="https://www.youtube.com/embed/cgOmCTx6LZ0" title="Brooklyn and Dakota's OFFICIAL WEDDING VIDEO" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
    )
}

