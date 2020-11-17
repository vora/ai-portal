import React, { Component } from 'react';
import { Menu, Affix, Sider } from '../ant';

// we can update this later to include more items than three
// unsure how to pass ant design icon as prop -> will look into it
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headings: props.headings,
      icons: props.icons,
      refs: props.refs,
    };
  }

  render() {
    let headings = this.state.headings;
    let icons = this.state.icons;
    let refs = this.state.refs;
    return (
      <Affix offsetTop={60}>
        <Sider width={250}>
          <Menu
            mode="inline"
            theme="light"
            style={{
              height: '100%',
              borderRight: '0',
            }}
          >
            {headings &&
              headings.map((heading, index) => (
                <Menu.Item
                  key={heading.toLowerCase()}
                  icon={icons[index]}
                  onClick={() => {
                    refs[index].current.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {heading}
                </Menu.Item>
              ))}
          </Menu>
        </Sider>
      </Affix>
    );
  }
}
export default Sidebar;
