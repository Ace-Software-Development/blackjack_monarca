function ButtonNext(url) {
    return (
        <div className="d-flex justify-content-center mb-4">
            <div className="col-2 text-center cardNext">
                <a type="button" className="buttonNext my-3" id="buttonNext" href={url}>
                    Siguiente
                </a>
            </div>
        </div>
    );
}

export default ButtonNext;
