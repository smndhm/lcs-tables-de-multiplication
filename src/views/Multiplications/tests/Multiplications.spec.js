import { config, mount } from "@vue/test-utils";
const { axe, toHaveNoViolations } = require("jest-axe");

expect.extend(toHaveNoViolations);

import Multiplications from "../Multiplications";

config.global.mocks = {
  $t: (key) => key,
  $route: { query: { tables: "7" } },
};

describe("Multiplications.vue", () => {
  test("Should renders view", async () => {
    const wrapper = mount(Multiplications, {
      // attachedTo: document.body,
      data() {
        return {
          factors: [2, 3],
        };
      },
    });
    const mockedMultiplication = { table: 8, factor: 7, result: 56 };
    wrapper.vm.multiplication = mockedMultiplication;

    await wrapper.vm.$nextTick();
    let html = wrapper.html();
    expect(html).toMatchSnapshot();
    expect(await axe(html)).toHaveNoViolations();

    document.dispatchEvent(new Event("keyup"));
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    html = wrapper.html();
    expect(html).toMatchSnapshot();
    expect(await axe(html)).toHaveNoViolations();

    await new Promise((r) => setTimeout(r, 3100));
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.multiplication).not.toEqual(mockedMultiplication);

    document.dispatchEvent(new Event("mouseup"));
    await wrapper.vm.$nextTick();

    document.dispatchEvent(new Event("mouseup"));
    await wrapper.vm.$nextTick();
  });

  test("Should manage when query tables il not an array", async () => {
    config.global.mocks.$route.query.tables = ["7"];
    const wrapper = mount(Multiplications);
    expect(wrapper).toBeDefined();
  });
});
