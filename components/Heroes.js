import React from "react";

import Hero from "../components/Hero";

export default class Heroes extends React.Component {
  render() {
    const { heroes, heightRatio } = {
      ...this.props,
    };

    const heroList = heroes && Object.keys(heroes);

    if (!heroList || heroList.length === 0) {
      return null;
    }

    return (
      <div className="heroes">
        {heroList.map(heroID => {
          return (
            <Hero key={heroID} {...heroes[heroID]} heightRatio={heightRatio} />
          );
        })}
      </div>
    );
  }
}
