import React, { Component } from 'react';
import { distanceInWordsStrict } from 'date-fns';
import styled from 'styled-components';
import axios from 'axios';
import { FaGithub, FaStackOverflow } from 'react-icons/fa';
import { Tabs, Tag } from 'element-react';

const Wrapper = styled.div`
  padding: 16px;
  li {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    + li {
      border-top: 1px solid #e5e9f2;
    }
    > span {
      margin-right: 16px;
    }
    > time {
      margin-left: auto;
    }
  }
`;

const getGithubAction = type => {
  switch (type) {
    case 'WatchEvent':
      return {
        name: 'Starred',
        color: 'gray',
      };
    case 'CreateEvent':
      return {
        name: 'Created',
        color: 'success'
      };
    case 'PushEvent':
      return {
        name: 'Pushed',
        color: 'primary',
      };
    case 'IssueCommentEvent':
      return {
        name: 'Commented',
        color: 'warning',
      };
    default:
      return '';
  }
};

const getGithubUrl = activity => {
  if (activity.payload.comment) {
    return activity.payload.comment.html_url;
  }
  return `https://github.com/${activity.repo.name}`;
};

class ActivityList extends Component {
  state = {
    githubActivities: [],
    stackoverflowActivities: [],
  };

  componentDidMount() {
    this.fetchGithub();
    this.fetchStackoverflow();
  }

  async fetchGithub() {
    const { data } = await axios.get('https://api.github.com/users/pengyuanzhao/events');
    const githubActivities = data.map(activity => ({
      id: activity.id,
      name: activity.repo.name,
      url: getGithubUrl(activity),
      createdAt: activity.created_at,
      action: getGithubAction(activity.type),
      icon: <FaGithub />,
    }));
    this.setState({ githubActivities });
  }

  async fetchStackoverflow() {
    const { data } = await axios.get(
      'https://api.stackexchange.com/2.2/users/5797119/favorites?site=stackoverflow&order=desc'
    );
    console.log(data)
    const stackoverflowActivities = data.items.map(activity => ({
      id: activity.question_id,
      name: activity.title,
      url: activity.link,
      createdAt: null,
      action: { name: 'Favorited', color: 'gray' },
      icon: <FaStackOverflow color="#f48024" />,
    }));
    this.setState({ stackoverflowActivities });
  }

  renderActivity = (activity) => (
    <li key={activity.id}>
      <span>{activity.icon}</span>
      <span>
        <Tag type={activity.action.color}>{activity.action.name}</Tag>
      </span>
      <span>
        <a href={activity.url} target="_blank">
          {activity.name}
        </a>
      </span>
      {activity.createdAt && (
        <time dateTime={activity.createdAt}>
          {distanceInWordsStrict(Date.now(), new Date(activity.createdAt), {
            addSuffix: true,
          })}
        </time>
      )}
    </li>
  )

  render() {
    const { githubActivities, stackoverflowActivities } = this.state;
    return (
      <Wrapper>
        <Tabs activeName="1">
          <Tabs.Pane label="Github" name="1">
            <ul>{githubActivities.map(this.renderActivity)}</ul>
          </Tabs.Pane>
          <Tabs.Pane label="Stack Overflow" name="2">
            <ul>{stackoverflowActivities.map(this.renderActivity)}</ul>
          </Tabs.Pane>
        </Tabs>
      </Wrapper>
    );
  }
}

export default ActivityList;
