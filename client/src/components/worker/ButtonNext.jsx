function ButtonNext(url) {
    return (
        <div className="d-flex justify-content-center mb-4 buttonNext">
            <div className="text-center cardNext btn px-4 py-1 buttonNext">
                <a type="button" className="buttonNext" id="buttonNext" href={url}>
                    Siguiente
                </a>
            </div>
        </div>
    );
}

export default ButtonNext;
