import { config, mount } from "@vue/test-utils";
const { axe, toHaveNoViolations } = require("jest-axe");

expect.extend(toHaveNoViolations);

import Home from "../Home";

config.global.mocks = {
  $t: (key) => key,
};

describe("Home.vue", () => {
  test("Should renders view", async () => {
    const wrapper = mount(Home);
    const html = wrapper.html();
    expect(html).toMatchSnapshot();
    expect(await axe(html)).toHaveNoViolations();
  });

  test("Should manage selected tables", async () => {
    const wrapper = mount(Home);
    //Select one
    wrapper.get("#table-2").setChecked(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedTables).toStrictEqual([2]);
    // Select all
    wrapper.get({ ref: "table-all" }).setChecked(true);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedTables).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    // Unselect all
    wrapper.get({ ref: "table-all" }).setChecked(false);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedTables).toStrictEqual([]);
    // Select all one by one
    for (let i = 2; i <= 9; i++) {
      wrapper.get(`#table-${i}`).setChecked(true);
      await wrapper.vm.$nextTick();
    }
    expect(wrapper.vm.selectedTables).toStrictEqual([2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
