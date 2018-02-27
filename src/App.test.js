import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import sinon from "sinon";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const wrapper = shallow(<App />);

describe("<GithubEvent render method", () => {
  it("it renders a containing div", () => {
    expect(wrapper.find(".App")).toBeTruthy();
  });

  it("it renders a containing header div", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".App-header")).toBeTruthy();
  });

  it("it renders an image tag", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("img")).toBeTruthy();
  });

  it("it renders an h1 tag", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("h1")).toBeTruthy();
  });

  it("it renders an input tag", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("input")).toBeTruthy();
  });

  it("it renders a <button /> tag", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("button")).toBeTruthy();
  });


  it("it renders a <p /> tag", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("p")).toBeTruthy();
  });

  it("it renders a text", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.text()).toContain("Enter your Github Username above and the result will be displayed here");
  });

});

describe("<Github Event functionalities", () => {
  it("simulate click event", () => {
    let buttonClicked = false;
    const handleClick = () => buttonClicked = true;
    const wrapper = shallow(
      <button onClick={ handleClick } />);
    wrapper.find("button").first().simulate("click");
      expect(buttonClicked)
      .toBeTruthy();
  });

  it("contains 3 states", () => {
    const instanceState = {
      value: '',
      result: [],
      error: ''
    };
    expect(wrapper.state()).toEqual(instanceState);
  });

  it("test the content of the input", () => {
    const wrapper = shallow(<input value="I haver an input" />);

    expect(wrapper.find("input").props().value).toContain("I haver an input");
  });

  it("simulate change event", () => {
    let inputChanged = false;
    const handleChange = () => inputChanged = true;
    const wrapper = shallow(
      <input onChange={ handleChange } />);
    wrapper.find("input").first().simulate("change");
      expect(inputChanged)
      .toBeTruthy();
  });
});
