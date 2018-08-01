import React from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { injectIntl, intlShape } from 'react-intl';
import Api from '../../services/Api';
import PrimaryButton from '../../style/ActionButton';
import FeedbackItem from './FeedbackItem';
import { fonts } from '../../style/resourceHelpers';

const styles = StyleSheet.create({
  title: {
    color: '#9b9b9b',
    marginEnd: 17,
    marginStart: 17,
    marginTop: 16,
    paddingBottom: 3,
    marginBottom: 3,
    fontSize: 16,
    fontFamily: fonts.bold.regular,
    borderBottomColor: '#D5D5D5',
    borderBottomWidth: 1,
  },
  checkBoxContainer: {
    marginTop: 10,
    paddingBottom: 10,
  },
  error: {
    marginEnd: 17,
    marginStart: 17,
    textAlign: 'center',
    color: '#dd0057',
    fontFamily: fonts.medium.regular,
    marginBottom: 8,
  },
  saveButton: {
    marginEnd: 70,
    marginStart: 70,
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#2c09a3',
    fontFamily: fonts.bold.regular,
  },
});

const POSITIVE = 'positive';
const NEUTRAL = 'neutral';
const BLOCK = 'block';

class Feedback extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pending: false,
      feedback: props.feedback || {},
      form: {
        grade: ((props.feedback || {}).grade) || NEUTRAL,
        body: (props.feedback && props.feedback.body) || '',
      },
      errors: null,
    };
  }

  onSubmit = () => {
    const {
      trade,
    } = this.props;
    const {
      feedback,
      form,
    } = this.state;
    if (!trade || !trade.id) return;
    const request = feedback.id
      ? Api.patch(`/feedbacks/${feedback.id}`, form)
      : Api.post('/feedbacks', { ...form, trade_id: trade.id });

    request
      .then(response => this.setState({ feedback: response.data.feedback, pending: false }))
      .catch(error => this.setState({ errors: error.response.data.errors, pending: false }));

    this.setState({ errors: null, pending: true });
  };

  onGradeChanged = (value) => {
    const {
      form,
    } = this.state;
    this.setState({ form: { ...form, grade: value } });
  };

  render() {
    const {
      intl,
    } = this.props;
    const {
      pending,
      errors,
      feedback,
      form,
    } = this.state;
    const sendButtonText = (
      feedback.id
        ? intl.formatMessage({ id: 'app.trade.feedback.button.update', defaultMessage: 'Update feedback' })
        : intl.formatMessage({ id: 'app.trade.feedback.button.save', defaultMessage: 'Save feedback' })
    ).toUpperCase();
    return (
      <React.Fragment>
        <Text style={styles.title}>
          {intl.formatMessage({ id: 'app.trade.feedback.title', defaultMessage: 'Leave a rating for the trader' }).toUpperCase()}
        </Text>
        <View style={styles.checkBoxContainer}>
          <FeedbackItem
            active={form.grade === POSITIVE}
            title={intl.formatMessage({ id: 'app.trade.feedback.checkbox.positive', defaultMessage: 'Positive' }).toUpperCase()}
            titleColor="#14d459"
            description={intl.formatMessage({ id: 'app.trade.feedback.checkbox.positiveText' })}
            disabled={pending}
            onPress={() => this.onGradeChanged(POSITIVE)}
          />
          <FeedbackItem
            active={form.grade === NEUTRAL}
            title={intl.formatMessage({ id: 'app.trade.feedback.checkbox.neutral', defaultMessage: 'Neutral' }).toUpperCase()}
            titleColor="#000000"
            description={intl.formatMessage({ id: 'app.trade.feedback.checkbox.positiveText' })}
            disabled={pending}
            onPress={() => this.onGradeChanged(NEUTRAL)}
          />
          <FeedbackItem
            active={form.grade === BLOCK}
            title={intl.formatMessage({ id: 'app.trade.feedback.checkbox.negative', defaultMessage: 'Negative' }).toUpperCase()}
            titleColor="#d61b38"
            description={intl.formatMessage({ id: 'app.trade.feedback.checkbox.positiveText' })}
            disabled={pending}
            onPress={() => this.onGradeChanged(BLOCK)}
          />
        </View>
        {
          errors && (
            <Text style={styles.error}>
              {'save feedback error'}
            </Text>
          )
        }
        <View>
          <PrimaryButton
            title={sendButtonText}
            secondary
            style={styles.saveButton}
            fontStyle={styles.saveButtonText}
            disabled={pending}
            onPress={this.onSubmit}
          >
            {pending ? <ActivityIndicator size="large" /> : null}
          </PrimaryButton>
        </View>
      </React.Fragment>
    );
  }
}

Feedback.propTypes = {
  intl: intlShape.isRequired,
  feedback: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  trade: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default injectIntl(Feedback);
