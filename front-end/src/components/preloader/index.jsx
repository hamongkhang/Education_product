import './style.css';
const Preloader = () => {
    return (
        <div className="preloader-layout fixed inset-0 z-50 bg-white">
            <div className="preloader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default Preloader;
