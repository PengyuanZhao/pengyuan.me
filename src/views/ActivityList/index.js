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
        color: 'primary',
      };
    case 'PushEvent':
      return {
        name: 'Pushed',
        color: 'success',
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
    console.log(data);

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
    const stackoverflowActivities = data.items.map(activity => ({
      id: activity.question_id,
      name: activity.title,
      url: activity.link,
      createdAt: activity.creation_date * 1000,
      action: { name: 'Favorited', color: 'primary' },
      icon: <FaStackOverflow />,
    }));
    this.setState({ stackoverflowActivities });
  }

  render() {
    const { githubActivities, stackoverflowActivities } = this.state;
    return (
      <Wrapper>
        <Tabs activeName="1">
          <Tabs.Pane label="Github" name="1">
            <ul>
              {githubActivities.map(activity => (
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
                  <time dateTime={activity.createdAt}>
                    {distanceInWordsStrict(Date.now(), new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </time>
                </li>
              ))}
            </ul>
          </Tabs.Pane>
          <Tabs.Pane label="Stack Overflow" name="2">
            <ul>
              {stackoverflowActivities.map(activity => (
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
                  <time dateTime={activity.createdAt}>
                    {distanceInWordsStrict(Date.now(), new Date(activity.createdAt), {
                      addSuffix: true,
                    })}
                  </time>
                </li>
              ))}
            </ul>
          </Tabs.Pane>
        </Tabs>
      </Wrapper>
    );
  }
}

export default ActivityList;
