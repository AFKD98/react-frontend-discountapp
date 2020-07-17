import React, { Component } from "react";
import HomePhoto from "../assets/homephoto2.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/homeView.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";

class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Advertisments: [],
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  render() {
    return (
      <Container maxWidth="xl">
        {this.props.isAuthenticated ? (
          <React.Fragment>
            <div
              style={{
                backgroundImage: "url(" + HomePhoto + ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                marginBottom: "0px",
              }}
              className="jumbotron jumbotron-fluid"
            >
              <div className="container">
                <Row className="row-md-12 mt-5 justify-content-md-end">
                  <Col className="col-md-8">
                    <h1 className="display-4">Photography made simple</h1>
                    <Row>
                      <Col className="col-8">
                        <p className="lead">
                          Need a talented individual to cover an occasion?
                          Browse through our list of curated photographers or
                          let us find one for you
                        </p>

                        <a
                          className="btn btn-outline-light buts mr-3 mb-2 d-md-inline"
                          href="/CategoryPage"
                        >
                          Browse categories
                        </a>
                        <a
                          className=" btn btn-outline-light buts d-md-inline"
                          href="/recommendation/none"
                        >
                          Book Now
                        </a>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
              }
            </div>
          </React.Fragment>
        ) : (
          <Redirect to="/" />
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {};

export default connect(mapStateToProps)(HomeView);
