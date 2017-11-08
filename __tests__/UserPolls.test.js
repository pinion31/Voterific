import React from 'react';
import {shallow} from 'enzyme';
import {UserPolls} from '../src/components/UserPolls';
import PollContainer from '../src/components/PollContainer';
import {NO_POLLS} from '../src/constants/messages';

const initialProps = {
  polls:
    [
      { question: 'Is this test working?',
        id: 1,
        owner: 'chris',
        choices: [
          {choice: 'yes', votes: 0},
          {choice: 'no', votes: 0}
        ],
      }
    ]
};

describe('UserPolls with one poll', () => {
  const userPolls = shallow(<UserPolls {...initialProps} />);

  it('has one PollContainer Component', () => {
    expect(userPolls.find(PollContainer).at(0).exists()).toBe(true);
  });

  it('has one question', () => {
    expect(userPolls.find(PollContainer).at(0).props().poll.question)
      .toEqual(initialProps.polls[0].question);
  });

  it('has two choices: yes and no', () => {
    expect(userPolls.find(PollContainer).at(0).props().poll.choices.length).toEqual(2);
    expect(userPolls.find(PollContainer).at(0).props().poll.choices[0].choice)
      .toEqual(initialProps.polls[0].choices[0].choice);
    expect(userPolls.find(PollContainer).at(0).props().poll.choices[1].choice)
      .toEqual(initialProps.polls[0].choices[1].choice);
  });
});

describe('UserPolls without polls', () => {
  const userPolls = shallow(<UserPolls polls={[]} />);

  it('render no poll message', () => {
    expect(userPolls.find('h1').at(0).text()).toEqual(NO_POLLS);
  });
});
