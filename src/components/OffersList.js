import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
import OfferItem from "./OfferItem";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class OffersList extends Component {
  state = {
    addFormVisible: false,
    addFormValue: ""
  };

  handleInputChange = event => {
    this.setState({ addFormValue: event.target.value });
  };

  handleFormSubmit = event => {
    const { addFormValue } = this.state;
    const { addOffers } = this.props;
    event.preventDefault();
    addOffers({ title: addFormValue });
    this.setState({ addFormValue: "" });
  };

  renderAddForm = () => {
    const { addFormVisible, addFormValue } = this.state;
    if (addFormVisible) {
      return (
        <div id="todo-add-form" className="col s10 offset-s1">
          <form onSubmit={this.handleFormSubmit}>
            <div className="input-field">
              <i className="material-icons prefix">note_add</i>
              <input
                value={addFormValue}
                onChange={this.handleInputChange}
                id="toDoNext"
                type="text"
              />
              <label htmlFor="toDoNext">What To Do Next</label>
            </div>
          </form>
        </div>
      );
    }
  };

  // Renders the Offers list
  renderOfferss() {
    const { data } = this.props;

    const Offers = _.map(data, (value, key) => {
      return <OfferItem key={key} offerId={key} offer={value} />;
    });

    if (!_.isEmpty(Offers)) {
      return Offers;
    }

    return (
      <div className="col s10 offset-s1 center-align">
        <img
          alt="Nothing was found"
          id="nothing-was-found"
          src="/img/nothing.png"
        />
        <h4>You have completed all the tasks</h4>
        <p>Start by clicking add button in the bottom of the screen</p>
      </div>
    );
  }

  componentWillMount() {
    this.props.fetchOffers();
  }

  render() {
    const { addFormVisible } = this.state;

    const styles = {
      button: {
        display: 'block',
        margin: 'auto'
      },
    }


    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          {this.renderAddForm()}
          {this.renderOfferss()}
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => this.setState({ addFormVisible: !addFormVisible })}
            className="btn-floating btn-large teal darken-4"
            style = {styles.button}
          >
            {addFormVisible ? (
              <span>close</span>
            ) : (
              <span>add</span>
            )}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  };
};

export default connect(mapStateToProps, actions)(OffersList);
