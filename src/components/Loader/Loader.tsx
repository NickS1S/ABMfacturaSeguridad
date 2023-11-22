import './Loader.css'
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
    return (
        <div className="loader">
            <Spinner animation="grow" />;
        </div>
    )
}

export default Loader;