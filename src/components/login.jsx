import React, { Component } from "react";
import { TextField, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logout } from "../actions/authActions";
import { clearErrors } from "../actions/errorActions";
import { Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import HomePhoto from "../assets/discount.jpg";
const useStyles = (theme) => ({
  // "@global": {
  //   body: {
  //     // backgroundImage: "url(" + HomePhoto + ")",
  //     backgroundRepeat: "no-repeat",
  //     backgroundPosition: "center center",
  //     backgroundSize: "cover",
  //     backgroundAttachment: "fixed",
  //     height: "100%",
  //     backgroundColor: "#066878",
  //   },
  // },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    // backgroundColor: "white",
    // backgroundSize: "cover",
    // height: "100%",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  rememberme: {
    width: "100%",
    marginTop: theme.spacing(1),
    color: "black",
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
    background: "linear-gradient(45deg, #1DA8DD 30%, #0779B9 90%)",
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(100, 200, 250, 1)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: null,
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };
  setOpen = (val) => {
    this.setState({ open: val });
  };
  handleClose = () => {
    {
      this.setOpen(false);
      this.props.logout();
    }
  };
  handleToggle = () => {
    {
      this.setOpen(!this.state.open);
    }
  };
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      //check for reg error
      if (error.id === "LOGIN_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    console.log(this.props.login(user));
  };

  render() {
    const { classes } = this.props;
    // const { errors, username, password, isLoading } = this.state;
    return (
      <Container component="main" maxWidth="xs" className={classes.paper}>
        {this.props.isAuthenticated && this.state.open ? (
          <Redirect to="/bookings" />
        ) : null}
        <Typography component="h1" variant="h4">
          Himaaus Advantage
        </Typography>
        <Typography component="h1" variant="h5" className="mt-3 ">
          Sign in
        </Typography>

        <form onSubmit={this.onSubmit} className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={this.onChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={this.onChange}
          />
          <FormControlLabel
            className={classes.rememberme}
            control={<Checkbox value="remember" color="#1DA8DD" />}
            label="Remember me"
          />
          {this.state.msg ? (
            <Alert severity="error">{this.state.msg}</Alert>
          ) : null}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            onClick={this.handleToggle}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Backdrop
            className={classes.backdrop}
            open={this.state.open}
            onClick={this.handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  // to use the state as props
  isAuthenticated: state.auth.isAuthenticated, // auth is coming from root reducer at /reducers/index.js
  error: state.error,
});

export default connect(mapStateToProps, { login, logout, clearErrors })(
  withStyles(useStyles)(LoginPage)
);
