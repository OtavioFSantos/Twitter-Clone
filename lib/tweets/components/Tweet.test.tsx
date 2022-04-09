import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Tweet } from "./Tweet";

const testData = {
  id: "abc",
  content: "Mensagem de teste",
  user: {
    id: "xyz",
    name: "Otávio",
    email: "otavio@email.com",
    image: "hhishdifhsdif",
  },
  likeList: [{ userId: "ggggg" }, { userId: "yyyyy" }],
  likes: 3,
  replyToTweetId: null,
  createdAt: new Date().toISOString(),
};

const setup = () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <Tweet tweet={testData} />
    </QueryClientProvider>
  );
};

describe("render tweet successfully", () => {
  beforeEach(() => setup());

  it("renders the user name", () => {
    expect(screen.getByText(testData.user.name)).toBeVisible();
  });

  it("render the tweet content", () => {
    expect(screen.getByText(testData.content)).toBeVisible();
  });

  it("render the tweet likes counter", () => {
    expect(screen.getByText(testData.likeList.length)).toBeVisible();
  });
});
