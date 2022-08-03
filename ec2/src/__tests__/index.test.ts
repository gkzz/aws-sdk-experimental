import { main } from "../index";

jest.setTimeout(10000);

// https://jestjs.io/docs/tutorial-async#asyncawait
describe("run main", () => {
  it("run main", async () => {
    await expect(main()).resolves.toBeTruthy();
  });
});



