import './DashboardPage.module.scss';

export default function DashboardPage(props) {
    return (
        <>
            <div className="client-albums-container">
                <h1>Client Albums</h1>
                <hr />
            </div>
            <div class="photographer-albums-container">
                <h1>Photographer Albums</h1>
                <hr />
            </div>
        </>
    )
}