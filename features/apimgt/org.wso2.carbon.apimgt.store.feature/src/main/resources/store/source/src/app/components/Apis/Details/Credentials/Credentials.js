import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import InlineMessage from "../../../Shared/InlineMessage";
import Wizard from "./Wizard";
import { ApiContext } from "../ApiContext";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import SubscribeToApi from "../../../Shared/AppsAndKeys/SubscribeToApi";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from '@material-ui/core/Grid';
import CustomIcon from '../../../Shared/CustomIcon';
import Keys from "../../../Shared/AppsAndKeys/TokenManager"
import TokenManager from "../../../Shared/AppsAndKeys/TokenManager";
import classNames from 'classnames';
import Express from './Express';

const styles = theme => ({
  contentWrapper: {
    maxWidth: theme.custom.contentAreaWidth,
    paddingLeft: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3
  },
  titleSub: {
    cursor: "pointer"
  },
  button: {
    padding: theme.spacing.unit,
    color: theme.palette.getContrastText(theme.palette.background.default),
    display: "flex",
    alignItems: "center",
    fontSize: "11px",
    cursor: 'pointer',
    '& span': {
      paddingLeft: 6,
      display: 'inline-block',
    },
  },
  tableMain: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: theme.spacing.unit * 3
  },
  actionColumn: {
    display: "flex",
    textAlign: "right",
    direction: "rtl"
  },
  td: {
    color: theme.palette.getContrastText(theme.palette.background.default),
    borderBottom: "solid 1px " + theme.palette.grey["A200"],
    fontSize: "11px",
    paddingLeft: theme.spacing.unit
  },
  th: {
    color: theme.palette.getContrastText(theme.palette.background.default),
    borderBottom: "solid 1px " + theme.palette.grey["A200"],
    borderTop: "solid 1px " + theme.palette.grey["A200"],
    textAlign: "left",
    fontSize: "11px",
    paddingLeft: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  expansion: {
    background: "transparent",
    boxShadow: "none"
  },
  summary: {
    alignItems: "center"
  },
  subscribeButtons: {
    display: "flex",
    paddingTop: theme.spacing.unit*2,
  },
  buttonElm: {
    height: 28,
    marginLeft: 20
  },
  buttonElmText: {
    marginLeft: 20
  },
  appBar: {
    background: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
  subscribeTitle: {
    flex: 1,
  },
  plainContent: {
    paddingTop: 80,
    paddingLeft: theme.spacing.unit*2,
  },
  toolbar: {
    marginLeft: theme.spacing.unit*2,
  },
  subscribeRoot: {
    paddingLeft: theme.spacing.unit*2,
  },
  activeLink: {
    background: theme.palette.grey['A100'],
  },
  selectedWrapper: {
    background: theme.palette.grey['A100'],
    borderLeft: 'solid 2px ' + theme.palette.primary.main,
  }
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Credentials extends React.Component {
  state = {
    value: 0,
    expanded: true,
    wizardOn: false,
    openAvailable: false,
    openNew: false,
    openExpress: false,
    selectedAppId: false,
    selectedKeyType: false,
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  startStopWizard = () => {
    this.setState(state => ({ wizardOn: !state.wizardOn }));
  };
  handleSubscribe = () => {
    let promised_subscribe = this.subscribeToApi.createSubscription();
    if (promised_subscribe) {
      promised_subscribe
        .then(response => {
          console.log(
            "Subscription created successfully with ID : " +
              response.body.subscriptionId
          );
          this.setState({ open: false });
          alert("subscribed successfully");
        })
        .catch(error => {
          console.log("Error while creating the subscription.");
          console.error(error);
        });
    }
  };
  handleClickToggle = name => event =>  {
    this.setState({ [name]:  !this.state[name]});
  }
  // handleClickOpenNew = () => {
  //   this.setState({ openSubscribeToNew: true });
  // };

  // handleCloseNew = () => {
  //   this.setState({ openSubscribeToNew: false });
  // };

  // handleClickOpenAvailable = () => {
  //   debugger;
  //   this.setState({ openSubscribeToAvailable: true });
  // };

  // handleCloseAvailable = () => {
  //   this.setState({ openSubscribeToAvailable: false });
  // };
  loadInfo = (selectedKeyType, selectedAppId) => {
    this.setState({selectedKeyType, selectedAppId})
  }
  render() {
    const { classes, theme } = this.props;
    const { selectedKeyType, selectedAppId } = this.state;
    return (
      <ApiContext.Consumer>
        {({ api, applicationsAvailable, subscribedApplications }) => (
          <div className={classes.contentWrapper}>
            <Typography
              onClick={this.handleExpandClick}
              variant="display1"
              className={classes.titleSub}
            >
              API Credentials
            </Typography>
            <Typography variant="body1" gutterBottom>
              API Credentials are grouped in to applications. An application is
              primarily used to decouple the consumer from the APIs. It allows
              you to Generate and use a single key for multiple APIs and
              subscribe multiple times to a single API with different SLA
              levels.
            </Typography>
            {applicationsAvailable.length === 0 &&
            subscribedApplications.length === 0 ? (
              !this.state.wizardOn && (
                <InlineMessage
                  handleMenuSelect={this.startStopWizard}
                  type="info"
                >
                  <Typography variant="headline" component="h3">
                    Generate Credentials
                  </Typography>
                  <Typography component="p">
                    You need to generate credentials to access this API
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.startStopWizard}
                  >
                    GENERATE
                  </Button>
                </InlineMessage>
              )
            ) : (
              <React.Fragment>
                <div className={classes.subscribeButtons}>
                  <div>
                    <Typography variant="headline">Subscribed Applications</Typography>
                    <Typography variant="caption">
                      ( {subscribedApplications.length}{" "}
                      {subscribedApplications.length === 1
                        ? "subscription"
                        : "subscriptions"}{" "}
                      )
                    </Typography>
                  </div>
                  {applicationsAvailable.length > 0 && (
                    <div>
                      <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        className={classes.buttonElm}
                        onClick={this.handleClickToggle("openAvailable")}
                      >
                        Subscribe to Available App
                      </Button>
                      <Typography
                        variant="caption"
                        component="p"
                        className={classes.buttonElmText}
                      >
                        {applicationsAvailable.length} Available
                      </Typography>
                    </div>)
                    }
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    className={classes.buttonElm}
                    onClick={this.handleClickToggle("openNew")}
                  >
                    Subscribe to New App
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    className={classes.buttonElm}
                    onClick={this.handleClickToggle("openExpress")}
                  >
                    Express Mode
                  </Button>
                </div>
                {/* 
                ****************************
                Subscription List
                ***************************
                */}
                <table className={classes.tableMain}>
                  <tr>
                    <th className={classes.th}>Application Name</th>
                    <th className={classes.th}>Throttling Tier</th>
                    <th className={classes.th} />
                  </tr>
                  {subscribedApplications.map((app, index) => (
                    <React.Fragment>
                    <tr
                      style={{ backgroundColor: index % 2 ? "" : "#ffffff" }}
                    >
                      <td className={classes.td}>{app.label}</td>
                      <td className={classes.td}>{app.policy}</td>
                      <td className={classes.td}>
                        <div className={classes.actionColumn}>
                          <a className={classes.button}>
                            <span>MANAGE APP</span>
                            <CustomIcon width={16} height={16} strokeColor={theme.palette.primary.main}  icon="applications" />
                          </a>
                          <a className={classes.button}>
                            <span>UNSUBSCRIBE</span>
                            <CustomIcon width={16} height={16} strokeColor={theme.palette.primary.main} icon="subscriptions" />
                          </a>
                          <a 
                          className={classNames(classes.button, {
                            [classes.activeLink]: (selectedAppId && selectedKeyType === "PRODUCTION" && app.value === selectedAppId),
                            })}
                            onClick={() => this.loadInfo('PRODUCTION', app.value)}>
                            <span>PROD KEYS</span>
                            <CustomIcon width={16} height={16} strokeColor={theme.palette.primary.main}  icon="productionkeys" />
                          </a>
                          <a className={classNames(classes.button, {
                            [classes.activeLink]: (selectedAppId && selectedKeyType === "SANDBOX" && app.value === selectedAppId),
                            })}
                            onClick={() => this.loadInfo('SANDBOX', app.value)}>
                            <span>SANDBOX KEYS</span>
                            <CustomIcon width={16} height={16} strokeColor={theme.palette.primary.main}  icon="productionkeys" />
                          </a>
                        </div>
                      </td>
                    </tr>
                    {(app.value === selectedAppId && (selectedKeyType === "PRODUCTION" || selectedKeyType === "SANDBOX")) && 
                      <tr>
                        <td colSpan="3">
                            <div className={classes.selectedWrapper}>
                              <TokenManager keyType={selectedKeyType} selectedApp={{appId: app.value, label: app.label}} /> 
                            </div>
                        </td>
                      </tr>
                      }
                    </React.Fragment>
                  ))}
                </table>
                {/* 
                ****************************
                Subscribe to apps available 
                ***************************
                */}
                {applicationsAvailable.length > 0 && (
                  <Dialog
                    fullScreen
                    open={this.state.openAvailable}
                    onClose={this.handleClickToggle("openAvailable")}
                    TransitionComponent={Transition}
                  > <AppBar className={classes.appBar}>
                      <Grid container spacing={0}>
                        <Grid item xs={6}>
                          <Toolbar className={classes.toolbar}>
                            <IconButton color="inherit" onClick={this.handleClickToggle("openAvailable")} aria-label="Close">
                              <CloseIcon />
                            </IconButton>
                            <div className={classes.subscribeTitle}>
                              <Typography variant="h6">
                                Subscribe {api.name} to{" "}
                                {applicationsAvailable.length === 1
                                  ? "an available application"
                                  : "available applications"}
                                .
                              </Typography>
                              <Typography variant="caption">
                                ( {applicationsAvailable.length} Applications )
                              </Typography>
                            </div>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.handleSubscribe}
                              >
                                Subscribe
                            </Button>
                          </Toolbar>
                        </Grid>
                      </Grid>
                    </AppBar>
                    <div className={classes.plainContent}>
                      <SubscribeToApi
                        innerRef={node => (this.subscribeToApi = node)}
                        api={api}
                        applicationsAvailable={applicationsAvailable}
                        rootClass={classes.subscribeRoot}
                      />
                    </div>
                  </Dialog>
                )}
                {/* 
                ***************************************
                Subscribe with new Mode 
                ***************************************
                */}
                <Dialog
                    fullScreen
                    open={this.state.openNew}
                    onClose={this.handleClickToggle("openNew")}
                    TransitionComponent={Transition}
                  > <AppBar className={classes.appBar}>
                      <Grid container spacing={0}>
                        <Grid item xs={6}>
                          <Toolbar className={classes.toolbar}>
                            <IconButton color="inherit" onClick={this.handleClickToggle("openNew")} aria-label="Close">
                              <CloseIcon />
                            </IconButton>
                            <div className={classes.subscribeTitle}>
                              <Typography variant="h6">
                                Subscribe to new Application
                              </Typography>
                            </div>
                          </Toolbar>
                        </Grid>
                      </Grid>
                    </AppBar>
                    <div className={classes.plainContent}>
                      <Wizard />
                    </div>
                  </Dialog>

                  {/* 
                ***************************************
                Subscribe with express Mode 
                ***************************************
                */}
                <Dialog
                    fullScreen
                    open={this.state.openExpress}
                    onClose={this.handleClickToggle("openExpress")}
                    TransitionComponent={Transition}
                  > <AppBar className={classes.appBar}>
                      <Grid container spacing={0}>
                        <Grid item xs={6}>
                          <Toolbar className={classes.toolbar}>
                            <IconButton color="inherit" onClick={this.handleClickToggle("openExpress")} aria-label="Close">
                              <CloseIcon />
                            </IconButton>
                            <div className={classes.subscribeTitle}>
                              <Typography variant="h6">
                                Express Mode
                              </Typography>
                            </div>
                          </Toolbar>
                        </Grid>
                      </Grid>
                    </AppBar>
                    <div className={classes.plainContent}>
                      <Express />
                    </div>
                  </Dialog>
              </React.Fragment>
            )}
            {this.state.wizardOn && <Wizard />}
          </div>
        )}
      </ApiContext.Consumer>
    );
  }
}

Credentials.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Credentials);
