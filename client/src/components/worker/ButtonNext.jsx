function ButtonNext(url) {
    return (
        <div className="row d-flex justify-content-center mt-3">
            <div className="col-1 text-center cardNext">
                <a type="button" className="buttonNext mt-2 mb-2" id="buttonNext" href={url}>
                    Siguiente
                </a>
            </div>
        </div>

    );
}

export default ButtonNext;
