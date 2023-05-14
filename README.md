# Mystery Express, Co.

Watch the Demo here!

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/j-xPbNTli5M/0.jpg)](https://www.youtube.com/watch?v=j-xPbNTli5M)

## Inspiration

We're both big fans of video games and we wanted to create an interactive experience online using AI to power the responses to the user's input. We considered a few different AI storytelling ideas but we ended up choosing a murder mystery train by actually discussing and planning prompt ideas with ChatGPT itself!

## What it does

Using OpenAI's API, the player is guided through a murder mystery in the form on journal entries from the AI detective. The player helps the AI detective figure out what clues to investigate, and once enough evidence has been collected the perpetrator and their motives are revealed!

## How we built it

The core framework used is Next.js, which powers the front-end and the backend functions which relay user input to the OpenAI API's ChatGPT-3.5 model.

The AI model is given the context of a prompt written to provide initial information about the game and the AI's role, and to instruct it how to respond to user input.

Assets were drawn and animated using Aseprite. Audio came from royalty free sites like Pixabay.

## Challenges we ran into

1. **Crafting a good prompt is _hard_**: This part of the project took the most time and even with hours of thinking and testing (repeatedly running into ChatGPT's hourly message limit) and all the iterations we went through, there's still imperfections with how the language model interprets our prompt, or how it chooses to respond to certain player input.
2. **The OpenAI API can take a while to respond**: On average each response takes ~10 seconds. This can be solved in part by enabling streaming of the response, but due to the hackathon time constraints we thought it would be more important to let it be slightly slow and still be able to finish the project than to attempt streaming of the response and leave it incomplete.
3. **OpenAI Rate Limiting is confusing**: Sending one message every ~10 seconds max should not be triggering a rate limit when it allows 3,500 requests and 90,000 tokens per minute, but we frequently ran into the rate limiting error when testing. Our prompt has ~300 tokens according to ChatGPT itself, so we definitely should not be bumping against those restraints.

## Accomplishments that we're proud of

1. **Cohesive art design**: All of the art was made by Gabi (@Senjerak), and he managed to come up with an aesthetic that was both pleasing to the eye, easy to iterate on, and fit with the theme of the game.
2. **Integrating known and unknown technologies**: Angel (@Redmega) was familiar with Next.js and React already, but he has never used ChatGPT or the OpenAI API before, so it was cool to see how he was able to mesh existing knowledge with brand new explorations!
3. **Hackathon Newbie delivered a complete project**: Gabi (@Senjerak) has never participated in a hackathon before, so he got to see what it was like. Working to hack a project together to fit a specific theme within a given deadline can be hard, but it's so satisfying to have a (mostly) completed project to show off at the end of it!

## What we learned

**OpenAI API**: Neither of us have worked with the OpenAI API before (And one of us have never used an API before at all!), so implementing that was challenging and fun! Instead of just interacting with ChatGPT via their website, we made our own server talk to it with our own UI.

## What's next for Mystery Express, Co.

- We would like to implement text streaming from the OpenAI API so that responses seem faster and more fluid.
- Making it mobile friendly would be great for usability and reach! We chose not to focus on making the page work on mobile screens so we could lay out the scenes how we wanted them.
- Also, it would be cool if the art scenes were dynamic and truly reflected what the AI storyteller was writing in his journal.
