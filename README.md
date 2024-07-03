# Food Truck Finder
### [✨ Use it Live In Production✨](https://foodtruck-finder-ecru.vercel.app/)

Your favorite food truck is only one prompt away!
With Food Truck Finder, you can easily find food trucks around you by writing a prompt and seeing the results magically appear on the screen!



https://github.com/alexmachina/foodtruck-finder/assets/41119858/b8efdb4f-0da2-4d5f-b8c6-c3b29a3ed210

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to Run?

Create an Open AI key in case you don't have one: https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key
Create a `.env` file in the root directory with the following content

```
OPENAI_KEY=your_api_key_here
```

To run the project in your machine
```bash
npm install
# and
npm run dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Technical Overview

This project uses NextJs with Tailwind as the front-end.
It consists of form with a textarea, which serves as a prompt, and that once submited calls the `POST /prompt` endpoint in order to fetch the food truck candidates, based on the prompt, in a json array.
The json array is then used to show the food truck cards on the screen.

Next are sections that go into detail into each specific decision and points of improvement.

## Extra Features

- Responsive
- Button label changes to a different one on every visit

## File Structure and Architecture

There are many ways to architecture an app, and this is only one of them, chose by preference and convention at the time of development.

I chose to leverage the `_` routing pattern of NextJs to store the modules inside the `app` and `api` directories.

### Front-End

- `[page]/_apis` contains the public APIs that are used on the client side. It contains only the `foodTruckFinderApi`, which is a module that calls the NextJs routes.
- `[page]/_components` contains all components that are relative to that specific page. In our case, it's only the main page, so we have all components in `app/_components`, but let's say we have another page, `about us`, we'd have `app/about-us/_components`. Components in `_components` should be pure and not call hooks. They are deterministic and easy to test, since they only take care of layout.
  > A possible improvement here would be to create a `/components` directly on the `src` to store the components from the design system. Would definetly go for it in case there were more pages that used `Button`, `TextArea` and etc.
- `[page]/containers` contains the classic react containers. Here is where hooks, API calls, state, and everything that handles logic should be. These components are supposed to glue together the UI components with API data.

The concept here is that the more generic a component is, the more upwards on the tree it should live, so that components deep down the tree use components that are shallow on the tree.
I decided not to use a state management library, since the state is small. But I could have used zustand or redux. Or even React's context.

### Back End

The main reason for having a back-end is to hide the OpenAI API Keys, but this ends up making the project an API too that other apps can access and call the endpoint!

I could have downloaded, parsed the CSV and called openAI api from the front-end, having a field for the user to add his api key, but I decided to go for an out-of-the-box solution that regular users can use.

For the back-end api:

- `_repositories` is where the data repositories are. Calls to external services, databases, APIs will only happen in this layer.
- `_services` is where the repositories are called and the data is validated and transformed.

And then, the NextJs api routes are left with the single responsibillity of handling the routing itself.
For a project with more complexity I would choose NestJS, because it's architecture decisions are well made and laid out.
I also understand that I could have used adapters, use cases, and much more from clean architecture and other design patterns, and it would also work.
This pattern is what I chose during development.

The backend uses `fetch` api, as it's good enough for our needs.
It uses `papaparse` library to deal with CSV parsing and unparsing.

## DaisyUI 4

This project uses [DaisyUI](https://github.com/saadeghi/daisyui) as a UI library, so that we can ship something beautiful in time.

Also, notices that DaisyUI uses the `prose` class [to work with typography](https://daisyui.com/docs/layout-and-typography/).

## DataSFGov

Here we are downloading the CSV on every request in order to get the updated version. This is fast enough, but can be improved.

## OpenAI

This project uses OpenAI's completion API through HTTP calls. Another option is using a library, but I find that since the application only uses one endpoint, it's enough to just consume it via HTTP with fetch, adding no library overhead.

The way it works is by building a prompt with the contents of the CSV. In order to save in token and make it more performant, there is a function that treats the CSV and only sends the `Applicant` and `FoodItems` to chatgpt, giving less than 70 lines of prompt.
It then uses the `response_format` parameter to set the prompt answer to json, passing an example json structure, so we can always be safe that it will return a valid json in that structure the app expects.

```
response_format: {
      type: "json_object",
    },
```

## Testing Strategy

This project uses [Jest](https://github.com/jestjs/jest) and [React Testing Library](https://github.com/testing-library/react-testing-library) for unit testing.

This project contemplates unit testing for components only, because they are low hanging fruits worth implementing in terms of code quality.

## Improvements

I'll list only improvements for the current features, and not new features as improvements.

### Back-End

- Move the back-end to NestJS or create a more robust architecture, potentially using clean architecture or another set of design patterns.
- Protect the enpoint so that its only callable through the nextjs front-end and no other third-party

## Front-End

- Improve the styling, there is probably some redundant styling due to the limited time available
- Add validation, making sure the prompt is never too long or too short
- Add error handling

### Open AI API Calls

- The prompt can be reduced even further by filtering the restaurants that are closer to the user using the browser's native `GeolocationAPI`, sending the `lat` and `long` with the request, and sending to GPT only the restaurants that are nearby.
- Another way to save here would be to store a collection of prompts that users already sent vs their results on a database and then querying this database first before ChatGPT. This way we never query ChatGPT for the same prompt two times.
- An improvement here would be to make the prompt more performatic. Potentially using GPT3.5 model instead of 4o is good enough for what we want.

### CSV Download

- It's possible to cache the csv in memory and update it every 24h. This way we get the updated data and gain performance.

### Tests

- Add e2e tests with cypress and cover 100% of the app, including the `api`.
- Add tests to `_containers` and `pages`
- Add tests to the back-end modules inside `/app/api` code
