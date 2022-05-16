export default function Navbar() {

    return (
        <nav className="navbar bg-dark shadow">
            <div className="container px-3 d-flex flex-column justify-content-center align-items-center text-light">
                <h1 className="fw-bold">Send Crypto App</h1>
                <div className="d-flex align-items-center">
                    <p className="me-2 mb-0">Made by</p>
                    <img src="/images/logo.png" alt="" className="img-fluid" />
                </div>
                
            </div>
        </nav>
    )
}