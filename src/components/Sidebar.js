import React, { Component } from 'react';
import { Menu, Affix, Sider } from '../ant';
import {
  AreaChartOutlined,
  TeamOutlined,
  FileProtectOutlined,
} from '@ant-design/icons';

// we can update this later to include more items than three
// unsure how to pass ant design icon as prop -> will look into it
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headings: props.headings,
      mod: props.mod,
    };
  }

  render() {
    let mod = this.state.mod;
    let headings = this.state.headings;
    return (
      <Affix offsetTop={60}>
        <Sider width={250}>
          <Menu
            mode="inline"
            theme="light"
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item
              key={headings[0].toLowerCase()}
              icon={<AreaChartOutlined />}
              style={{ marginTop: '30px' }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            >
              {headings[0]}
            </Menu.Item>
            <Menu.Item
              key={headings[1].toLowerCase()}
              icon={<FileProtectOutlined />}
              onClick={() => {
                window.scrollTo({
                  top: 250,
                  behavior: 'smooth',
                });
              }}
            >
              {headings[1]}
            </Menu.Item>
            {!mod && (
              <Menu.Item
                key={headings[2].toLowerCase()}
                icon={<TeamOutlined />}
                onClick={() => {
                  window.scrollTo({
                    top: 600,
                    behavior: 'smooth',
                  });
                }}
              >
                {headings[2]}
              </Menu.Item>
            )}
          </Menu>
        </Sider>
      </Affix>
    );
  }
}
export default Sidebar;
