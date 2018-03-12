import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: [
        {
          id: "whatever_id",
          created_at: "eafeawf",
          repo: {
            url: "should be whatever"
          },
          actor: {
            avatar_url: "whatever"
          }
        }
      ]
    })
}));

it("renders without crashing", () => {
  const div = document.createElement("div");
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
    expect(wrapper.text()).toContain(
      "Enter your Github Username above and the result will be displayed here"
    );
  });
});

describe("<Github Event functionalities", () => {
  it("contains 3 states", () => {
    const instanceState = {
      value: "",
      result: [],
      error: ""
    };
    expect(wrapper.state()).toEqual(instanceState);
  });

  it("test the content of the input", () => {
    const wrapper = shallow(<input value="I haver an input" />);

    expect(wrapper.find("input").props().value).toContain("I haver an input");
  });

  fit("simulate change event", () => {
    const handleChangeSpy = jest.spyOn(App.prototype, "handleChange");
    const wrapper = mount(<App />);
    const button = wrapper.find("input").first();
    button.simulate("change", {
      target: {
        value: "typing"
      }
    });
    expect(handleChangeSpy.mock.calls.length).toBe(1);
    expect(handleChangeSpy).toHaveBeenCalled();
    expect(wrapper.state().value).toBe("typing");
  });
  fit("simulate click event", cb => {
    const handleClickSpy = jest.spyOn(App.prototype, "handleClick");
    const wrapper = mount(<App />);
    console.log(wrapper.state(), "this are the states");
    const sampleData = {
      data: [
        {
          id: "whatever_id",
          created_at: "eafeawf",
          repo: {
            url: "should be whatever"
          },
          actor: {
            avatar_url: "whatever"
          }
        }
      ]
    };
    wrapper
      .find("button")
      .first()
      .simulate("click");
    console.log(
      wrapper.state(),
      "this are the states after, before setImmediate"
    );

    setImmediate(() => {
      expect(wrapper.state().result).toEqual(sampleData.data);
      cb();
    });

    // expect(handleClickSpy.calledOnce).toBeTruthy();
    expect(handleClickSpy).toHaveBeenCalled();
  });
});

describe("Snapshot test", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("displays card result", () => {
    const tree = renderer.create(<App />).toJSON();
    tree.children[0].children[2].props.value = "seyi";
    // manually trigger the callback
    tree.props.onChange;
    // re-rendering
    tree.children[0].children[3].props.onClick = component.toJSON();
    expect(tree).toMatchSnapshot();
    // manually trigger the callback
    tree.props.onClick;

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("changes the state when input changes", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onChange;
    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onClick;

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
