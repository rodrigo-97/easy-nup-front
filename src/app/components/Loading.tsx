import { Spinner } from "reactstrap";

export function Loading() {
    return (
        <div className="m-5 d-flex justify-content-center">
            <Spinner
                className="m-auto"
                color="primary"
            >
                Carregando...
            </Spinner>
        </div>
    )
}