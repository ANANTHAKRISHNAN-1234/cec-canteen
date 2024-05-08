import React from "react";

export default function Footer() {
  return (
    <div className="container my-5">
      <footer className="text-white text-center text-lg-start bg-dark">
        <div className="container p-4">
          <div className="row mt-4">
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About CEC FOODFOLIO</h5>

              <p>
                Excellence in quality and service is the hallmark of all
                operations performed at this college canteen.
              </p>

              <p>For more sweet and savory experience visit CEC FOODFOLIO.</p>

              <div className="mt-4">
                <a type="button" className="btn btn-floating btn-light btn-lg">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a type="button" className="btn btn-floating btn-light btn-lg">
                  <i className="fab fa-dribbble"></i>
                </a>
                <a type="button" className="btn btn-floating btn-light btn-lg">
                  <i className="fab fa-twitter"></i>
                </a>
                <a type="button" className="btn btn-floating btn-light btn-lg">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 pb-1">Search something</h5>

              <div className="form-outline form-white mb-4">
                <input
                  type="text"
                  id="formControlLg"
                  className="form-control form-control-lg"
                />
                <label className="form-label" for="formControlLg">
                  Search
                </label>
              </div>

              <ul className="fa-ul" style="margin-left: 1.65em;">
                <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-home"></i>
                  </span>
                  <span className="ms-2">
                    College Of Engineering,Chengannur,Alappuzha
                  </span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <span className="ms-2">cecfoodfolio@gmail.com</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li">
                    <i className="fas fa-phone"></i>
                  </span>
                  <span className="ms-2">+ 48 234 567 88</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Opening hours</h5>

              <table className="table text-center text-white">
                <tbody className="fw-normal">
                  <tr>
                    <td>Mon - Thu:</td>
                    <td>8am - 6pm</td>
                  </tr>
                  <tr>
                    <td>Fri - Sat:</td>
                    <td>8am - 5pm</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>Holiday</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="text-center p-3"
          style="background-color: rgba(0, 0, 0, 0.2);"
        >
          © 2024 Copyright All rights reserved:
          <a className="text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
      </footer>
    </div>
  );
}
