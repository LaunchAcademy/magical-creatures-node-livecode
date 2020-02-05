There are many awesome and powerful magical creatures out there, and we want to track which ones are our favorites in this web application.

### Learning Objectives

- Build an Express application to serve dynamically generated HTML
- Understand the role of the server and views in a Express application and how they interact

## Getting Started

```no-highlight
et get magical-creatures
cd magical-creatures
yarn install
yarn run dev
```

## Navigating the application

#### Server

The `src/app.js` is where you will be writing code to configure the logic for each of the paths a user visits. Specifically, this is where you will prepare the data needed for a specific webpage and specify which handlebars template should be used. This will be the first step in setting up each webpage, and will determine which paths are available in your app.

#### Public

Unless you wish to configure client-side JavaScript or styling, you will not need to edit the files in the `public` folder.

## Instructions

Build a web application that has a homepage welcoming me to the website, a creatures _index_ page that lists our favorite magical creatures, and _show_ pages presenting each individual magical creature.

Tackle these user stories in the order that they're presented.

## User Stories

### Part 1

```no-highlight
As a huge fan of magical creatures
I want to arrive at a welcome page when I navigate to the root path
So that I can get excited about magical creatures
```

Acceptance Criteria:

- When I visit `/`, I can see a header with a welcome message to the website reading "Welcome One and All to the Magical Creatures Website!"
- Below the header is a short paragraph description of the website, which you can make up yourself!
- _Extra credit:_ Render an image of a magical creature of your choosing on the home page. You may wish to revisit how to use an HTML image tag to aid you.

**Tips:** Create a template in your `views` directory to render your welcome page. You won't need to pass any variables to the view in your `src/app.js` to satisfy this story, since this information will be static.

### Part 2

```no-highlight
As a huge fan of magical creatures
I want to view a page with the names of each magical creature
So that I can remember which magical creatures are my favorite
```

Acceptance Criteria:

- When I visit `/creatures` I can see list of all the magical creature names
- The list of magical creatures should come from the `creatures` array, which has already been provided

### Part 3

```no-highlight
As a huge fan of magical creatures
I want to view additional information about a creature
So that I can learn more about that creature
```

Acceptance Criteria:

- I can navigate to a distinct url and web page for each magical creature. Specifically, navigating to `/creatures/unicorn` should bring bring me to a unicorn show page, and navigating to `/creatures/dragon` should bring me to a dragon show page
- Each creature page displays the creature's name, age, and magical ability

**Tips:** _Note that until you finish Part 4 you will need to navigate to these show pages by editing the url in your browser directly._ We'll need to use dynamic routes to accomplish this task. Focus first on defining your dynamic route, then on rendering the creature's name at that route, and lastly on being able to render the creature's magical ability.

#### Part 4

```no-highlight
As a huge fan of magical creatures
I want to see links to each magical creatures show page
So that I can easily navigate the website
```

Acceptance Criteria:

- When I visit `/creatures`, each name shown is a link to a magical creature's show page

**Tip:** You'll need to make use of `<a>` tags.

## Non-Core User Stories

```no-highlight
As a magical creature tracker
I want to be able to add new magical creatures to the site
So that I can have a list of all creatures I can track.
```

Acceptance Criteria:

- When I visit `/new` I should see a form
- The form should have fields for name, age, and ability
- when I successfully post a creature it should be saved to a JSON with the other creatures.
