import { Link } from "react-router-dom";

const Public = () => {
    const content =  (
        <div className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Dan D. Repairs!</span></h1>
            </header>
            <main className="public_main">
                <p>Located in Beautiful Downtown Foo City, Dan D. Repairs provides a trained staff ready to meet your tech repair needs</p>
                <address className="public_addr">
                    Dan D. Repairs<br/>
                    555 Foo Drive<br/>
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </div>
    )

  return content
}

export default Public