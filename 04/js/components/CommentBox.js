import React, { Component } from 'react';
import { Container } from 'flux/utils';
import CommentStore from '../stores/CommentStore';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

class CommentBox extends Component {
  static getStores() {
    return [CommentStore];
  }

  static calculateState(prevState) {
    return {
      comment: CommentStore.getState().comment,
    };
  }



  testfunc = store => next => action => {
    console.log('dispatch:', action);
    next(action);
    console.log('finish:', action);
    return 'action_' + action;
  }

  next(){
    console.log('next...');
  }

  componentDidMount() {
    const logger = store => next => action => {
      console.log('store:', store); console.log('dispatch:', action); next(action); console.log('finish:', action);
    };
    console.log('componentDidMount: ', logger('store111')(this.next)('777'));
    console.log('componentDidMount: ', this.testfunc()(this.next)('777'));
  }

  render() {
    return (
      <div>
        <div>777777777777999</div>
        <CommentList comment={this.state.comment} />
        <CommentForm />
      </div>
    );
  }
}

export default Container.create(CommentBox);
