import React from 'react';
import {shallow} from 'enzyme';
import {Link} from 'react-router-dom';
import {SitePolls} from '../src/components/SitePolls';
import {Modal, Row, Button, Col} from 'react-bootstrap';

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
      },
      { question: 'What is my favorite color?',
        id: 1,
        owner: 'chris',
        choices: [
          {choice: 'blue', votes: 0},
          {choice: 'red', votes: 0},
          {choice: 'burnt orange', votes: 0}
        ],
      },
    ]
};

describe('SitePolls', () => {

  const sitePoll = shallow(<SitePolls {...initialProps} />);

  it('has a title called Latest Polls', () => {
    expect(sitePoll.find('h1').at(0).text()).toEqual('Latest Polls');
    expect(sitePoll.find('h1').at(0).hasClass('homePageTitle')).toBe(true);
  });

  it('has two polls', () => {
    expect(sitePoll.find(Col).at(1).children().length).toBe(2);
    expect(sitePoll.find('div').at(1).hasClass('sitePollsLinkText')).toBe(true);
    expect(sitePoll.find('div').at(2).hasClass('pollContainer')).toBe(true);
    expect(sitePoll.find('div').at(3).hasClass('sitePollsLinkText')).toBe(true);
    expect(sitePoll.find('div').at(4).hasClass('pollContainer')).toBe(true);

  });

});