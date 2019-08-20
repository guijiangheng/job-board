import React, { Component } from 'react';
import { companies } from '../fake-data/data';

export default class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    const { companyId } = this.props.match.params;
    this.state = {
      company: companies.find((company) => company.id === companyId)
    };
  }

  render() {
    const { company } = this.state;
    return (
      <div>
        <h1 className="title">{company.title}</h1>
        <div className="box">{company.description.description}</div>
      </div>
    )
  }
}
