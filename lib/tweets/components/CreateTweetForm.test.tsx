import { render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CreateTweetForm } from "./CreateTweetForm";

const setup = () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <CreateTweetForm />
    </QueryClientProvider>
  );
};

describe("render tweet form successfully", () => {
  beforeEach(() => setup());

  it("renders tweet form", () => {
    expect(screen.getByRole("textbox")).toBeDefined();
  });
});
